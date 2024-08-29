export type IngredientData = Record<string, IngredientDataValue>;

export interface IngredientDataValue {
    id: number;
    en: string;
    pl: string;
}

export interface IngredientDataLabels {
    en: string;
    pl: string;
}

export interface IngredientManager {
    isFetching: boolean;
    labels: IngredientDataValue[];
    filterIngredients: (match: string) => IngredientDataValue[];
}

export interface IngredientWithId {
    id: string;
    data: IngredientDataValue;
    unit: string;
    amount: string;
}