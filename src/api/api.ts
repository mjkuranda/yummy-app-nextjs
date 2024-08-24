import { apiGet, apiPost } from '@/src/api/methods';
import {
    LoginUserData,
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
    let res: Response;

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiPost<LoginUserData>('users/login', { login, password });
    } catch (err: unknown) {
        throw err;
    }

    return await res.json();
}

export async function refreshUserTokens() {
    return apiPost<void>('users/refreshTokens');
}

export async function getMealProposals(): Promise<MealProposal[]> {
    let res: MealProposal[] = [];
    //
    // // eslint-disable-next-line no-useless-catch
    // try {
    //     console.log('xxx');
    res = await apiGet<MealProposal[]>('meals/proposal/all');
    // } catch (err: unknown) {
    //     throw err;
    // }
    //
    return res;
}

export async function addMealProposal(ingredients: string[]): Promise<Response> {
    let res;

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiPost<MealProposalRequest>('meals/proposal', {
            ingredients: ingredients.sort()
        });
    } catch (err: unknown) {
        throw err;
    }

    return res;
}

export async function getSoftAddedMeals(): Promise<MealDocument[]> {
    let res: MealDocument[] = [];

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiGet<MealDocument[]>('meals/soft/added');
    } catch (err: unknown) {
        throw err;
    }

    return res;
}

export async function getSoftEditedMeals(): Promise<MealDocument[]> {
    let res: MealDocument[] = [];

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiGet<MealDocument[]>('meals/soft/edited');
    } catch (err: unknown) {
        throw err;
    }

    return res;
}

export async function getSoftDeletedMeals(): Promise<MealDocument[]> {
    let res: MealDocument[] = [];

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiGet<MealDocument[]>('meals/soft/deleted');
    } catch (err: unknown) {
        throw err;
    }

    return res;
}

export async function getNotActivatedUsers(): Promise<NotActivatedUser[]> {
    let res: NotActivatedUser[] = [];

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiGet<NotActivatedUser[]>('users/not-activated');
    } catch (err: unknown) {
        throw err;
    }

    return res;
}

export async function confirmMealAddition(id: string): Promise<MealDocument> {
    let res;

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiPost(`meals/${id}/create`);
    } catch (err: unknown) {
        throw err;
    }

    return await res.json();
}

export async function confirmMealEdition(id: string): Promise<MealDocument> {
    let res;

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiPost(`meals/${id}/edit`);
    } catch (err: unknown) {
        throw err;
    }

    return await res.json();
}

export async function confirmMealDeletion(id: string): Promise<MealDocument> {
    let res;

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiPost(`meals/${id}/delete`);
    } catch (err: unknown) {
        throw err;
    }

    return await res.json();
}

export async function confirmUserActivation(id: string): Promise<void> {
    // eslint-disable-next-line no-useless-catch
    try {
        await apiPost(`users/${id}/activate`);
    } catch (err: unknown) {
        throw err;
    }
}

export async function createUserAccount(data: UserData): Promise<void> {
    let res: Response;

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiPost<UserData>('users/create', data);
    } catch (err: unknown) {
        throw err;
    }

    return await res.json();
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