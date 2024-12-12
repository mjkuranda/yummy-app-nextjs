'use client';

import resultStyles from '@/styles/app/search/search-dish-result.module.scss';
import { SearchDishResult } from '@/src/app/search/search-dish-result';
import { useGetDishes } from '@/src/api/endpoints';
import { useSearchFilters } from '@/src/hooks/use-search-filters';
import { Loader } from '@/src/components/common/loader';
import { useEffect, useRef, useState } from 'react';
import { filterDishByType } from '@/src/helpers/search.helper';
import { DishResult } from '@/src/types/api.types';

export function DishResultBox() {
    const boxRef = useRef<HTMLElement>(null);
    const { originalQuery, ings, mealType, dishType } = useSearchFilters();
    const { data: dishes, isLoading } = useGetDishes(ings);
    const [filteredDishes, setFilteredDishes] = useState<DishResult[]>([]);

    useEffect(() => {
        if (!isLoading && ings.length > 0) {
            const filtered = filterDishByType(dishes ?? [], mealType, dishType);

            setFilteredDishes(filtered);
            boxRef?.current?.scrollIntoView();
        }
    }, [dishes, mealType, dishType]);

    if (!dishes && isLoading) {
        return <Loader />;
    }

    return (
        <section className={[resultStyles['result-box'], 'pt-4'].join(' ')} ref={boxRef}>
            {ings.length > 0 && (filteredDishes.length > 0
                ? filteredDishes.map(dish => {
                    return <SearchDishResult dish={dish} key={dish.id} ingredientQuery={originalQuery} />;
                })
                : <div className="w-100 text-center">
                    <b><i>Nie znaleziono żadnych dopasowań.</i></b>
                </div>
            )}
        </section>
    );
}