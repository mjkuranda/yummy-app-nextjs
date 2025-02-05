'use client';

import styles from '@/styles/app/search/page.module.scss';
import { Button } from '@/src/components/common/button';
import { FormEvent, ReactElement } from 'react';
import { InputSelect, InputSelectOption } from '@/src/components/common/form/input-select';
import { ProgressBar } from '@/src/components/common/progress-bar';
import {
    getPeriodProgressState,
    getPeriodText,
    getPeriodTimes,
    inferMealTypeBasingOnTime
} from '@/src/helpers/search.helper';
import { DishType, MealType } from '@/src/types/dish.types';

interface SearchFormProps {
    children: ReactElement[];
    dishTypeOptions: InputSelectOption[];
    mealTypeOptions: InputSelectOption[];
    selectedDishType: DishType;
    selectedMealType: MealType;
    isSearchDisabled: boolean;
    onClear: () => void;
    onClick: () => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    onSelectDishType: (dishType: DishType) => void;
    onSelectMealType: (mealType: MealType) => void;
}

export function SearchForm({ children, dishTypeOptions, mealTypeOptions, selectedDishType, selectedMealType, isSearchDisabled, onClear, onClick, onSubmit, onSelectDishType, onSelectMealType }: SearchFormProps) {
    const inferredMealType = inferMealTypeBasingOnTime();
    const periodText = getPeriodText(inferredMealType);
    const periodTimes = getPeriodTimes(inferredMealType);
    const { value, maxValue } = getPeriodProgressState(periodTimes);
    const mealOption = mealTypeOptions.find(meal => meal.en === inferredMealType) as InputSelectOption;

    return (
        <form onSubmit={onSubmit} onClick={onClick}>
            <div id={styles['form-content-container']}>
                <h3 className="text-center p-4">Wybierz typ posiłku:</h3>
                <div>
                    <InputSelect<MealType>
                        width={'200px'}
                        id={'meal-type'}
                        label={'Typ posiłku'}
                        options={mealTypeOptions}
                        selectedValue={selectedMealType}
                        setSelectedValue={onSelectMealType}
                        shouldHaveMargin={true}
                    />
                    <InputSelect<DishType>
                        width={'200px'}
                        id={'dish-type'}
                        label={'Typ dania'}
                        options={dishTypeOptions}
                        selectedValue={selectedDishType}
                        setSelectedValue={onSelectDishType}
                        shouldHaveMargin={true}
                    />
                </div>
                <div className={styles['type-details']}>
                    <div className={styles['type-details__container']}>
                        <h5>Czas na posiłek: {mealOption.label}</h5>
                        <ProgressBar value={value} maxValue={maxValue} />
                        <div className={styles['time-period-container']}>
                            <p>{periodTimes.start}</p>
                            <p>{periodTimes.end}</p>
                        </div>
                        <p className={styles['period-text']}>
                            {periodText}
                        </p>
                    </div>
                </div>
            </div>
            <div id={styles['search-query-part']}>
                <h3 className="text-center">Wybierz składniki:</h3>
                <div className={styles['ingredient-category-container']}>{children}</div>
            </div>
            <div className={styles['search-controls']}>
                <Button label={'Wyczyść'} icon="clear" type={'button'} disabled={isSearchDisabled} onClick={onClear} />
                <Button label={'Szukaj'} icon="search" type="submit" disabled={isSearchDisabled} />
            </div>
        </form>
    );
}