import { IngredientWithId } from '@/src/types/ingredient.types';
import { IngredientWithoutImage, MealRecipeSection } from '@/src/types/api.types';

export interface MealFormData {
    title: string;
    description: string;
    ingredients: IngredientWithId[];
    type: MealType;
    recipe: MealRecipeSectionWithId[];
    hasImage: boolean;
    hasImageUrl?: boolean;
    imageUrl?: string;
    imageFile?: File;
}

export type MealType = 'any' | 'soup' | 'main course' | 'salad';

export const MealTypeText: Record<MealType, { en: string, pl: string }> = {
    'any': {
        en: 'any',
        pl: 'nieokreślony'
    },
    'soup': {
        en: 'soup',
        pl: 'zupa'
    },
    'main course': {
        en: 'main course',
        pl: 'danie główne'
    },
    'salad': {
        en: 'salad',
        pl: 'sałatka'
    }
};

export interface MealRecipeStepWithId {
    id: string;
    text: string;
}

export interface MealRecipeSectionWithId {
    id: string;
    steps: MealRecipeStepWithId[]
    name?: string,
}

export interface MealComment {
    readonly _id: string;
    readonly mealId: string;
    readonly user: string;
    readonly text: string;
    readonly posted: number;
}

export interface NewMealCommentDto {
    mealId: string;
    text: string;
}

export interface MealRating {
    mealId: string;
    rating: number;
    count: number;
}

export interface NewMealRatingDto {
    mealId: string;
    rating: number;
}

export interface MealDifferenceDto {
    title?: string;
    description?: string;
    type?: MealType;
    ingredients?: IngredientWithoutImage[];
    recipeSections?: MealRecipeSection[];
    imageUrl?: string;
}