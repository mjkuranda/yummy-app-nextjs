import { IngredientDataValue, IngredientWithId } from '@/src/types/ingredient.types';

export function addIngredient(item: IngredientDataValue): IngredientWithId {
    return {
        id: crypto.randomUUID(),
        data: { ...item },
        unit: '',
        amount: '0'
    };
}

export function removeIngredient(ingredient: IngredientWithId, ingredients: IngredientWithId[]): IngredientWithId[] {
    return ingredients.filter(element => element.id !== ingredient.id);
}

export function setIngredientAmount(amount: string, ingredient: IngredientWithId, ingredients: IngredientWithId[]): IngredientWithId[] {
    return ingredients.map(element => {
        if (element.id !== ingredient.id) {
            return element;
        }

        return {
            ...ingredient,
            amount
        };
    });
}

export function setIngredientUnit(unit: string, ingredient: IngredientWithId, ingredients: IngredientWithId[]): IngredientWithId[] {
    return ingredients.map(element => {
        if (element.id !== ingredient.id) {
            return element;
        }

        return {
            ...ingredient,
            unit
        };
    });
}

export function filterIngredients(ingredients: IngredientDataValue[], match: string): IngredientDataValue[] {
    if (match.length === 0) {
        return [];
    }

    // It depends on the language, but let's say, it's Polish.
    return ingredients.filter(label => label.pl.startsWith(match));
}