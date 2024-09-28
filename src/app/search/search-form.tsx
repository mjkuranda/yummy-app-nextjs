'use client';

import styles from '@/styles/app/search/page.module.scss';
import ingredientStyles from '@/styles/app/search/search-ingredient-category.module.scss';
import { Button } from '@/src/components/common/button';
import { FormEvent, ReactElement, useMemo, useState } from 'react';
import { clearSearchIngredients, getSearchFormData, getSelectedIngredientNumber } from '@/src/utils/search-form.utils';
import { useRouter } from 'next/navigation';
import { encodeIngredients } from '@/src/helpers/query.helper';
import { useSearchFilters } from '@/src/hooks/use-search-filters';
import { addMealProposal } from '@/src/api/api';
import { toastError } from '@/src/utils/toast.utils';
import { UnauthorizedError } from '@/src/api/api-errors';
import { InputSelect } from '@/src/components/common/form/input-select';
import { MealTypeText } from '@/src/types/meal.types';
import { useUserContext } from '@/src/contexts/user.context';

interface SearchFormProps {
    children: ReactElement[];
}

export function SearchForm({ children }: SearchFormProps) {
    const router = useRouter();
    const { ings, type } = useSearchFilters();
    const { isLoggedIn } = useUserContext();
    const mealTypeOptions = useMemo(() => {
        const object = { ...MealTypeText, 'any': { en: 'any', pl: 'każdy' } };

        return Object
            .entries(object)
            .map(entry => ({
                en: entry[1].en,
                label: entry[1].pl[0].toUpperCase() + entry[1].pl.substring(1)
            }));
    },
    []);
    const [isSearchDisabled, setIsSearchDisabled] = useState<boolean>(ings.length === 0);
    const [selectedMealType, setSelectedMealType] = useState<string>(type ?? 'any');

    const onSelectedMealType = (mealType: string) => setSelectedMealType(mealType);

    const onClear = () => {
        clearSearchIngredients();
        setSelectedMealType('any');
        router.push('/search');
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const { ingredients } = getSearchFormData(e);

        if (ingredients.length === 0) {
            return router.push('/search');
        }

        if (isLoggedIn()) {
            try {
                await addMealProposal(ingredients);
            } catch (err: any) {
                if (!(err instanceof UnauthorizedError)) {
                    toastError(`Error occurred while adding a new meal proposal: ${err.message}`);
                }
            }
        }

        router.push(`/search?ings=${encodeIngredients(ingredients)}&type=${selectedMealType}`);
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
            <div id={styles['search-meal-type']}>
                <InputSelect
                    width={'33%'}
                    id={'meal-type'}
                    label={'Typ posiłku'}
                    options={mealTypeOptions}
                    selectedValue={selectedMealType}
                    setSelectedValue={onSelectedMealType}
                />
            </div>
            <div className={`${styles['search-controls']} d-flex justify-content-center align-items-center mt-5 mb-4`}>
                <Button label={'Wyczyść'} type={'button'} disabled={isSearchDisabled} onClick={onClear} />
                <Button label={'Szukaj'} type="submit" disabled={isSearchDisabled} />
            </div>
        </form>
    );
}