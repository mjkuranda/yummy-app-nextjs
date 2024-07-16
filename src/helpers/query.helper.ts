export function encodeIngredients(ingredients: string[]): string {
    return ingredients.sort().join(',');
}

export function decodeIngredients(ingredientQuery: string): string[] {
    return ingredientQuery.split(',').sort();
}