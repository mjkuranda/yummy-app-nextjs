import { DishResult } from '@/src/types/api.types';
import { DishRecord, DishType, DishTypeText, MealType } from '@/src/types/dish.types';

export function filterDishByType(dishes: DishResult[], mealType: MealType, dishType: DishType): DishResult[] {
    if (mealType === 'any' && dishType === 'any') {
        return dishes;
    }

    if (mealType === 'any') {
        return dishes.filter(dish => dish.type === dishType);
    }

    return dishes.filter(dish => dish.mealType === mealType && (dishType === 'any' || dish.type === dishType));
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

export function getDishTypes(mealType: MealType): DishRecord {
    const dishes = DishTypeText[mealType];

    if (Object.keys(dishes).length === 0) {
        return { any: { en: 'any', pl: 'każdy' } };
    }

    return dishes;
}