import { apiGet, apiPost } from '@/src/api/methods';
import {
    LoginUserData,
    DetailedMeal,
    MealProposal,
    MealProposalRequest,
    MealResult, NotActivatedUser,
    UserPermissions, DetailedMealWithTranslations, NewMealDto, MealDocument
} from '@/src/types/api.types';
import { encodeIngredients } from '@/src/helpers/query.helper';
import { UserData } from '@/src/types/register.types';
import { ApiError } from 'next/dist/server/api-utils';

export async function getMeal(id: string): Promise<DetailedMealWithTranslations> {
    return apiGet<DetailedMealWithTranslations>(`meals/${id}/details`);
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

export async function getSoftAddedMeals(): Promise<DetailedMeal[]> {
    return apiGet<DetailedMeal[]>('meals/soft/added');
}

export async function getSoftEditedMeals(): Promise<DetailedMeal[]> {
    return apiGet<DetailedMeal[]>('meals/soft/edited');
}

export async function getSoftDeletedMeals(): Promise<DetailedMeal[]> {
    return apiGet<DetailedMeal[]>('meals/soft/deleted');
}

export async function getNotActivatedUsers(): Promise<NotActivatedUser[]> {
    return apiGet<NotActivatedUser[]>('users/not-activated');
}

export async function confirmMealAddition(id: string): Promise<DetailedMeal> {
    const res = await apiPost(`meals/${id}/create`);

    return await res.json();
}

export async function confirmMealEdition(id: string): Promise<DetailedMeal> {
    const res = await apiPost(`meals/${id}/create`);

    return await res.json();
}

export async function confirmMealDeletion(id: string): Promise<DetailedMeal> {
    const res = await apiPost(`meals/${id}/create`);

    return await res.json();
}

export async function confirmUserActivation(login: string): Promise<void> {
    await apiPost(`users/${login}/activate`);
}

export async function createUserAccount(data: UserData): Promise<void> {
    const res = await apiPost<UserData>('users/create', data);

    if (res.status > 299) {
        const json = await res.json();

        throw new ApiError(res.status, json.message);
    }
}

export async function uploadImage(image: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', image);

    const res = await apiPost<FormData>('images/upload', formData, true);

    if (res.status > 299) {
        const json = await res.json();

        throw new ApiError(res.status, json.message);
    }

    return await res.text();
}

export async function createMeal(data: NewMealDto): Promise<MealDocument> {
    const res = await apiPost<NewMealDto>('meals/create', data);

    if (res.status > 299) {
        const json = await res.json();

        throw new ApiError(res.status, json.message);
    }

    return await res.json();
}