import React, { SyntheticEvent, useState } from 'react';
import {
    Autocomplete,
    TextField,
    List,
    Box,
    AutocompleteInputChangeReason
} from '@mui/material';
import { FieldError, Merge } from 'react-hook-form';
import { IngredientWithId } from '@/src/types/ingredient.types';
import { MealIngredient } from '@/src/app/meals/create/meal-ingredient';
import { addIngredient } from '@/src/helpers/ingredient-form.helper';

export interface InputListItem {
    en: string;
    pl: string;
}

interface InputListProps {
    items: InputListItem[];
    label: string;
    selectedItems: IngredientWithId[];
    setSelectedItems: (items: IngredientWithId[]) => void;
    error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    onFilter?: (match: string) => InputListItem[];
}

export function InputIngredientList({ label, selectedItems, setSelectedItems, error, onFilter }: InputListProps) {
    const [inputValue, setInputValue] = useState('');

    const onChange = (event: SyntheticEvent<Element>, newValue: InputListItem | null): void => {
        if (newValue) {
            const hasThisIngredient = selectedItems.some(item => item.labels.en === newValue.en);

            if (!hasThisIngredient) {
                const newItem = addIngredient(newValue);
                setSelectedItems([...selectedItems, newItem]);
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
        <Box sx={{ width: 300 }}>
            <Autocomplete<InputListItem>
                options={onFilter ? onFilter(inputValue) : []}
                getOptionLabel={option => option.pl.charAt(0).toUpperCase() + option.pl.substring(1)}
                getOptionKey={option => option.en}
                onChange={onChange}
                inputValue={inputValue}
                clearOnBlur={false}
                selectOnFocus={false}
                onOpen={onOpen}
                onClose={onClose}
                onInputChange={onInputChange}
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
                {Object.entries(selectedItems).map(([, ingredient]) =>
                    <MealIngredient
                        key={ingredient.id}
                        ingredient={ingredient}
                    />
                    // <SelectedIngredient
                    //     index={index}
                    //     item={item}
                    //     selectedItems={selectedItems}
                    //     setSelectedItems={setSelectedItems}
                    // />
                )}
            </List>
            <p className={'text-center'}>Wybrano {Object.entries(selectedItems).length} składników.</p>
        </Box>
    );
}