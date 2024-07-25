export interface MealResult {
    id: string;
    imgUrl?: string;
    ingredients: string[];
    title: string;
    relevance: number;
}

// TODO: Consider extension

export interface Meal {
    author: string;
    description: string;
    _id: string;
    imgUrl?: string;
    ingredients: Ingredient[];
    title: string;
    instruction: InstructionList[];
}

export interface InstructionList {
    name: string;
    steps: {
        number: number;
        step: string;
    }[];
}

export interface Ingredient {
    name: string;
    unit: string;
    amount: number;
    originalName: string;
    imageUrl: string;
}

export interface MealProposal {
    _id: string;
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

export interface MealProposal {
    id: string;
    imgUrl?: string;
    ingredients: string[];
    recommendationPoints: number;
    title: string;
}
