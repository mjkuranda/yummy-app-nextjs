'use client';

import { ReadonlyURLSearchParams } from 'next/navigation';
import { DetailedMeal } from '@/src/types/api.types';

export function useComparedIngredients(searchParams: ReadonlyURLSearchParams, meal: DetailedMeal): boolean[] | null {
    const sourceUrl = searchParams.get('sourceUrl');

    if (!sourceUrl) {
        return null;
    }

    const ingredients = sourceUrl.substring(13).split(',');

    return meal.ingredients.map(ingredient => ingredients.includes(ingredient.name));
}