import { SearchFormData } from '@/src/types/search.types';
import { FormEvent } from 'react';

export function getSearchFormData(e: FormEvent<HTMLFormElement>): SearchFormData {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const data = new FormData(e.target);
    const entries = Object.fromEntries(data);
    const inputs = Object.keys(entries);
    const query: SearchFormData = {
        ingredients: []
    };
    inputs.forEach(input => {
        const [queryType, value] = input.split(':');

        if (queryType === 'ingredient') {
            query.ingredients.push(value);
        }
    });

    return query;
}

export function getSelectedIngredientNumber(ingredientClass: string): number {
    const elements = document.querySelectorAll(`.${ingredientClass}[data-filter="ingredient"] input[type=checkbox]:checked`);

    return elements.length;
}

export function clearSearchIngredients(): void {
    const checkedIngredients = document.querySelectorAll<HTMLInputElement>('[data-filter="ingredient"] input[type=checkbox]:checked');
    checkedIngredients.forEach(ingredient => ingredient.checked = false);
}