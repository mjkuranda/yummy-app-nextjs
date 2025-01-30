'use client';

import { ReadonlyURLSearchParams } from 'next/navigation';
import { DetailedDish } from '@/src/types/api.types';
import pantryIngredients from '@/public/data/ingredients/pantry.json';

export function useComparedIngredients(searchParams: ReadonlyURLSearchParams, dish: DetailedDish): boolean[] | null {
    const sourceUrl = searchParams.get('sourceUrl');

    if (!sourceUrl) {
        return null;
    }

    const [,, ...ings] = sourceUrl.split(',');
    const ingredients = [...ings, ...pantryIngredients];

    return dish.ingredients.map(ingredient => ingredients.includes(ingredient.name));
}