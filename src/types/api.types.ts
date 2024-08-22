export interface MealResult {
    id: string;
    imgUrl?: string;
    ingredients: string[];
    title: string;
    relevance: number;
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
    properties?: {
        vegetarian?: boolean,
        vegan?: boolean,
        glutenFree?: boolean,
        dairyFree?: boolean,
        veryHealthy?: boolean
    },
    recipeSections: MealRecipeSection[]
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

export interface MealProposal {
    id: string;
    imgUrl?: string;
    ingredients: string[],
    recommendationPoints: number;
    title: string;
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
    email: string;
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
    ingredients: string[];
    language: Language;
    posted: number;
    recipeSections: MealRecipeSection[];
    title: string;
    type: string;
}

export interface MealDocument {
    readonly author: string;
    readonly description: string;
    readonly imageUrl: string;
    readonly ingredients: string[];
    readonly language: Language;
    readonly posted: number;
    readonly title: string;
    readonly type: string;
    readonly softAdded?: boolean;
    readonly softDeleted?: boolean;
    readonly softEdited?: MealDocument;
    readonly readyInMinutes: number;
    readonly recipeSections: MealRecipeSection[];
}