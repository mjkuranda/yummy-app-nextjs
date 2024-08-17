'use client';

import TextField from '@mui/material/TextField';
import { ChangeEvent } from 'react';
import { FieldError } from 'react-hook-form';

interface InputStringProps {
    label: string;
    variant?: 'outlined' | 'filled' | 'standard';
    value: string;
    setValue: (newValue: string) => void;
    error?: FieldError;
}

export function InputString({ label, variant = 'standard', value, setValue, error }: InputStringProps) {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <TextField
            label={label}
            variant={variant}
            value={value}
            onChange={onChange}
            error={Boolean(error)}
            helperText={error?.message ?? ''}
        />
    );
}