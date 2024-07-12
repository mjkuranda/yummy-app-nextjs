import { apiGet } from '@/src/api/methods';
import { Meal, MealResult } from '@/src/types/api.types';

export async function getMeal(id: string): Promise<Meal> {
    return apiGet<Meal>(`meals/${id}/details`);
}

export async function getMeals(ingredients: string): Promise<MealResult[]> {
    if (!ingredients || ingredients.length === 0) {
        return [];
    }

    return apiGet<MealResult[]>(`meals?ings=${ingredients}`);
}