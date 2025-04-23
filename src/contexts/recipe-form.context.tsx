'use client';

import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { DishRecipeSectionWithId } from '@/src/types/dish.types';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { invertTranslations, sanitizeTranslations } from '@/src/utils/recipe.utils';
import { Translations } from '@/src/types/recipe.types';

import actionJson from '@/public/data/actions.json';
import ingredientJson from '@/public/data/ingredients.json';
import unitJson from '@/public/data/units.json';

interface RecipeFormProviderProps extends PropsWithChildren {
    sections: DishRecipeSectionWithId[];
    translations: Translations;
    onChangeSections: (sections: DishRecipeSectionWithId[]) => void;
    error?: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<DishRecipeSectionWithId>> | undefined)[]>;
}

type RecipeFormContextValues = Omit<RecipeFormProviderProps, 'children'>;

const defaultValue: RecipeFormContextValues = {
    translations: {
        actions: {},
        ingredients: [],
        units: {}
    },
    sections: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChangeSections: (sections: DishRecipeSectionWithId[]): void => {}
};

const RecipeFormContext = createContext<RecipeFormContextValues>(defaultValue);

export const useRecipeFormContext = () => useContext(RecipeFormContext);

export function RecipeFormProvider({ children, sections, onChangeSections, error }: RecipeFormProviderProps) {
    const translations = useMemo(() => {
        const actions = invertTranslations(actionJson, 'pl');
        const ingredients = sanitizeTranslations(ingredientJson);
        const units = invertTranslations(unitJson, 'pl');

        return { actions, ingredients, units };
    }, []);

    const contextValue: RecipeFormContextValues = { translations, sections, onChangeSections, error };

    return (
        <RecipeFormContext.Provider value={contextValue}>
            {children}
        </RecipeFormContext.Provider>
    );
}