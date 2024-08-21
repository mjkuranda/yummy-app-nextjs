'use client';

import { createContext, useContext } from 'react';
import { MealRecipeSectionWithId } from '@/src/types/meal.types';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface RecipeFormProviderProps {
    children: any;
    sections: MealRecipeSectionWithId[];
    onChangeSections: (sections: MealRecipeSectionWithId[]) => void;
    error?: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<MealRecipeSectionWithId>> | undefined)[]>;
}

type RecipeFormContextValues = Omit<RecipeFormProviderProps, 'children'>;

const defaultValue: RecipeFormContextValues = {
    sections: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChangeSections: (sections: MealRecipeSectionWithId[]): void => {}
};

const RecipeFormContext = createContext<RecipeFormContextValues>(defaultValue);

export const useRecipeFormContext = () => useContext(RecipeFormContext);

export function RecipeFormProvider({ children, sections, onChangeSections, error }: RecipeFormProviderProps) {
    const contextValue: RecipeFormContextValues = { sections, onChangeSections, error };

    return (
        <RecipeFormContext.Provider value={contextValue}>
            {children}
        </RecipeFormContext.Provider>
    );
}