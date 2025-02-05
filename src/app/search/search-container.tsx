'use client';

import { useRouter } from 'next/navigation';
import { useSearchFilters } from '@/src/hooks/use-search-filters';
import { useUserContext } from '@/src/contexts/user.context';
import { FormEvent, ReactElement, useMemo, useState } from 'react';
import { DishType, MealType, MealTypeText } from '@/src/types/dish.types';
import { getDishTypes } from '@/src/helpers/search.helper';
import { clearSearchIngredients, getSearchFormData, getSelectedIngredientNumber } from '@/src/utils/search-form.utils';
import { addDishProposal } from '@/src/api/api';
import { UnauthorizedError } from '@/src/api/api-errors';
import { toastError } from '@/src/utils/toast.utils';
import { encodeIngredients } from '@/src/helpers/query.helper';
import ingredientStyles from '@/styles/app/search/search-ingredient-category.module.scss';
import { SearchForm } from '@/src/app/search/search-form';
import { InputSelectOptionIcon } from '@/src/components/common/form/input-select';

interface SearchContainerProps {
    children: ReactElement[];
}

export function SearchContainer({ children }: SearchContainerProps) {
    const router = useRouter();
    const { ings, mealType, dishType } = useSearchFilters();
    const { isLoggedIn } = useUserContext();
    const [isSearchDisabled, setIsSearchDisabled] = useState<boolean>(ings.length === 0);
    const [selectedMealType, setSelectedMealType] = useState<MealType>(mealType);
    const [selectedDishType, setSelectedDishType] = useState<DishType>(dishType);
    const mealTypeOptions = useMemo(() => {
        return Object
            .entries(MealTypeText)
            .map(entry => ({
                en: entry[1].en,
                label: entry[1].pl[0].toUpperCase() + entry[1].pl.substring(1),
                icon: entry[1].en as InputSelectOptionIcon
            }));
    },
    []);
    const dishTypeOptions = useMemo(() => {
        const dishes = getDishTypes(selectedMealType as MealType);

        return Object
            .entries(dishes)
            .map(entry => ({
                en: entry[1].en,
                label: entry[1].pl[0].toUpperCase() + entry[1].pl.substring(1),
                icon: entry[1].en as InputSelectOptionIcon
            }));
    }, [selectedMealType]);

    const onSelectedMealType = (mealType: MealType) => setSelectedMealType(mealType);

    const onSelectedDishType = (dishType: DishType) => setSelectedDishType(dishType);

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
                await addDishProposal(ingredients);
            } catch (err: any) {
                if (!(err instanceof UnauthorizedError)) {
                    toastError(`Wystąpił błąd podczas dodawania nowej propozycji dania: ${err.message}`);
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
        <SearchForm
            children={children}
            dishTypeOptions={dishTypeOptions}
            mealTypeOptions={mealTypeOptions}
            selectedDishType={selectedDishType}
            selectedMealType={selectedMealType}
            isSearchDisabled={isSearchDisabled}
            onClick={onClick}
            onClear={onClear}
            onSubmit={onSubmit}
            onSelectDishType={onSelectedDishType}
            onSelectMealType={onSelectedMealType}
        />
    );
}