import Fuse from 'fuse.js';
import {
    IngredientCandidate,
    IngredientNgram,
    InvertedTranslation,
    JsonData,
    LanguageKey, ParsedIngredient, ParsedIngredientResult,
    ParsedStepResult, ParsedTimeResult,
    SanitizedTranslation,
    Translations
} from '@/src/types/recipe.types';

export function parseStep(text: string, translations: Translations): ParsedStepResult {
    const normalized = normalize(text);
    const result: ParsedStepResult = {
        action: '',
        ingredients: {}
    };

    const { actions, ingredients, ingredientJson, units } = translations;

    result.ingredients = extractIngredients(normalized, ingredients, ingredientJson, units);
    result.action = extractAction(normalized, actions);
    result.time = extractTime(normalized);

    return result;
}

export function invertTranslations(data: JsonData, targetLanguage: LanguageKey): Record<string, string> {
    const map: Record<string, string> = {};
    const entries = Object.entries(data);

    for (const [, value] of entries) {
        map[value[targetLanguage]] = value.en;
    }

    return map;
}

export function sanitizeTranslations(data: JsonData): SanitizedTranslation[] {
    return Object.values(data);
}

function extractIngredients(normalizedText: string, ingredients: SanitizedTranslation[], ingredientJson: Partial<JsonData>, units: InvertedTranslation): ParsedIngredientResult {
    const resultIngredients: ParsedIngredientResult = {};

    const resultThreshold: number = 0.25;
    const language: LanguageKey = 'pl';

    const fuse = new Fuse(ingredients, {
        keys: [language],
        threshold: 0,
        includeScore: true,
        ignoreLocation: true,
        minMatchCharLength: 3,
        shouldSort: true
    });

    const unigrams = generateNgrams(normalizedText, 1);
    const bigrams = generateNgrams(normalizedText, 2);
    const trigrams = generateNgrams(normalizedText, 3);
    const allNgrams = [...trigrams, ...bigrams, ...unigrams];

    const ingredientCandidates: Record<number, IngredientCandidate[]> = {};

    for (const { text, idx } of allNgrams) {
        const lemmatizedText = lemmatizePolishNouns(text);

        if (isExcludedWordForCandidate(text) || isExcludedWordForCandidate(lemmatizedText)) {
            continue;
        }

        const fusePreciseResult = fuse.search(text).filter(r => (r.score ?? 0) < 0.005)[0];

        if (fusePreciseResult) {
            const newCandidate = {
                text,
                lemmatizedText,
                result: fusePreciseResult.item.en.toLowerCase(),
                wordIdx: idx
            };

            ingredientCandidates[idx]
                ? ingredientCandidates[idx].push(newCandidate)
                : ingredientCandidates[idx] = [newCandidate];
        } else {
            const fuseResult = fuse.search(lemmatizedText).filter(r => (r.score ?? 0) < resultThreshold)[0];

            if (fuseResult) {
                const newCandidate = {
                    text,
                    lemmatizedText,
                    result: fuseResult.item.en.toLowerCase(),
                    wordIdx: idx
                };

                ingredientCandidates[idx]
                    ? ingredientCandidates[idx].push(newCandidate)
                    : ingredientCandidates[idx] = [newCandidate];
            }
        }
    }

    for (const candidates of Object.values(ingredientCandidates)) {
        if (candidates.length === 0) {
            continue;
        }

        if (candidates.length === 1) {
            const [candidate] = candidates;
            const ingredient = ingredientJson[candidate.result];

            if (!ingredient) {
                continue;
            }

            if (ingredient[language] === candidate.lemmatizedText || ingredient[language] === candidate.text) {
                const extractedIngredient = extractIngredient(normalizedText, candidate, units);

                resultIngredients[ingredient.en] = { ...extractedIngredient };

                continue;
            }

            continue;
        }

        const sortedIngredientCandidates = candidates.sort((a, b) => b.text.length - a.text.length);
        const [ingredientCandidate] = sortedIngredientCandidates.filter(ingredientCandidate => ingredientCandidate.lemmatizedText === ingredientJson[ingredientCandidate.result]?.[language]);

        if (!ingredientCandidate) {
            continue;
        }

        const extractedIngredient = extractIngredient(normalizedText, ingredientCandidate, units);

        resultIngredients[ingredientCandidate.result] = { ...extractedIngredient };
    }

    return resultIngredients;
}

function generateNgrams(text: string, n: number): IngredientNgram[] {
    if (n === 1) {
        return text
            .split(/\s+/)
            .filter(w => w.length > 3 && !Number.isInteger(Number(w)))
            .map(w => ({
                text: w,
                idx: text.indexOf(w)
            }));
    }

    const words = text.split(/\s+/);
    const ngrams = [];

    for (let i = 0; i <= words.length - n; i++) {
        const slicedWords = words.slice(i, i + n).join(' ');

        ngrams.push({
            text: slicedWords,
            idx: text.indexOf(slicedWords)
        });
    }

    return ngrams;
}

