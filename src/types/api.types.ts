import { DishType, MealType } from '@/src/types/dish.types';

export type DishProvider = 'yummy' | 'spoonacular';

export interface DishResult {
    id: string;
    imgUrl?: string;
    ingredients: string[];
    missingCount: number;
    language: Language;
    provider: DishProvider;
    title: string;
    relevance: number;
    type: DishType;
    mealType: MealType;
}

export type DetailedDish = {
    id: string,
    imgUrl?: string,
    ingredients: Ingredient[],
    language: Language,
    title: string,
    description: string,
    readyInMinutes: number,
    sourceOrAuthor: string,
    provider: DishProvider,
    properties?: {
        vegetarian?: boolean,
        vegan?: boolean,
        glutenFree?: boolean,
        dairyFree?: boolean,
        veryHealthy?: boolean
    },
    recipeSections: DishRecipeSection[],
    type: DishType
    mealType: MealType,
};

export interface TranslatedIngredient {
    text: string;
    imageUrl: string;
}

export type DishRecipeStep = string;

export type DishRecipeSection = {
    name?: string,
    steps: DishRecipeStep[]
};

export interface DetailedDishWithTranslations {
    dish: DetailedDish;
    description?: string;
    ingredients?: TranslatedIngredient[];
    recipe?: DishRecipeSection[];
}

export interface Ingredient {
    amount: number;
    imageUrl: string;
    name: string;
    unit: string;
}
export type IngredientWithoutImage = Omit<Ingredient, 'imageUrl'>;

export interface DishProposal {
    id: string;
    imgUrl?: string;
    ingredients: string[],
    recommendationPoints: number;
    title: string;
    provider: DishProvider;
    type: DishType;
    mealType: MealType;
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

export interface UserObject {
    id: string;
    email: string;
    login: string;
    isAdmin?: boolean;
    capabilities?: {
        canAdd?: boolean;
        canEdit?: boolean;
        canDelete?: boolean;
    }
}

export type CapabilityType = 'canAdd' | 'canEdit' | 'canDelete';

export interface DishProposalRequest {
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

export interface NewPasswordDto {
    newPassword: string;
}

export interface NewDishDto {
    author: string;
    description: string;
    imageUrl?: string;
    ingredients: IngredientWithoutImage[];
    language: Language;
    posted: number;
    provider: DishProvider;
    readyInMinutes: number;
    recipeSections: DishRecipeSection[];
    title: string;
    type: DishType;
    mealType: MealType;
}

export interface DishDocument {
    readonly _id: string;
    readonly author: string;
    readonly description: string;
    readonly imageUrl: string;
    readonly ingredients: string[];
    readonly language: Language;
    readonly mealType: MealType;
    readonly posted: number;
    readonly provider: DishProvider;
    readonly title: string;
    readonly type: DishType;
    readonly softAdded?: boolean;
    readonly softDeleted?: boolean;
    readonly softEdited?: DishDocument;
    readonly readyInMinutes: number;
    readonly recipeSections: DishRecipeSection[];
}