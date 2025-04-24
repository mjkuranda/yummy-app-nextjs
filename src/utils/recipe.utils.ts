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

    const unigrams: IngredientNgram[] = normalizedText.split(' ').filter(w => w.length > 2 && !Number.isInteger(Number(w))).map(((w, idx) => ({ text: w, idx })));
    const bigrams = generateNgrams(normalizedText, 2);
    const trigrams = generateNgrams(normalizedText, 3);
    const allNgrams = [...unigrams, ...bigrams, ...trigrams];

    const ingredientCandidates: Record<number, IngredientCandidate[]> = {};

    for (const { text, idx } of allNgrams) {
        const fuseResult = fuse.search(text).filter(r => (r.score ?? 0) < resultThreshold)[0];

        if (fuseResult) {
            const newCandidate = {
                text,
                result: fuseResult.item.en.toLowerCase(),
                wordIdx: idx
            };

            ingredientCandidates[idx]
                ? ingredientCandidates[idx].push(newCandidate)
                : ingredientCandidates[idx] = [newCandidate];
        }
    }

    for (const candidates of Object.values(ingredientCandidates)) {
        if (candidates.length === 0) {
            continue;
        }

        if (candidates.length === 1) {
            const [candidate] = candidates;
            const ingredient = ingredientJson[candidate.result];

            if (ingredient && ingredient[language] === candidate.text) {
                const extractedIngredient = extractIngredient(normalizedText, candidate, units);

                resultIngredients[ingredient.en] = { ...extractedIngredient };

                continue;
            }

            continue;
        }

        const sortedIngredients = candidates.sort((a, b) => b.text.length - a.text.length);
        const [ingredient] = sortedIngredients;
        const extractedIngredient = extractIngredient(normalizedText, ingredient, units);

        resultIngredients[ingredient.result] = { ...extractedIngredient };
    }

    return resultIngredients;
}

function generateNgrams(text: string, n: number): IngredientNgram[] {
    const words = text.split(/\s+/);
    const ngrams = [];

    for (let i = 0; i <= words.length - n; i++) {
        ngrams.push({
            text: words.slice(i, i + n).join(' '),
            idx: Math.floor(i / 2)
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

    if (lastWord && units[lastWord]) {
        parsedIngredient.unit = units[lastWord];
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
    const timeRegex = /(gotuj|piecz|smaż|duś)\s+przez?\s*(\d+)\s*(minut|godzin|sekund)/i;
    const timeMatch = normalized.match(timeRegex);

    if (timeMatch) {
        const [, , timeAmountStr, timeUnit] = timeMatch;
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
        .trim();
}