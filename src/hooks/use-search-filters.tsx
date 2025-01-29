'use client';

import { SearchFilters } from '@/src/types/search.types';
import { useSearchParams } from 'next/navigation';
import { decodeIngredients } from '@/src/helpers/query.helper';
import { DishType, MealType } from '@/src/types/dish.types';
import { inferMealTypeBasingOnTime } from '@/src/helpers/search.helper';

export function useSearchFilters(): SearchFilters {
    const searchParams = useSearchParams();

    return {
        originalQuery: `ings=${searchParams.get('ings')}&type=${searchParams.get('type')}&dish=${searchParams.get('dish')}`,
        ings: decodeIngredients(searchParams.get('ings')),
        mealType: (searchParams.get('type') ?? inferMealTypeBasingOnTime()) as MealType,
        dishType: (searchParams.get('dish') ?? 'any') as DishType
    };
}