'use client';

import styles from '@/styles/app/search/page.module.scss';
import ingredientStyles from '@/styles/app/search/search-ingredient-category.module.scss';
import { Button } from '@/src/components/common/button';
import { FormEvent, useState } from 'react';
import { getSearchFormData, getSelectedIngredientNumber } from '@/src/utils/search-form.utils';
import { useRouter } from 'next/navigation';

export function SearchForm({ children }) {
    const router = useRouter();
    const [isSearchDisabled, setIsSearchDisabled] = useState<boolean>(true);

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const { ingredients } = getSearchFormData(e);

        if (ingredients.length === 0) {
            router.push('/search');
        }

        router.push(`/search?ings=${ingredients.join(',')}`);
    };

    const onClick = (): void => {
        const ingredientClass = ingredientStyles['search-ingredient-category__ingredient'];
        const selectedIngredientNumber= getSelectedIngredientNumber(ingredientClass);

        setIsSearchDisabled(selectedIngredientNumber === 0);
    };

    return (
        <form onSubmit={onSubmit} onClick={onClick}>
            <div id={styles['search-query-part']}>
                {children}
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3 mb-5">
                <Button label={'Szukaj'} type="submit" disabled={isSearchDisabled} />
            </div>
        </form>
    );
}