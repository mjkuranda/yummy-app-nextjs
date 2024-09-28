'use client';

import { SearchFilters } from '@/src/types/search.types';
import { useSearchParams } from 'next/navigation';
import { decodeIngredients } from '@/src/helpers/query.helper';
import { MealType } from '@/src/types/meal.types';

export function useSearchFilters(): SearchFilters {
    const searchParams = useSearchParams();

    return {
        originalQuery: `ings=${searchParams.get('ings')}&type=${searchParams.get('type')}`,
        ings: decodeIngredients(searchParams.get('ings')),
        type: searchParams.get('type') as MealType
    };
}