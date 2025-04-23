import Fuse from 'fuse.js';
import {
    JsonData,
    LanguageKey,
    ParsedStepResult,
    SanitizedTranslation,
    Translations
} from '@/src/types/recipe.types';

export function parseStep(text: string, translations: Translations): ParsedStepResult {
    const normalized = text.toLowerCase();
    const result: ParsedStepResult = {
        action: '',
        ingredients: {}
    };

    const { actions, ingredients, units } = translations;

    // NOTE: Actions
    for (const [action, enAction] of Object.entries(actions)) {
        if (normalized.includes(action)) {
            result.action = enAction;
        }
    }

    const fuse = new Fuse(Object.values(ingredients), {
        keys: ['pl'],
        threshold: 0.4
    });

    // NOTE: Match ingredients with amount and unit
    const ingredientRegex = /(\d+(?:[.,]\d+)?)\s*(g|kg|ml|l|łyżka|łyżeczka|szklanka|sztuk(?:a|i)?)\s+(\w+)/gi;
    let match: RegExpExecArray | null;
    while ((match = ingredientRegex.exec(normalized)) !== null) {
        const [, amountStr, unit, ingredientCandidate] = match;
        const amount = parseFloat(amountStr.replace(',', '.'));
        const unitEn = units[unit] || unit;

        const fuseResult = fuse.search(ingredientCandidate)[0];

        if (fuseResult) {
            const enName = fuseResult.item.en.toLowerCase();
            result.ingredients[enName] = { amount, unit: unitEn };
        }
    }

    // NOTE: Extract time
    const timeRegex = /(gotuj|piecz|smaż|duś)\s+przez?\s*(\d+)\s*(minut|godzin|sekund)/i;
    const timeMatch = normalized.match(timeRegex);
    if (timeMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [, action, timeAmountStr, timeUnit] = timeMatch;
        const timeAmount = parseInt(timeAmountStr, 10);
        const unit = timeUnit === 'godzin' || timeUnit === 'godzinie' ? 'hours' : timeUnit === 'minut' ? 'minutes' : 'seconds';
        result.time = { amount: timeAmount, unit };
    }

    // NOTE: Match ingredients with no provided amount
    const ingredientWithoutQuantityRegex = /\b(marchewka|pietruszka|czosnek|jajka|mleko|cukier|sól|bulion|przecier)\b/gi;
    let ingredientMatchWithoutQuantity: RegExpExecArray | null;
    while ((ingredientMatchWithoutQuantity = ingredientWithoutQuantityRegex.exec(normalized)) !== null) {
        const ingredientCandidate = ingredientMatchWithoutQuantity[1];
        const fuseResult = fuse.search(ingredientCandidate)[0];

        if (fuseResult) {
            const enName = fuseResult.item.en.toLowerCase();
            result.ingredients[enName] = { amount: 1, unit: 'piece' };
        }
    }

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