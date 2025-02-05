import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ErrorMessage } from '@/src/components/common/error-message';

export interface InputSelectOption {
    en: string;
    label: string;
}

interface InputSelectProps {
    id: string;
    label: string;
    options: InputSelectOption[];
    selectedValue: string;
    setSelectedValue: (newValue: string) => void;
    width?: string;
    shouldHaveNone?: boolean;
    shouldHaveMargin?: boolean;
    customError?: {
        message: string;
        isError: boolean;
    };
}

export function InputSelect({ label, id, width = '100%', options, selectedValue, setSelectedValue, shouldHaveNone, shouldHaveMargin = false, customError }: InputSelectProps) {
    const onChange = (event: SelectChangeEvent<string>): void => {
        setSelectedValue(event.target.value as string);
    };

    return (
        <div>
            <FormControl sx={{ margin: shouldHaveMargin ? 1 : 0, width }}>
                <InputLabel id={id}>{label}</InputLabel>
                <Select
                    labelId={id}
                    id={id}
                    value={selectedValue}
                    onChange={onChange}
                    label={label}
                    error={customError?.isError}
                >
                    {shouldHaveNone &&
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                    }
                    {options.map((option) => (
                        <MenuItem key={option.en} value={option.en}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
                <ErrorMessage error={customError} />
            </FormControl>
        </div>
    );
}