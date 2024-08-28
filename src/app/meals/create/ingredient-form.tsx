'use client';

import styles from '@/styles/app/meals/create/ingredient-form.module.scss';
import { useIngredientFormContext } from '@/src/contexts/ingredient-form.context';
import { useIngredientManager } from '@/src/hooks/use-ingredient-manager';
import { InputIngredientList } from '@/src/components/common/form/input-ingredient-list';

export function IngredientForm() {
    const { ingredients, onChangeIngredients } = useIngredientFormContext();
    const { labels, filterIngredients } = useIngredientManager();

    return (
        <div className={styles['ingredient-form']}>
            <h4>Ingredient list</h4>
            <InputIngredientList
                items={labels}
                label={'Ingredients'}
                selectedItems={ingredients}
                setSelectedItems={onChangeIngredients}
                onFilter={filterIngredients}
            />
        </div>
    );
}