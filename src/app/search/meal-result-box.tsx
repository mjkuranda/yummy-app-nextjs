'use client';

import resultStyles from '@/styles/app/search/search-meal-result.module.scss';
import { SearchMealResult } from '@/src/app/search/search-meal-result';
import { useGetMeals } from '@/src/api/endpoints';
import { useSearchFilters } from '@/src/hooks/use-search-filters';
import { Loader } from '@/src/components/common/loader';
import { useEffect, useRef, useState } from 'react';
import { filterMealByType } from '@/src/helpers/search.helper';
import { MealResult } from '@/src/types/api.types';

export function MealResultBox() {
    const boxRef = useRef<HTMLElement>(null);
    const { originalQuery, ings, type, dish } = useSearchFilters();
    const { data: meals, isLoading } = useGetMeals(ings);
    const [filteredMeals, setFilteredMeals] = useState<MealResult[]>([]);

    useEffect(() => {
        if (!isLoading && ings.length > 0) {
            const filtered = filterMealByType(meals ?? [], type, dish);

            setFilteredMeals(filtered);
            boxRef?.current?.scrollIntoView();
        }
    }, [meals, type, dish]);

    if (!meals && isLoading) {
        return <Loader />;
    }

    return (
        <section className={[resultStyles['result-box'], 'pt-4'].join(' ')} ref={boxRef}>
            {ings.length > 0 && (filteredMeals.length > 0
                ? filteredMeals.map(meal => {
                    return <SearchMealResult meal={meal} key={meal.id} ingredientQuery={originalQuery} />;
                })
                : <div className="w-100 text-center">
                    <b><i>Nie znaleziono żadnych dopasowań.</i></b>
                </div>
            )}
        </section>
    );
}