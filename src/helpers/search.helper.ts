import { DishResult } from '@/src/types/api.types';
import { DishType, DishTypeText, MealType } from '@/src/types/dish.types';

export function filterDishByType(dishes: DishResult[], type: MealType, dishType: DishType): DishResult[] {
    const filtered = dishes.filter(dish => {
        if (dish.provider !== 'yummy') {
            return true;
        }

        return dish.type === type;
    });

    if (dishType === 'any') {
        return filtered;
    }

    return filtered.filter(dish => dish.type === dishType);
}

export function inferMealTypeBasingOnTime(): MealType {
    const hour = new Date().getHours();

    if (hour < 6) {
        return 'any';
    }

    if (hour < 11) {
        return 'breakfast';
    }

    if (hour < 16) {
        return 'launch';
    }

    if (hour < 20) {
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