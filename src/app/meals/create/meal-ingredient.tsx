'use client';

import styles from '@/styles/app/meals/create/ingredient-form.module.scss';
import { IngredientWithId } from '@/src/types/ingredient.types';
import { InputNumber } from '@/src/components/common/form/input-number';
import { InputSelect } from '@/src/components/common/form/input-select';
import { useState } from 'react';
import { RemoveButton } from '@/src/components/common/remove-button';
import { useIngredientFormContext } from '@/src/contexts/ingredient-form.context';
import { removeIngredient } from '@/src/helpers/ingredient-form.helper';

const unitOptions = [
    { en: 'g', label: 'g' },
    { en: 'kg', label: 'kg' },
    { en: 'mg', label: 'mg' },
    { en: 'lb', label: 'funty' },
    { en: 'oz', label: 'uncje' },
    { en: 'ml', label: 'ml' },
    { en: 'l', label: 'l' },
    { en: 'tsp', label: 'łyżeczki' },
    { en: 'tbsp', label: 'łyżki' },
    { en: 'cup', label: 'kubki' },
    { en: 'pint', label: 'pinty' },
    { en: 'quart', label: 'kwarty' },
    { en: 'gallon', label: 'galony' },
    { en: 'fl oz', label: 'uncje płynne' },
    { en: 'piece', label: 'sztuki' },
    { en: 'slice', label: 'plasterki' },
    { en: 'pinch', label: 'szczypta' },
    { en: 'bunch', label: 'pęczek' },
    { en: 'can', label: 'puszka' },
    { en: 'box', label: 'pudełko' },
    { en: 'pack', label: 'opakowanie' },
    { en: 'jar', label: 'słoik' },
    { en: 'serving', label: 'porcja' },
    { en: 'servings', label: 'porcje' }
];

interface MealIngredientProps {
    ingredient: IngredientWithId;
}

export function MealIngredient({ ingredient }: MealIngredientProps) {
    const { ingredients, onChangeIngredients } = useIngredientFormContext();
    const [amount, setAmount] = useState<string>('0');
    const [unit, setUnit] = useState<string>(ingredient.unit);

    const setAmountValue = (newValue: string) => setAmount(newValue);

    const setUnitValue = (newValue: string) => setUnit(newValue);

    const onRemoveIngredient = () => {
        const modifiedItems = removeIngredient(ingredient, ingredients);

        onChangeIngredients(modifiedItems);
    };

    return (
        <li>
            <InputNumber label={'Amount'} value={amount} setValue={setAmountValue} width={'150px'} />
            <InputSelect id={`${ingredient.id}-unit`} label={'Unit'} options={unitOptions} selectedValue={unit} setSelectedValue={setUnitValue} width={'150px'} />
            <div className={styles['ingredient-name']}>{ingredient.labels.pl}</div>
            <RemoveButton label={'Remove'} onClick={onRemoveIngredient} />
        </li>
    );
}