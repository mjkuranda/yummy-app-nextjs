export type IngredientCategoryType = 'breads' | 'cereal-products' | 'dairy-and-eggs' | 'fish-and-seafood' | 'fruits' | 'meats' | 'mushrooms' | 'oils-and-fats' | 'pasta' | 'seeds-and-nuts' | 'spices' | 'vegetables';

export type IngredientCategoryData = Record<string, IngredientCategoryLabels>;

export interface IngredientCategoryLabels {
    en: string;
    pl: string;
    imageUrl?: string;
}