function extractIngredient(normalizedText: string, ingredientCandidate: IngredientCandidate, units: InvertedTranslation): ParsedIngredient {
    const parsedIngredient: ParsedIngredient = {
        amount: 1,
        unit: 'piece'
    };

    const endIndex = normalizedText.indexOf(ingredientCandidate.text);
    const stringToProcess = normalizedText.substring(0, endIndex).trim();
    const words = stringToProcess.split(' ');

    const lastWord = words.at(-1);
    const lastButOneWord = words.at(-2);

    if (lastWord) {
        const lemmantizedWord = lemmatizePolishNoun(lastWord);

        if (units[lemmantizedWord]) {
            parsedIngredient.unit = units[lemmatizePolishNoun(lastWord)];
        }
    }

    if (lastButOneWord && Number.isInteger(Number(lastButOneWord))) {
        parsedIngredient.amount = Number(lastButOneWord);
    }

    return parsedIngredient;
}

function extractAction(normalizedText: string, actions: InvertedTranslation): string {
    for (const [action, enAction] of Object.entries(actions)) {
        if (normalizedText.includes(action)) {
            return enAction;
        }
    }

    return '';
}

function extractTime(normalized: string): ParsedTimeResult | undefined {
    // const timeRegex = /(?:gotuj|piecz|smaż|duś)\s+przez?\s*(\d+)\s*(minut|godzin|sekund)/i;
    const timeRegex = /przez\s*(\d+)\s*(minut|godzin|sekund)/i;
    const timeMatch = normalized.match(timeRegex);

    if (timeMatch) {
        const [, timeAmountStr, timeUnit] = timeMatch;
        const timeAmount = parseInt(timeAmountStr, 10);
        const unit =
            timeUnit.startsWith('godzin') ? 'hours' :
                timeUnit.startsWith('minut') ? 'minutes' :
                    'seconds';

        return { amount: timeAmount, unit };
    }
}

function normalize(text: string): string {
    return text
        .toLowerCase()
        .replace(/[.,!?;:()"\[\]]/g, '')
        .trim();
}

function lemmatizePolishNouns(words: string): string {
    const wordList = words.split(' ');
    const lemmatizedWords = wordList.map(word => lemmatizePolishNoun(word));

    return lemmatizedWords.join(' ');
}

function lemmatizePolishNoun(word: string): string {
    const lower = word.toLowerCase();

    // NOTE: Exceptions
    const exceptions: Record<string, string> = {
        'cukru': 'cukier',
        'pudru': 'puder',
        'czosnku': 'czosnek',
        'mleka': 'mleko',
        'wody': 'woda',
        'mąki': 'mąka',
        'jajek': 'jajko',
        'ziemniaków': 'ziemniak',
        'pomidorów': 'pomidor',
        'bananów': 'banan',
        'cebuli': 'cebula',
        'marchewki': 'marchewka',
        'śliwek': 'śliwka',
        'truskawek': 'truskawka',
        'solą': 'sól',
        'pieprzem': 'pieprz',
        'masła': 'masło'
    };

    if (exceptions[lower]) {
        return exceptions[lower];
    }

    // NOTE: Rules for genitive and accusative
    const rules: [RegExp, string][] = [
        // NOTE: Adjectives and plural
        [/(ego|emu)$/, 'y'],     // dobrego → dobry, nowemu → nowy
        [/ej$/, 'a'],            // świeżej → świeża
        [/ych$/, 'e'],           // białych → białe

        // NOTE: Accusative/Genitive - feminine
        [/ki$/, 'ka'],           // marchewki → marchewka
        [/gi$/, 'ga'],           // drożdży → drożdża
        [/zi$/, 'za'],           // różnicy → różnica
        [/ni$/, 'na'],           // dyni → dynia
        [/li$/, 'la'],           // cebuli → cebula
        [/ów$/, ''],             // pomidorów → pomidor
        [/ek$/, 'ka'],           // jajek → jajko
        [/ów$/, ''],             // bananów → banan
        [/nku$/, 'nek'],              // czosnku → czosnek
        [/y$/, 'a'],             // wody → woda
        [/i$/, 'a'],             // cebuli → cebula
        [/a$/, ''],              // pomidora → pomidor
        [/e$/, 'o'],             // mleko → mleko (ultimately don't change)
        [/ę$/, 'a'],             // kawę → kawa
        [/ą$/, 'a'],             // marchewką → marchewka
        [/ach$/, 'a'],           // gruszkach → gruszka
        [/ami$/, 'a'],           // ziołami → zioła
    ];

    for (const [pattern, replacement] of rules) {
        if (pattern.test(lower) && lower.length > replacement.length + 2) {
            return lower.replace(pattern, replacement);
        }
    }

    return lower;
}

function isExcludedWordForCandidate(word: string) {
    return [
        'przypraw',
        'gotuj',
        'wlej',
        'duś',
        'piecz',
        'minut'
    ].includes(word);
}