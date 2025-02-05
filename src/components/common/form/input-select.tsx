import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ErrorMessage } from '@/src/components/common/error-message';
import { DishType, MealType } from '@/src/types/dish.types';

export type InputSelectOptionIcon = MealType | DishType;

export interface InputSelectOption {
    en: string;
    label: string;
    icon?: InputSelectOptionIcon;
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

    const renderIcon = (icon: InputSelectOptionIcon) => {
        const iconSize = 24;
        const altText = `Ikona ${icon}`;

        if (icon === 'any') {
            return <img src={'/input-icons/meal.png'} width={iconSize} height={iconSize}  alt={altText} />;
        }

        return <img src={`/input-icons/${icon}.png`} width={iconSize} height={iconSize}  alt={altText} />;
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
                            <div className="d-flex align-items-center">
                                {option.icon && renderIcon(option.icon)}&nbsp;{option.label}
                            </div>
                        </MenuItem>
                    ))}
                </Select>
                <ErrorMessage error={customError} />
            </FormControl>
        </div>
    );
}