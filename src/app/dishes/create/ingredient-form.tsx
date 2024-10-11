'use client';

import styles from '@/styles/app/dishes/create/ingredient-form.module.scss';
import { useIngredientFormContext } from '@/src/contexts/ingredient-form.context';
import { InputIngredientList } from '@/src/components/common/form/input-ingredient-list';
import { filterIngredients } from '@/src/helpers/ingredient-form.helper';
import { IngredientDataValue } from '@/src/types/ingredient.types';

interface IngredientFormProps {
    ingredientDataValues: IngredientDataValue[];
}

export function IngredientForm({ ingredientDataValues }: IngredientFormProps) {
    const { ingredients, onChangeIngredients } = useIngredientFormContext();

    return (
        <div className={styles['ingredient-form']}>
            <h4>Lista składników</h4>
            <InputIngredientList
                items={ingredientDataValues}
                label={'Wpisz szukany składnik'}
                selectedItems={ingredients}
                setSelectedItems={onChangeIngredients}
                onFilter={filterIngredients}
            />
        </div>
    );
}