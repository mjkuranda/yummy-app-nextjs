import { IngredientWithId } from '@/src/types/ingredient.types';
import { IngredientWithoutImage, MealRecipeSection } from '@/src/types/api.types';

export interface MealFormData {
    title: string;
    description: string;
    readyInMinutes: string;
    type: MealType;
    dishType: DishType;
    ingredients: IngredientWithId[];
    recipe: MealRecipeSectionWithId[];
    hasImage: boolean;
    hasImageUrl?: boolean;
    imageUrl?: string;
    imageFile?: File;
}

export type MealType = 'any' | 'breakfast' | 'launch' | 'dinner';

export const MealTypeText: Record<MealType, { en: string, pl: string }> = {
    any: {
        en: 'any',
        pl: 'każdy'
    },
    breakfast: {
        en: 'breakfast',
        pl: 'śniadanie'
    },
    launch: {
        en: 'launch',
        pl: 'obiad'
    },
    dinner: {
        en: 'dinner',
        pl: 'kolacja'
    }
};

export type DishType = 'any' | 'soup' | 'main course' | 'salad';

export const DishTypeText: Record<MealType, Record<string, { en: string, pl: string }>> = {
    any: {},
    breakfast: {},
    launch: {
        'any': {
            en: 'any',
            pl: 'każdy'
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
    },
    dinner: {}
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
    readyInMinutes?: number;
    type?: MealType;
    ingredients?: IngredientWithoutImage[];
    recipeSections?: MealRecipeSection[];
    imageUrl?: string;
}