import { Items } from '@/src/components/common/form/input-list';

export interface MealFormData {
    title: string;
    description: string;
    ingredients: Items;
    imageUrl?: string;
    imageFile?: File;
    type: MealType;
    recipe: MealRecipeSectionWithId[];
}

export type MealType = 'soup' | 'main course' | 'salad' | 'raw salad';

export interface MealRecipeStepWithId {
    id: string;
    text: string;
}

export interface MealRecipeSectionWithId {
    id: string;
    steps: MealRecipeStepWithId[]
    name?: string,
}