'use client';

import resultStyles from '@/styles/app/search/search-meal-result.module.scss';
import { SearchMealResult } from '@/src/app/search/search-meal-result';
import { useGetMeals } from '@/src/api/endpoints';
import { useSearchParams } from 'next/navigation';

export function MealResultBox() {
    const searchParams = useSearchParams();
    const ingredients = searchParams.get('ings') ?? '';
    const { data: meals, isLoading } = useGetMeals(ingredients);

    if (!meals && isLoading) {
        return <>Loading...</>;
    }

    return (
        <section className={resultStyles['result-box']}>
            {meals?.map(meal => {
                return <SearchMealResult meal={meal} key={meal.id} ingredientQuery={ingredients} />;
            })}
        </section>
    );
}