export type IngredientCategoryType = 'breads' | 'dairy-and-eggs' | 'fish-and-seafood' | 'fruits' | 'meats' | 'oils-and-fats' | 'pasta' | 'seeds-and-nuts' | 'spices' | 'vegetables';

export interface IngredientCategoryData {
    category: IngredientCategoryType;
    data: string[];
}