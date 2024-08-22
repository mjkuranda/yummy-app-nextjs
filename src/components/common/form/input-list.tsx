import React, { SyntheticEvent, useState } from 'react';
import {
    Autocomplete,
    TextField,
    List,
    Box,
    AutocompleteInputChangeReason
} from '@mui/material';
import { FieldError, Merge } from 'react-hook-form';
import { SelectedIngredient } from '@/src/app/meals/create/selected-ingredient';

export type Items = Record<string, string>;

interface InputListItem {
    label: string;
    en: string;
}

interface InputListProps {
    items: InputListItem[];
    label: string;
    selectedItems: Items;
    setSelectedItems: (items: Items) => void;
    error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
}

export function InputList({ items, label, selectedItems, setSelectedItems, error }: InputListProps) {
    const [inputValue, setInputValue] = useState('');

    const onChange = (event: SyntheticEvent<Element>, newValue: InputListItem | null): void => {
        if (newValue && !selectedItems[newValue.en]) {
            setSelectedItems({ ...selectedItems, [newValue.en]: newValue.label });
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
                options={items}
                getOptionLabel={option => option.label}
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
                {Object.entries(selectedItems).map((item, index) =>
                    <SelectedIngredient
                        index={index}
                        item={item}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                    />
                )}
            </List>
            <p className={'text-center'}>Wybrano {Object.entries(selectedItems).length} składników.</p>
        </Box>
    );
}