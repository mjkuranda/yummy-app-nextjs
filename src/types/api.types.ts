import { MealType } from '@/src/types/meal.types';

export type MealProvider = 'yummy' | 'spoonacular';

export interface MealResult {
    id: string;
    imgUrl?: string;
    ingredients: string[];
    missingCount: number;
    provider: MealProvider;
    title: string;
    relevance: number;
    type: MealType;
}

export type DetailedMeal = {
    id: string,
    imgUrl?: string,
    ingredients: Ingredient[],
    language: Language,
    title: string,
    description: string,
    readyInMinutes: number,
    sourceOrAuthor: string,
    provider: MealProvider,
    properties?: {
        vegetarian?: boolean,
        vegan?: boolean,
        glutenFree?: boolean,
        dairyFree?: boolean,
        veryHealthy?: boolean
    },
    recipeSections: MealRecipeSection[],
    type: MealType
};

export interface TranslatedIngredient {
    text: string;
    imageUrl: string;
}

export type MealRecipeStep = string;

export type MealRecipeSection = {
    name?: string,
    steps: MealRecipeStep[]
};

export interface DetailedMealWithTranslations {
    meal: DetailedMeal;
    ingredients?: TranslatedIngredient[];
    recipe?: MealRecipeSection[];
}

export interface Ingredient {
    amount: number;
    imageUrl: string;
    name: string;
    unit: string;
}
export type IngredientWithoutImage = Omit<Ingredient, 'imageUrl'>;

export interface MealProposal {
    id: string;
    imgUrl?: string;
    ingredients: string[],
    recommendationPoints: number;
    title: string;
    provider: MealProvider;
    type: MealType;
}

export interface ApiError {
    statusCode: number;
    message: string;
}

export interface LoginUserData {
    login: string;
    password: string;
}

export interface UserPermissions {
    isAdmin?: boolean;
    capabilities?: {
        canAdd?: boolean;
        canEdit?: boolean;
        canDelete?: boolean;
    }
}

export interface MealProposalRequest {
    ingredients: string[];
}

export interface NotActivatedUser {
    _id: string;
    login: string;
}

/**
 * Language type
 */
export type Language = 'en' | 'en-US' | 'pl';

export interface NewMealDto {
    author: string;
    description: string;
    imageUrl?: string;
    ingredients: IngredientWithoutImage[];
    language: Language;
    posted: number;
    provider: MealProvider;
    readyInMinutes: number;
    recipeSections: MealRecipeSection[];
    title: string;
    type: MealType;
}

export interface MealDocument {
    readonly _id: string;
    readonly author: string;
    readonly description: string;
    readonly imageUrl: string;
    readonly ingredients: string[];
    readonly language: Language;
    readonly posted: number;
    readonly provider: MealProvider;
    readonly title: string;
    readonly type: MealType;
    readonly softAdded?: boolean;
    readonly softDeleted?: boolean;
    readonly softEdited?: MealDocument;
    readonly readyInMinutes: number;
    readonly recipeSections: MealRecipeSection[];
}