'use client';

import resultStyles from '@/styles/app/search/search-meal-result.module.scss';
import { SearchMealResult } from '@/src/app/search/search-meal-result';
import { useGetMeals } from '@/src/api/endpoints';
import { useSearchFilters } from '@/src/hooks/use-search-filters';

export function MealResultBox() {
    const { originalQuery, ings } = useSearchFilters();
    const { data: meals, isLoading } = useGetMeals(ings);

    if (!meals && isLoading) {
        return <>Loading...</>;
    }

    return (
        <section className={resultStyles['result-box']}>
            {meals?.map(meal => {
                return <SearchMealResult meal={meal} key={meal.id} ingredientQuery={originalQuery} />;
            })}
        </section>
    );
}