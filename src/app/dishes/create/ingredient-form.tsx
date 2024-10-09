'use client';

import styles from '@/styles/app/dishes/create/ingredient-form.module.scss';
import { useIngredientFormContext } from '@/src/contexts/ingredient-form.context';
import { InputIngredientList } from '@/src/components/common/form/input-ingredient-list';
import { ErrorMessage } from '@/src/components/common/error-message';
import { filterIngredients } from '@/src/helpers/ingredient-form.helper';
import { IngredientDataValue } from '@/src/types/ingredient.types';

interface IngredientFormProps {
    ingredientDataValues: IngredientDataValue[];
}

export function IngredientForm({ ingredientDataValues }: IngredientFormProps) {
    const { ingredients, onChangeIngredients, error } = useIngredientFormContext();

    return (
        <div className={styles['ingredient-form']}>
            <h4>Ingredient list</h4>
            <ErrorMessage error={error} />
            <InputIngredientList
                items={ingredientDataValues}
                label={'Ingredients'}
                selectedItems={ingredients}
                setSelectedItems={onChangeIngredients}
                onFilter={filterIngredients}
            />
        </div>
    );
}