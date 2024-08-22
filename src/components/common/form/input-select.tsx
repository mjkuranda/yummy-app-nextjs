import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Option {
    en: string;
    label: string;
}

interface InputSelectProps {
    id: string;
    label: string;
    options: Option[];
    selectedValue: string;
    setSelectedValue: (newValue: string) => void;
    width?: string;
    shouldHaveNone?: boolean;
}

export function InputSelect({ label, id, width = '100%', options, selectedValue, setSelectedValue, shouldHaveNone }: InputSelectProps) {
    const onChange = (event: SelectChangeEvent<string>): void => {
        setSelectedValue(event.target.value as string);
    };

    return (
        <div>
            <FormControl sx={{ width }}>
                <InputLabel id={id}>{label}</InputLabel>
                <Select
                    labelId={id}
                    id={id}
                    value={selectedValue}
                    onChange={onChange}
                    label={label}
                    sx={{ width }}
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
            </FormControl>
        </div>
    );
}