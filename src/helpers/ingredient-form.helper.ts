import { IngredientWithId } from '@/src/types/ingredient.types';
import { InputListItem } from '@/src/components/common/form/input-ingredient-list';

export function addIngredient(item: InputListItem): IngredientWithId {
    return {
        id: crypto.randomUUID(),
        labels: { ...item },
        unit: '',
        amount: 0
    };
}

export function removeIngredient(ingredient: IngredientWithId, ingredients: IngredientWithId[]): IngredientWithId[] {
    return ingredients.filter(element => element.id !== ingredient.id);
}