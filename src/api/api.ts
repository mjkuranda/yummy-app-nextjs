import { apiGet } from '@/src/api/methods';
import { Meal, MealResult } from '@/src/types/api.types';
import { encodeIngredients } from '@/src/helpers/query.helper';

export async function getMeal(id: string): Promise<Meal> {
    return apiGet<Meal>(`meals/${id}/details`);
}

export async function getMeals(ingredients: string[]): Promise<MealResult[]> {
    if (!ingredients.length) {
        return [];
    }

    return apiGet<MealResult[]>(`meals?ings=${encodeIngredients(ingredients)}`);
}