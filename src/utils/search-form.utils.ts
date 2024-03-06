import { SearchFormData } from '@/src/types/search.types';
import { FormEvent } from 'react';

export function getSearchFormData(e: FormEvent<HTMLFormElement>): SearchFormData {
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