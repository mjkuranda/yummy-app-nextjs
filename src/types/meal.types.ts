import { Items } from '@/src/components/common/form/input-list';

export interface MealFormData {
    title: string;
    description: string;
    ingredients: Items;
    type: MealType;
    recipe: MealRecipeSectionWithId[];
    hasImage: boolean;
    hasImageUrl?: boolean;
    imageUrl?: string;
    imageFile?: File;
}

export type MealType = 'soup' | 'main course' | 'salad';

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