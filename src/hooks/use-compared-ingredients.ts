'use client';

import { ReadonlyURLSearchParams } from 'next/navigation';
import { DetailedDish } from '@/src/types/api.types';

export function useComparedIngredients(searchParams: ReadonlyURLSearchParams, meal: DetailedDish): boolean[] | null {
    const sourceUrl = searchParams.get('sourceUrl');

    if (!sourceUrl) {
        return null;
    }

    const ingredients = sourceUrl.substring(13).split(',');

    return meal.ingredients.map(ingredient => ingredients.includes(ingredient.name));
}