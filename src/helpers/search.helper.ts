import { MealResult } from '@/src/types/api.types';
import { MealType } from '@/src/types/meal.types';

export function filterMealByType(meals: MealResult[], type: MealType): MealResult[] {
    if (type === 'any') {
        return meals;
    }

    return meals.filter(meal => meal.type === type);
}