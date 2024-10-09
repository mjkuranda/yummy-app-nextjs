import { FormHelperText } from '@mui/material';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { DishRecipeSectionWithId } from '@/src/types/dish.types';

interface ErrorMessageProps {
    error?: FieldError | Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<DishRecipeSectionWithId>> | undefined)[]>;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
    if (!error) {
        return <></>;
    }

    return (
        <FormHelperText error className="mb-4 text-center">{error.message}</FormHelperText>
    );
}