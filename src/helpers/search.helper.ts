import { MealResult } from '@/src/types/api.types';
import { DishType, DishTypeText, MealType } from '@/src/types/meal.types';

export function filterMealByType(meals: MealResult[], type: MealType, dish: DishType): MealResult[] {
    const filtered = meals.filter(meal => {
        if (meal.provider !== 'yummy') {
            return true;
        }

        return meal.type === type;
    });

    if (dish === 'any') {
        return filtered;
    }

    return filtered.filter(meal => meal.dishType === dish);
}

export function inferMealTypeBasingOnTime(): MealType {
    const hour = new Date().getHours();

    if (hour < 6) {
        return 'any';
    }

    if (hour >= 6 && hour < 11) {
        return 'breakfast';
    }

    if (hour >= 11 && hour < 16) {
        return 'launch';
    }

    if (hour >= 16 && hour < 20) {
        return 'dinner';
    }

    return 'any';
}

export function getDishTypes(mealType: MealType): Record<string, { en: string, pl: string }> {
    const dishes = DishTypeText[mealType];

    if (Object.keys(dishes).length === 0) {
        return { any: { en: 'any', pl: 'każdy' } };
    }

    return dishes;
}