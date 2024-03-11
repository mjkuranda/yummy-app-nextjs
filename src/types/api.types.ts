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
    imageUrl?: string;
    ingredients: string[];
    title: string;
}

export interface MealProposal {
    _id: string;
    imgUrl?: string;
    ingredients: string[],
    recommendationPoints: number;
    title: string;
}