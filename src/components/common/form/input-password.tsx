'use client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { FormHelperText } from '@mui/material';

interface InputPasswordProps {
    label: string;
    value: string;
    setValue: (newValue: string) => void;
    error?: FieldError;
    width?: string;
}

export function InputPassword({ label, value, setValue, error, width }: InputPasswordProps) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, width: width ?? '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
                value={value}
                onChange={onChange}
                error={Boolean(error)}
            />
            {error && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
    );
}