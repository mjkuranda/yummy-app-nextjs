export interface MealResult {
    description: string;
    _id: string;
    imageUrl?: string;
    title: string;
}

// TODO: Consider extension

export interface Meal {
    author: string;
    description: string;
    _id: string;
    imgUrl?: string;
    ingredients: Ingredient[];
    title: string;
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