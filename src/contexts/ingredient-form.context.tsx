'use client';

import { createContext, useContext } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { IngredientWithId } from '@/src/types/ingredient.types';

interface IngredientFormProviderProps {
    children: any;
    ingredients: IngredientWithId[];
    onChangeIngredients: (ingredients: IngredientWithId[]) => void;
    error?: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<IngredientWithId>> | undefined)[]>
}

type IngredientFormContextValues = Omit<IngredientFormProviderProps, 'children'>;

const defaultValue: IngredientFormContextValues = {
    ingredients: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChangeIngredients: (ingredients: IngredientWithId[]): void => {}
};

const IngredientFormContext = createContext<IngredientFormContextValues>(defaultValue);

export const useIngredientFormContext = () => useContext(IngredientFormContext);

export function IngredientFormProvider({ children, ingredients, onChangeIngredients, error }: IngredientFormProviderProps) {
    const contextValue: IngredientFormContextValues = { ingredients, onChangeIngredients, error };

    return (
        <IngredientFormContext.Provider value={contextValue}>
            {children}
        </IngredientFormContext.Provider>
    );
}