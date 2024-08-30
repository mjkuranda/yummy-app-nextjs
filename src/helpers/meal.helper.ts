import { DetailedMeal, DetailedMealWithTranslations, Ingredient, NewMealDto } from '@/src/types/api.types';
import { MealDifferenceDto, MealFormData, MealRecipeSectionWithId } from '@/src/types/meal.types';
import { IngredientData, IngredientDataValue, IngredientWithId } from '@/src/types/ingredient.types';
import path from 'path';
import fs from 'fs';

export function getDefaultValues(mealWithTranslations: DetailedMealWithTranslations, ingredients: IngredientDataValue[]): MealFormData {
    const { meal } = mealWithTranslations;

    return {
        title: meal.title,
        description: meal.description,
        ingredients: mapIngredients(meal.ingredients, ingredients),
        imageUrl: meal.imgUrl,
        type: meal.type,
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

export function getMealDifferences(meal: DetailedMeal, proceededData: NewMealDto): MealDifferenceDto {
    const result: MealDifferenceDto = {};

    if (meal.title !== proceededData.title) {
        result.title = proceededData.title;
    }

    if (meal.description !== proceededData.description) {
        result.description = proceededData.description;
    }

    if (meal.type !== proceededData.type) {
        result.type = proceededData.type;
    }

    if (meal.ingredients.length !== proceededData.ingredients.length) {
        result.ingredients = proceededData.ingredients;
    } else {
        const areSame = proceededData.ingredients.every(ingredient => {
            const mealIngredient = meal.ingredients.find(ing => ing.name === ingredient.name);

            if (!mealIngredient) {
                return false;
            }

            if (ingredient.amount !== mealIngredient?.amount) {
                return false;
            }

            if (ingredient.unit !== mealIngredient?.unit) {
                return false;
            }

            return true;
        });

        if (!areSame) {
            result.ingredients = proceededData.ingredients;
        }
    }

    if (meal.recipeSections.length !== proceededData.recipeSections.length) {
        result.recipeSections = proceededData.recipeSections;
    } else {
        const areSame = proceededData.recipeSections.every((section, idx) => {
            const recipeSection = meal.recipeSections[idx];

            return section.steps.every((step, stepIdx) => step === recipeSection.steps[stepIdx]);
        });

        if (!areSame) {
            result.recipeSections = proceededData.recipeSections;
        }
    }

    if (meal.imgUrl !== proceededData.imageUrl) {
        result.imageUrl = proceededData.imageUrl;
    }

    return result;
}