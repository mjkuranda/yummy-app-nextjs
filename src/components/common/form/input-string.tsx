'use client';

import Box from '@mui/material/Box';
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
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                label={label}
                variant={variant}
                value={value}
                onChange={onChange}
            />
        </Box>
    );
}