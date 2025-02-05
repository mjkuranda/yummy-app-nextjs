import { IngredientWithId } from '@/src/types/ingredient.types';
import { IngredientWithoutImage, DishRecipeSection } from '@/src/types/api.types';

export interface DishFormData {
    title: string;
    description: string;
    readyInMinutes: string;
    type: DishType;
    mealType: MealType;
    ingredients: IngredientWithId[];
    recipe: DishRecipeSectionWithId[];
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

export type DishType = 'any' | 'soup' | 'main course' | 'salad' | 'dessert' | 'beverage';

export type DishRecord = Record<string, { en: string, pl: string }>;

export const DishTypeText: Record<MealType, DishRecord> = {
    any: {
        'any': {
            en: 'any',
            pl: 'każdy'
        },
        'beverage': {
            en: 'beverage',
            pl: 'napój'
        }
    },
    breakfast: {
        'any': {
            en: 'any',
            pl: 'każdy'
        }
    },
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
        },
        'dessert': {
            en: 'dessert',
            pl: 'deser'
        },
        'beverage': {
            en: 'beverage',
            pl: 'napój'
        }
    },
    dinner: {}
};

export interface DishRecipeStepWithId {
    id: string;
    text: string;
}

export interface DishRecipeSectionWithId {
    id: string;
    steps: DishRecipeStepWithId[]
    name?: string,
}

export interface DishComment {
    readonly _id: string;
    readonly dishId: string;
    readonly user: string;
    readonly text: string;
    readonly posted: number;
}

export interface NewDishCommentDto {
    dishId: string;
    text: string;
}

export interface DishRating {
    dishId: string;
    rating: number;
    count: number;
}

export interface NewDishRatingDto {
    dishId: string;
    rating: number;
}

export interface DishDifferenceDto {
    title?: string;
    description?: string;
    readyInMinutes?: number;
    type?: DishType;
    mealType?: MealType;
    ingredients?: IngredientWithoutImage[];
    recipeSections?: DishRecipeSection[];
    imageUrl?: string;
}