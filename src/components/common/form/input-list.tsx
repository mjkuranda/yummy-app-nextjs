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
    en: string;
    pl: string;
}

interface InputListProps {
    items: InputListItem[];
    label: string;
    selectedItems: Items;
    setSelectedItems: (items: Items) => void;
    error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    onFilter?: (match: string) => InputListItem[];
}

export function InputList({ label, selectedItems, setSelectedItems, error, onFilter }: InputListProps) {
    const [inputValue, setInputValue] = useState('');

    const onChange = (event: SyntheticEvent<Element>, newValue: InputListItem | null): void => {
        if (newValue && !selectedItems[newValue.en]) {
            setSelectedItems({ ...selectedItems, [newValue.en]: newValue.pl });
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