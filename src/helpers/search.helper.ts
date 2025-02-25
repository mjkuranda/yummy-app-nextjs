import { DishResult } from '@/src/types/api.types';
import { DishRecord, DishType, DishTypeText, MealType, PeriodText } from '@/src/types/dish.types';

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

export function getPeriodText(mealType: MealType): string {
    const texts = PeriodText[mealType];
    const randomIdx = Math.floor(Math.random() * texts.length);

    return texts[randomIdx];
}

type PeriodTimesType = { start: string, end: string };

export function getPeriodTimes(mealType: MealType): PeriodTimesType {
    switch (mealType) {
    case 'any': return { start: '20:00', end: '5:59' };
    case 'breakfast': return { start: '6:00', end: '10:59' };
    case 'launch': return { start: '11:00', end: '15:59' };
    case 'dinner': return { start: '16:00', end: '19:59' };
    }
}

export function getPeriodProgressState(periodTimes: PeriodTimesType): { value: number, maxValue: number } {
    const [, month, day, year] = new Date().toString().split(' ');
    const currentDate = `${month} ${day} ${year}`;
    const nextDay = `${month} ${new Date().getDate() + 1} ${year}`;

    const startDate = new Date(`${currentDate} ${periodTimes.start}`);
    const endDate = new Date(`${periodTimes.start === '20:00' ? nextDay : currentDate} ${periodTimes.end}`);

    const maxValue = endDate.getTime() - startDate.getTime();
    const value = Date.now() - startDate.getTime();

    return { value, maxValue };
}