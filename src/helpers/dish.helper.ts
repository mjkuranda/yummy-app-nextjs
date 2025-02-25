import { DetailedDish, DetailedDishWithTranslations, Ingredient, NewDishDto } from '@/src/types/api.types';
import { DishDifferenceDto, DishFormData, DishRecipeSectionWithId, OnlyMealType } from '@/src/types/dish.types';
import { IngredientDataValue, IngredientWithId } from '@/src/types/ingredient.types';

export function getDefaultValues(dishWithTranslations: DetailedDishWithTranslations, ingredients: IngredientDataValue[]): DishFormData {
    const { dish } = dishWithTranslations;

    return {
        title: dish.title,
        description: dish.description,
        readyInMinutes: dish.readyInMinutes?.toFixed() ?? 'missing',
        type: dish.type,
        mealType: dish.mealType as OnlyMealType,
        ingredients: mapIngredients(dish.ingredients, ingredients),
        imageUrl: dish.imgUrl,
        recipe: mapRecipe(dish)
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

export function mapRecipe(dish: DetailedDish): DishRecipeSectionWithId[] {
    return dish.recipeSections.map(section => ({
        id: crypto.randomUUID(),
        name: section.name,
        steps: section.steps.map(step => ({
            id: crypto.randomUUID(),
            text: step
        }))
    }));
}

export function getDishDifferences(dish: DetailedDish, proceededData: NewDishDto): DishDifferenceDto {
    const result: DishDifferenceDto = {};

    if (dish.title !== proceededData.title) {
        result.title = proceededData.title;
    }

    if (dish.description !== proceededData.description) {
        result.description = proceededData.description;
    }

    if (dish.readyInMinutes !== proceededData.readyInMinutes) {
        result.readyInMinutes = proceededData.readyInMinutes;
    }

    if (dish.type !== proceededData.type) {
        result.type = proceededData.type;
    }

    if (dish.mealType !== proceededData.mealType) {
        result.mealType = proceededData.mealType;
    }

    if (dish.ingredients.length !== proceededData.ingredients.length) {
        result.ingredients = proceededData.ingredients;
    } else {
        const areSame = proceededData.ingredients.every(ingredient => {
            const dishIngredient = dish.ingredients.find(ing => ing.name === ingredient.name);

            if (!dishIngredient) {
                return false;
            }

            if (ingredient.amount !== dishIngredient?.amount) {
                return false;
            }

            if (ingredient.unit !== dishIngredient?.unit) {
                return false;
            }

            return true;
        });

        if (!areSame) {
            result.ingredients = proceededData.ingredients;
        }
    }

    if (dish.recipeSections.length !== proceededData.recipeSections.length) {
        result.recipeSections = proceededData.recipeSections;
    } else {
        const areSame = proceededData.recipeSections.every((section, idx) => {
            const recipeSection = dish.recipeSections[idx];

            return section.steps.every((step, stepIdx) => step === recipeSection.steps[stepIdx]);
        });

        if (!areSame) {
            result.recipeSections = proceededData.recipeSections;
        }
    }

    if (dish.imgUrl !== proceededData.imageUrl) {
        result.imageUrl = proceededData.imageUrl;
    }

    return result;
}