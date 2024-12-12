import { DishType, MealType } from '@/src/types/dish.types';

export interface SearchFormData {
    ingredients: string[];
}

export interface SearchFilters {
    originalQuery: string;
    ings: string[];
    mealType: MealType;
    dishType: DishType;
}