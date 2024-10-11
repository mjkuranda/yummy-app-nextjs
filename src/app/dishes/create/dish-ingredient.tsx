'use client';

import styles from '@/styles/app/dishes/create/ingredient-form.module.scss';
import { IngredientWithId } from '@/src/types/ingredient.types';
import { InputNumber } from '@/src/components/common/form/input-number';
import { InputSelect } from '@/src/components/common/form/input-select';
import { useMemo, useState } from 'react';
import { RemoveButton } from '@/src/components/common/remove-button';
import { useIngredientFormContext } from '@/src/contexts/ingredient-form.context';
import { removeIngredient, setIngredientAmount, setIngredientUnit } from '@/src/helpers/ingredient-form.helper';

const unitOptions = [
    { en: 'g', label: 'g' },
    { en: 'kg', label: 'kg' },
    { en: 'mg', label: 'mg' },
    { en: 'ml', label: 'ml' },
    { en: 'l', label: 'l' },
    { en: 'tsp', label: 'łyżeczki' },
    { en: 'tbsp', label: 'łyżki' },
    { en: 'cup', label: 'kubki' },
    { en: 'piece', label: 'sztuki' },
    { en: 'slice', label: 'plasterki' },
    { en: 'pinch', label: 'szczypta' },
    { en: 'bunch', label: 'pęczek' },
    { en: 'can', label: 'puszka' },
    { en: 'box', label: 'pudełko' },
    { en: 'pack', label: 'opakowanie' },
    { en: 'jar', label: 'słoik' },
    { en: 'serving', label: 'porcja' },
    { en: 'servings', label: 'porcje' },
    { en: 'tablespoon', label: 'łyżka' },
    { en: 'tablespoons', label: 'łyżki' },
    { en: 'clove', label: 'ząbek' },
    { en: 'cloves', label: 'ząbki' }
];

interface DishIngredientProps {
    ingredient: IngredientWithId;
}

export function DishIngredient({ ingredient }: DishIngredientProps) {
    const { ingredients, onChangeIngredients } = useIngredientFormContext();
    const [amount, setAmount] = useState<string>(ingredient.amount ?? '0');
    const [unit, setUnit] = useState<string>(ingredient.unit);

    const setAmountValue = (newValue: string) => {
        const modifiedIngredients = setIngredientAmount(newValue, ingredient, ingredients);

        setAmount(newValue);
        onChangeIngredients(modifiedIngredients);
    };

    const setUnitValue = (newValue: string) => {
        const modifiedIngredients = setIngredientUnit(newValue, ingredient, ingredients);

        setUnit(newValue);
        onChangeIngredients(modifiedIngredients);
    };

    const onRemoveIngredient = () => {
        const modifiedItems = removeIngredient(ingredient, ingredients);

        onChangeIngredients(modifiedItems);
    };

    const customAmountError = useMemo(() => ({
        message: 'Wprowadź poprawną ilość',
        isError: !amount || amount.length === 0 || amount === '0' || amount.includes('-')
    }), [amount]);

    const customUnitError = {
        message: 'Wybierz jednostkę',
        isError: !unit || unit.length === 0
    };

    return (
        <li>
            <InputNumber label={'Ilość'} value={amount} setValue={setAmountValue} width={'150px'} shouldHaveMargin={true} customError={customAmountError} />
            <InputSelect id={`${ingredient.id}-unit`} label={'Jednostka'} options={unitOptions} selectedValue={unit} setSelectedValue={setUnitValue} width={'150px'} shouldHaveMargin={true} customError={customUnitError} />
            <div className={styles['ingredient-name']} style={{ marginTop: '26px', alignItems: 'flex-start' }}>{ingredient.data.pl}</div>
            <RemoveButton label={'Usuń'} onClick={onRemoveIngredient} customStyle={{ marginTop: '26px', alignItems: 'flex-start' }} />
        </li>
    );
}