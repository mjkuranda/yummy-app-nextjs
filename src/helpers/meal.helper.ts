import { DetailedMeal, DetailedMealWithTranslations, Ingredient } from '@/src/types/api.types';
import { MealFormData, MealRecipeSectionWithId } from '@/src/types/meal.types';
import { IngredientDataValue, IngredientWithId } from '@/src/types/ingredient.types';

export function getDefaultValues(mealWithTranslations: DetailedMealWithTranslations, ingredients: IngredientDataValue[]): MealFormData {
    const { meal } = mealWithTranslations;

    return {
        title: meal.title,
        description: meal.description,
        ingredients: mapIngredients(meal.ingredients, ingredients),
        imageUrl: meal.imgUrl,
        type: 'main course', // TODO: type is missing
        recipe: mapRecipe(meal),
        hasImage: Boolean(meal.imgUrl),
        hasImageUrl: Boolean(meal.imgUrl)
    };
}

export function mapIngredients(ingredients: Ingredient[], labels: IngredientDataValue[]): IngredientWithId[] {
    const mappedIngredients = ingredients.map(ingredient => {
        const data = labels.find(label => ingredient.name === label.en) as IngredientDataValue;

        if (!data) {
            return undefined;
        }

        return {
            id: crypto.randomUUID(),
            amount: ingredient.amount.toString(),
            unit: ingredient.unit,
            data
        };
    });

    return mappedIngredients.filter(ingredient => ingredient !== undefined) as IngredientWithId[];
}

export function mapRecipe(meal: DetailedMeal): MealRecipeSectionWithId[] {
    return meal.recipeSections.map(section => ({
        id: crypto.randomUUID(),
        name: section.name,
        steps: section.steps.map(step => ({
            id: crypto.randomUUID(),
            text: step
        }))
    }));
}