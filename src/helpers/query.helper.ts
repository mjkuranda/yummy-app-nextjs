import { EncodedUrlQuery, SearchUrlQuery } from '@/src/types/search.types';
import { DishType, MealType } from '@/src/types/dish.types';

export function encodeIngredients(ingredients: string[]): string {
    return ingredients.sort().join(',');
}

export function decodeIngredients(ingredientQuery: string | null): string[] {
    if (!ingredientQuery) {
        return [];
    }

    return ingredientQuery.split(',').sort();
}

export function encodeSearchQuery(ingredients: string[], mealType: MealType, dishType: DishType): EncodedUrlQuery {
    const encodedIngredients = encodeIngredients(ingredients);

    return `${mealType},${dishType},${encodedIngredients}`;
}

export function decodeSearchQuery(encodedUrlQuery: EncodedUrlQuery): SearchUrlQuery {
    const [mealType, dishType, ...ingredientList] = encodedUrlQuery.split(',');

    return `ings=${ingredientList}&type=${mealType as MealType}&dish=${dishType as DishType}`;
}