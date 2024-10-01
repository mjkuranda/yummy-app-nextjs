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
import { MealType, MealTypeText } from '@/src/types/meal.types';
import { useUserContext } from '@/src/contexts/user.context';
import { getDishTypes, inferMealTypeBasingOnTime } from '@/src/helpers/search.helper';

interface SearchFormProps {
    children: ReactElement[];
}

export function SearchForm({ children }: SearchFormProps) {
    const router = useRouter();
    const { ings, type, dish } = useSearchFilters();
    const { isLoggedIn } = useUserContext();
    const inferredType = inferMealTypeBasingOnTime();
    const [isSearchDisabled, setIsSearchDisabled] = useState<boolean>(ings.length === 0);
    const [selectedMealType, setSelectedMealType] = useState<string>(type ?? inferredType);
    const [selectedDishType, setSelectedDishType] = useState<string>(dish ?? 'any');
    const mealTypeOptions = useMemo(() => {
        return Object
            .entries(MealTypeText)
            .map(entry => ({
                en: entry[1].en,
                label: entry[1].pl[0].toUpperCase() + entry[1].pl.substring(1)
            }));
    },
    []);
    const dishTypeOptions = useMemo(() => {
        const dishes = getDishTypes(selectedMealType as MealType);

        return Object
            .entries(dishes)
            .map(entry => ({
                en: entry[1].en,
                label: entry[1].pl[0].toUpperCase() + entry[1].pl.substring(1)
            }));
    }, [selectedMealType]);

    const onSelectedMealType = (mealType: string) => setSelectedMealType(mealType);

    const onSelectedDishType = (dishType: string) => setSelectedDishType(dishType);

    const onClear = () => {
        clearSearchIngredients();
        setSelectedMealType('any');
        setSelectedDishType('any');
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

        router.push(`/search?ings=${encodeIngredients(ingredients)}&type=${selectedMealType}&dish=${selectedDishType}`);
    };

    const onClick = (): void => {
        const ingredientClass = ingredientStyles['search-ingredient-category__ingredient'];
        const selectedIngredientNumber= getSelectedIngredientNumber(ingredientClass);

        setIsSearchDisabled(selectedIngredientNumber === 0);
    };

    return (
        <form onSubmit={onSubmit} onClick={onClick}>
            <div id={styles['search-meal-type']}>
                <h3 className="text-center m-4">Wybierz typ posiłku:</h3>
                <div>
                    <InputSelect
                        width={'200px'}
                        id={'meal-type'}
                        label={'Typ posiłku'}
                        options={mealTypeOptions}
                        selectedValue={selectedMealType}
                        setSelectedValue={onSelectedMealType}
                    />
                    <InputSelect
                        width={'200px'}
                        id={'dish-type'}
                        label={'Typ dania'}
                        options={dishTypeOptions}
                        selectedValue={selectedDishType}
                        setSelectedValue={onSelectedDishType}
                    />
                </div>
            </div>
            <div id={styles['search-query-part']}>
                <h3 className="text-center">Wybierz składniki:</h3>
                <div>{children}</div>
            </div>
            <div className={`${styles['search-controls']} d-flex justify-content-center align-items-center mt-5 mb-4`}>
                <Button label={'Wyczyść'} type={'button'} disabled={isSearchDisabled} onClick={onClear} />
                <Button label={'Szukaj'} type="submit" disabled={isSearchDisabled} />
            </div>
        </form>
    );
}