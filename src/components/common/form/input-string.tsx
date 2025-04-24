'use client';

import TextField from '@mui/material/TextField';
import { ChangeEvent, KeyboardEventHandler } from 'react';
import { FieldError } from 'react-hook-form';
import { DebounceInput } from 'react-debounce-input';

interface InputStringProps {
    label: string;
    variant?: 'outlined' | 'filled' | 'standard';
    value: string;
    setValue: (newValue: string) => void;
    error?: FieldError;
    width?: string;
    onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
}

export function InputString({ label, variant = 'standard', value, setValue, error, width = '100%', onKeyDown }: InputStringProps) {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <TextField
            label={label}
            variant={variant}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            error={Boolean(error)}
            helperText={error?.message ?? ''}
            autoComplete="new-password"
            type="text"
            fullWidth={width === '100%'}
            style={width === '100%' ? {} : { width }}
        />
    );
}

interface DebounceInputStringProps extends InputStringProps {
    minLength: number;
    debounceTimeout: number;
}

export function DebounceInputString({ label, variant = 'standard', value, setValue, error, width = '100%', debounceTimeout, minLength, onKeyDown }: DebounceInputStringProps) {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <DebounceInput
            label={label}
            variant={variant}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            error={Boolean(error)}
            helperText={error?.message ?? ''}
            autoComplete="new-password"
            type="text"
            fullWidth={width === '100%'}
            style={width === '100%' ? {} : { width }}
            minLength={minLength}
            debounceTimeout={debounceTimeout}
            element={TextField}
        />
    );
}