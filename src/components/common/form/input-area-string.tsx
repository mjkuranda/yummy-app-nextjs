import TextField from '@mui/material/TextField';
import { ChangeEvent } from 'react';
import { FieldError } from 'react-hook-form';

interface InputAreaString {
    label: string;
    value: string;
    setValue: (newValue: string) => void;
    defaultValue?: string;
    width?: string;
    minRows?: number;
    maxRows?: number;
    placeholder?: string;
    variant?: 'outlined' | 'filled' | 'standard';
    error?: FieldError;
}

export function InputAreaString({ label, minRows = 1, maxRows = 4, placeholder, defaultValue, variant = 'standard', value, setValue, error, width = '100%' }: InputAreaString) {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <TextField
            className="input-area-string"
            label={label}
            multiline
            minRows={minRows}
            maxRows={maxRows}
            placeholder={placeholder}
            defaultValue={defaultValue}
            variant={variant}
            value={value}
            onChange={onChange}
            error={Boolean(error)}
            helperText={error?.message ?? ''}
            fullWidth={width === '100%'}
        />
    );
}