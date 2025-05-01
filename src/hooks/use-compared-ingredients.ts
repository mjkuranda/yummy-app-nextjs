'use client';

import { ReadonlyURLSearchParams } from 'next/navigation';
import { Ingredient } from '@/src/types/api.types';
import pantryIngredients from '@/public/data/ingredients/pantry.json';

export function useComparedIngredients(searchParams: ReadonlyURLSearchParams, ingredients: Ingredient[]): boolean[] | null {
    const sourceUrl = searchParams.get('sourceUrl');

    if (!sourceUrl) {
        return null;
    }

    const [,, ...ings] = sourceUrl.split(',');
    const mergedIngredients = [...ings, ...pantryIngredients];

    return ingredients.map(ingredient => mergedIngredients.includes(ingredient.name));
}