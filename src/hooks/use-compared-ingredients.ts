'use client';

import { ReadonlyURLSearchParams } from 'next/navigation';
import { DetailedDish } from '@/src/types/api.types';
import pantryIngredients from '@/public/data/ingredients/pantry.json';

export function useComparedIngredients(searchParams: ReadonlyURLSearchParams, dish: DetailedDish): boolean[] | null {
    const sourceUrl = searchParams.get('sourceUrl');

    if (!sourceUrl) {
        return null;
    }

    const ingredients = [...sourceUrl.substring(13).split(','), ...pantryIngredients];

    return dish.ingredients.map(ingredient => ingredients.includes(ingredient.name));
}