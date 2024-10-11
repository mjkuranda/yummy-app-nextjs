import { FormHelperText } from '@mui/material';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { DishRecipeSectionWithId } from '@/src/types/dish.types';

interface ErrorMessageProps {
    error?: FieldError | Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<DishRecipeSectionWithId>> | undefined)[]> | { isError: boolean; message: string };
}

export function ErrorMessage({ error }: ErrorMessageProps) {
    if (!error) {
        return <></>;
    }

    return (
        <FormHelperText error className="mb-4 text-center">{Object.keys(error).length === 2 ? (error?.isError ? error.message : '') : error.message}</FormHelperText>
    );
}