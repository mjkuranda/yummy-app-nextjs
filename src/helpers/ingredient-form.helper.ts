import { IngredientWithId } from '@/src/types/ingredient.types';
import { InputListItem } from '@/src/components/common/form/input-ingredient-list';

export function addIngredient(item: InputListItem): IngredientWithId {
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