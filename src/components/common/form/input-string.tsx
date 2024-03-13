'use client';

import TextField from '@mui/material/TextField';
import { ChangeEvent } from 'react';

interface InputStringProps {
    label: string;
    variant?: 'outlined' | 'filled' | 'standard';
    value: string;
    setValue: (newValue: string) => void;
}

export function InputString({ label, variant = 'standard', value, setValue }: InputStringProps) {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <TextField
            label={label}
            variant={variant}
            value={value}
            onChange={onChange}
        />
    );
}