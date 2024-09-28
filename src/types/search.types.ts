import { MealType } from '@/src/types/meal.types';

export interface SearchFormData {
    ingredients: string[];
}

export interface SearchFilters {
    originalQuery: string;
    ings: string[];
    type: MealType;
}