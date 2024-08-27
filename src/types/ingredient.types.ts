export type IngredientData = Record<string, IngredientDataLabels>;

export interface IngredientDataLabels {
    en: string;
    pl: string;
}

export interface IngredientManager {
    labels: IngredientDataLabels[];
    filterIngredients: (match: string) => IngredientDataLabels[];
}