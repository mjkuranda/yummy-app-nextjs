import { DishType, MealType } from '@/src/types/dish.types';

export interface SearchFormData {
    ingredients: string[];
}

export interface SearchFilters {
    originalQuery: SearchUrlQuery;
    ings: string[];
    mealType: MealType;
    dishType: DishType;
}

export type EncodedUrlQuery = `${MealType},${DishType},${string}`;

export type SearchUrlQuery = `ings=${string}&type=${MealType}&dish=${DishType}`;