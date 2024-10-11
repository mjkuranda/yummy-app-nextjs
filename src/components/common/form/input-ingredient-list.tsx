import React, { SyntheticEvent, useState } from 'react';
import {
    Autocomplete,
    TextField,
    List,
    Box,
    AutocompleteInputChangeReason
} from '@mui/material';
import { FieldError, Merge } from 'react-hook-form';
import { IngredientDataValue, IngredientWithId } from '@/src/types/ingredient.types';
import { DishIngredient } from '@/src/app/dishes/create/dish-ingredient';
import { addIngredient } from '@/src/helpers/ingredient-form.helper';

interface InputListProps {
    items: IngredientDataValue[];
    label: string;
    selectedItems: IngredientWithId[];
    setSelectedItems: (items: IngredientWithId[]) => void;
    error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    onFilter?: (ingredients: IngredientDataValue[], match: string) => IngredientDataValue[];
}

export function InputIngredientList({ items, label, selectedItems, setSelectedItems, error, onFilter }: InputListProps) {
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState(null);

    const onChange = (event: SyntheticEvent<Element>, newValue: IngredientDataValue | null): void => {
        if (newValue) {
            const hasThisIngredient = selectedItems.some(item => item.data.en === newValue.en);

            if (!hasThisIngredient) {
                const newItem = addIngredient(newValue);
                setSelectedItems([...selectedItems, newItem]);
                setValue(null);
            }
        }
    };

    const onInputChange = (event: SyntheticEvent<Element>, newInputValue: string, reason: AutocompleteInputChangeReason): void => {
        const valueToChange = reason === 'reset' ? '' : newInputValue;
        setInputValue(valueToChange);
    };

    const onOpen = () => {};

    const onClose = () => setInputValue('');

    return (
        <Box sx={{ width: '100%' }}>
            <Autocomplete<IngredientDataValue>
                options={onFilter ? onFilter(items, inputValue) : []}
                getOptionLabel={option => option.pl.charAt(0).toUpperCase() + option.pl.substring(1)}
                getOptionKey={option => option.en}
                onChange={onChange}
                inputValue={inputValue}
                value={value}
                clearOnBlur={false}
                selectOnFocus={false}
                onOpen={onOpen}
                onClose={onClose}
                onInputChange={onInputChange}
                noOptionsText={'Brak znalezionych składników'}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        label={label}
                        error={Boolean(error)}
                        helperText={error?.message ?? ''}
                    />
                }
            />
            <List>
                {selectedItems.map(ingredient =>
                    <DishIngredient
                        key={ingredient.id}
                        ingredient={ingredient}
                    />
                )}
            </List>
            <p className={'text-center'}>Wybrano {selectedItems.length} składników.</p>
        </Box>
    );
}