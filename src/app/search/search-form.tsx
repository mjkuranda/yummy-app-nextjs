'use client';

import styles from '@/styles/app/search/page.module.scss';
import { Button } from '@/src/components/common/button';
import { FormEvent, ReactElement } from 'react';
import { InputSelect, InputSelectOption } from '@/src/components/common/form/input-select';

interface SearchFormProps {
    children: ReactElement[];
    dishTypeOptions: InputSelectOption[];
    mealTypeOptions: InputSelectOption[];
    selectedDishType: string;
    selectedMealType: string;
    isSearchDisabled: boolean;
    onClear: () => void;
    onClick: () => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    onSelectDishType: (dishType: string) => void;
    onSelectMealType: (mealType: string) => void;
}

export function SearchForm({ children, dishTypeOptions, mealTypeOptions, selectedDishType, selectedMealType, isSearchDisabled, onClear, onClick, onSubmit, onSelectDishType, onSelectMealType }: SearchFormProps) {
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
                        setSelectedValue={onSelectMealType}
                        shouldHaveMargin={true}
                    />
                    <InputSelect
                        width={'200px'}
                        id={'dish-type'}
                        label={'Typ dania'}
                        options={dishTypeOptions}
                        selectedValue={selectedDishType}
                        setSelectedValue={onSelectDishType}
                        shouldHaveMargin={true}
                    />
                </div>
            </div>
            <div id={styles['search-query-part']}>
                <h3 className="text-center">Wybierz składniki:</h3>
                <div>{children}</div>
            </div>
            <div className={`${styles['search-controls']} d-flex justify-content-center align-items-center mt-5 mb-4`}>
                <Button label={'Wyczyść'} icon="clear" type={'button'} disabled={isSearchDisabled} onClick={onClear} />
                <Button label={'Szukaj'} icon="search" type="submit" disabled={isSearchDisabled} />
            </div>
        </form>
    );
}