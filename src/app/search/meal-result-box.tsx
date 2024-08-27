'use client';

import resultStyles from '@/styles/app/search/search-meal-result.module.scss';
import { SearchMealResult } from '@/src/app/search/search-meal-result';
import { useGetMeals } from '@/src/api/endpoints';
import { useSearchFilters } from '@/src/hooks/use-search-filters';
import { Loader } from '@/src/components/common/loader';

export function MealResultBox() {
    const { originalQuery, ings } = useSearchFilters();
    const { data: meals, isLoading } = useGetMeals(ings);

    if (!meals && isLoading) {
        return <Loader />;
    }

    return (
        <section className={resultStyles['result-box']}>
            {meals && meals?.length > 0
                ? meals.map(meal => {
                    return <SearchMealResult meal={meal} key={meal.id} ingredientQuery={originalQuery} />;
                })
                : <div className="w-100 text-center">Found 0 results.</div>
            }
        </section>
    );
}