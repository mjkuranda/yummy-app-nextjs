import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ChangeEvent } from 'react';

interface InputAreaString {
    label: string;
    maxRows?: number;
    placeholder?: string;
    defaultValue?: string;
    variant?: 'outlined' | 'filled' | 'standard';
    value: string;
    setValue: (newValue: string) => void;
}

export function InputAreaString({ label, maxRows = 4, placeholder, defaultValue, variant = 'standard', value, setValue }: InputAreaString) {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    className="input-area-string"
                    label={label}
                    multiline
                    maxRows={maxRows}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    variant={variant}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </Box>
    );
}