import { DetailedMeal, DetailedMealWithTranslations } from '@/src/types/api.types';
import { MealFormData, MealRecipeSectionWithId } from '@/src/types/meal.types';
import { Items } from '@/src/components/common/form/input-list';

export function getDefaultValues(mealWithTranslations: DetailedMealWithTranslations): MealFormData {
    const { meal, ingredients } = mealWithTranslations;

    return {
        title: meal.title,
        description: meal.description,
        ingredients: [], // TODO: Ingredients mapping
        type: 'main course', // TODO: type is missing
        recipe: mapRecipe(meal),
        hasImage: Boolean(meal.imgUrl),
    };
}

// TODO: Continue writing
export function mapIngredients(meal: DetailedMeal, ): Items {
    return {};
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