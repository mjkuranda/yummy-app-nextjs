'use client';

import { SearchFilters } from '@/src/types/search.types';
import { useSearchParams } from 'next/navigation';
import { decodeIngredients } from '@/src/helpers/query.helper';
import { DishType, MealType } from '@/src/types/dish.types';

export function useSearchFilters(): SearchFilters {
    const searchParams = useSearchParams();

    return {
        originalQuery: `ings=${searchParams.get('ings')}&type=${searchParams.get('type')}&dish=${searchParams.get('dish')}`,
        ings: decodeIngredients(searchParams.get('ings')),
        type: (searchParams.get('type') ?? 'any') as MealType,
        dish: (searchParams.get('dish') ?? 'any') as DishType
    };
}