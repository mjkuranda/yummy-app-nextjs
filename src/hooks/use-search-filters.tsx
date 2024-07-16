'use client';

import { SearchFilters } from '@/src/types/search.types';
import { useSearchParams } from 'next/navigation';
import { decodeIngredients } from '@/src/helpers/query.helper';

export function useSearchFilters(): SearchFilters {
    const searchParams = useSearchParams();

    return {
        originalQuery: `ings=${searchParams.get('ings')}`,
        ings: decodeIngredients(searchParams.get('ings'))
    };
}