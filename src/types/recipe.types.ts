import { Language } from '@/src/types/api.types';

export type InvertedTranslation = Record<string, string>;

export type SanitizedTranslation = Record<Exclude<Language, 'en-US'>, string>;

export interface Translations {
    actions: InvertedTranslation;
    ingredients: SanitizedTranslation[];
    units: InvertedTranslation;
}

interface ParsedIngredient {
    amount: number;
    unit: string;
}

export type ParsedIngredientResult = Record<string, ParsedIngredient>;

export interface ParsedTimeResult {
    amount: number;
    unit: string
}

export type ParsedStepResult = {
    action: string;
    ingredients: ParsedIngredientResult;
    time?: ParsedTimeResult;
};

export type LanguageKey = Exclude<Language, 'en-US'>;
export type JsonData = Record<string, Record<LanguageKey, string>>;