import { Language } from '@/src/types/api.types';

export type InvertedTranslation = Record<string, string>;

export type SanitizedTranslation = Record<Exclude<Language, 'en-US'>, string>;

export interface Translations {
    actions: InvertedTranslation;
    ingredients: SanitizedTranslation[];
    units: InvertedTranslation;
}

type ParsedIngredient = {
    amount: number;
    unit: string;
};

export type ParsedStepResult = {
    action: string;
    ingredients: Record<string, ParsedIngredient>;
    time?: {
        amount: number;
        unit: string
    };
};

export type LanguageKey = Exclude<Language, 'en-US'>;
export type JsonData = Record<string, Record<LanguageKey, string>>;