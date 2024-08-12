import { apiGet, apiPost } from '@/src/api/methods';
import {
    LoginUserData,
    Meal,
    MealProposal,
    MealProposalRequest,
    MealResult, NotActivatedUser,
    UserPermissions
} from '@/src/types/api.types';
import { encodeIngredients } from '@/src/helpers/query.helper';

export async function getMeal(id: string): Promise<Meal> {
    return apiGet<Meal>(`meals/${id}/details`);
}

export async function getMeals(ingredients: string[]): Promise<MealResult[]> {
    if (!ingredients.length) {
        return [];
    }

    return apiGet<MealResult[]>(`meals?ings=${encodeIngredients(ingredients)}`);
}

export async function doUserLogin(login: string, password: string): Promise<UserPermissions> {
    const res = await apiPost<LoginUserData>('users/login', { login, password });

    return await res.json();
}

export async function refreshUserTokens() {
    return apiPost<void>('users/refreshTokens');
}

export async function getMealProposals(): Promise<MealProposal[]> {
    return apiGet<MealProposal[]>('meals/proposal/all');
}

export async function addMealProposal(ingredients: string[]): Promise<Response> {
    return apiPost<MealProposalRequest>('meals/proposal', {
        ingredients: ingredients.sort()
    });
}

export async function getSoftAddedMeals(): Promise<Meal[]> {
    return apiGet<Meal[]>('meals/soft/added');
}

export async function getSoftEditedMeals(): Promise<Meal[]> {
    return apiGet<Meal[]>('meals/soft/edited');
}

export async function getSoftDeletedMeals(): Promise<Meal[]> {
    return apiGet<Meal[]>('meals/soft/deleted');
}

export async function getNotActivatedUsers(): Promise<NotActivatedUser[]> {
    return apiGet<NotActivatedUser[]>('users/not-activated');
}