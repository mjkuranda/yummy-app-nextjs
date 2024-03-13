import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { ChangeEvent } from 'react';

interface InputNumberProps {
    label: string;
    value: string;
    setValue: (newValue: string) => void;
    unit?: string; // TODO: UnitType
}

export function InputNumber({ label, value, setValue, unit }: InputNumberProps) {
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
            sx={{ m: 1, width: '25ch' }}
            InputProps={unit ? inputProps : {}}
            value={value}
            onChange={onChange}
            error={!isFloat(Number(value)) && !Number.isInteger(Number(value))}
        />
    );
}