export function encodeIngredients(ingredients: string[]): string {
    return ingredients.sort().join(',');
}

export function decodeIngredients(ingredientQuery: string | null): string[] {
    if (!ingredientQuery) {
        return [];
    }

    return ingredientQuery.split(',').sort();
}