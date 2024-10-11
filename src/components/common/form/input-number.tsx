import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { ChangeEvent } from 'react';
import { FieldError } from 'react-hook-form';

interface InputNumberProps {
    label: string;
    value: string;
    setValue: (newValue: string) => void;
    unit?: string; // TODO: UnitType;
    width?: string;
    error?: FieldError;
    shouldHaveMargin?: boolean;
    customError?: {
        message: string;
        isError: boolean;
    };
}

export function InputNumber({ label, value, setValue, unit, width = '25ch', error, shouldHaveMargin = false, customError }: InputNumberProps) {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value.trim());
    };

    const isFloat = (value: number) => !isNaN(value) && value.toString().indexOf('.') != -1;

    const inputProps = {
        endAdornment: <InputAdornment position="end">{unit}</InputAdornment>
    };

    return (
        <TextField
            label={label}
            className="input-number"
            sx={{ margin: shouldHaveMargin ? 1 : 0, width }}
            InputProps={unit ? inputProps : {}}
            value={value}
            onChange={onChange}
            error={Boolean(error) || customError?.isError}
            helperText={(customError?.isError ? customError?.message : undefined) ?? error?.message ?? ''}
        />
    );
}