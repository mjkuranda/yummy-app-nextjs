import { Language } from '@/src/types/api.types';

export type InvertedTranslation = Record<string, string>;

export type SanitizedTranslation = Record<Exclude<Language, 'en-US'>, string>;

export interface Translations {
    actions: InvertedTranslation;
    ingredients: SanitizedTranslation[];
    ingredientJson: Partial<JsonData>;
    units: InvertedTranslation;
}

export interface ParsedIngredient {
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

export interface IngredientNgram {
    text: string;
    idx: number;
}

export interface IngredientCandidate {
    text: string;
    lemmatizedText: string;
    result: string;
    wordIdx: number;
}