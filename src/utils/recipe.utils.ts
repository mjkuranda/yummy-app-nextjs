import Fuse from 'fuse.js';
import {
    JsonData,
    LanguageKey,
    ParsedStepResult,
    SanitizedTranslation,
    Translations
} from '@/src/types/recipe.types';

export function parseStep(text: string, translations: Translations): ParsedStepResult {
    const normalized = normalize(text);
    const result: ParsedStepResult = {
        action: '',
        ingredients: {}
    };

    const { actions, ingredients, units } = translations;

    result.ingredients = extractIngredients(normalized, ingredients, units);
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

function extractIngredients(normalizedText: string, ingredients: SanitizedTranslation[], units: InvertedTranslation): ParsedIngredientResult {
    const resultIngredients: ParsedIngredientResult = {};

    // NOTE: Fuze
    const fuse = new Fuse(ingredients, {
        keys: ['pl'],
        threshold: 0,
        includeScore: true,
        ignoreLocation: true,
        minMatchCharLength: 3,
        shouldSort: true
    });

    // NOTE: Match ingredients with amount and unit
    const ingredientRegex = /(\d+(?:[.,]\d+)?)\s*(g|kg|ml|l|łyżka|łyżkę|łyżki|łyżeczka|szklanka|sztuk(?:a|i)?)\s+(\w+)/giu;
    // const ingredientRegex = /(\d+(?:[.,]\d+)?)\s*(g|kg|ml|l|łyżka|łyżeczka|szklanka|sztuk(?:a|i)?)\s+([\p{L}\s-]{3,})/giu;
    let match: RegExpExecArray | null;

    console.log(normalizedText);

    while ((match = ingredientRegex.exec(normalizedText)) !== null) {
        const [, amountStr, unit, ingredientCandidate] = match;
        const amount = parseFloat(amountStr.replace(',', '.'));
        const unitEn = units[unit] || unit;

        const fuseResult = fuse.search(ingredientCandidate)[0];
        const fuseResult = fuse.search(ingredientCandidate).filter(r => (r.score ?? 0) < 0.005)[0];

        // console.log('SSSSSS', ingredientCandidate, fuse.search(ingredientCandidate));

        // console.log('results', fuseResult);

        if (fuseResult) {
            const enName = fuseResult.item.en.toLowerCase();
            resultIngredients[enName] = { amount, unit: unitEn };
        }
    }

    // NOTE: Match ingredients with no provided amount
    const likelyIngredientFragments = normalizedText.match(/\b(?:dodaj|wrzuć|posyp|pokrój|wymieszaj|zblenduj)\b([^.]+)/gi);

    if (likelyIngredientFragments) {
        for (const fragment of likelyIngredientFragments) {
            const words = fragment.split(/\W+/).filter(w => w.length > 2 && !Number.isInteger(Number(w)) && !isExcludedWord(w));

            for (const word of words) {
                console.log('wwwwww', word, fuse.search(word).filter(r => (r.score ?? 0) < 0.005));
                const match = fuse.search(word).filter(r => (r.score ?? 0) < 0.005)[0];
                if (match) {
                    const enName = match.item.en.toLowerCase();

                    if (!resultIngredients[enName]) {
                        resultIngredients[enName] = { amount: 1, unit: 'piece' };
                    }
                }
            }
        }
    }

    return resultIngredients;
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

function isExcludedWord(word: string): boolean {
    const excludedWords = [
        'godzin', 'minut', 'sekund',
        'przez', 'potem',
        'dodaj', 'gotuj', 'wymieszaj'
    ];

    return excludedWords.includes(word);
}

function normalize(text: string): string {
    return text
        .toLowerCase()
        .trim();
}