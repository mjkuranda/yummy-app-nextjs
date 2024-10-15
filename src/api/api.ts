import { apiDelete, apiGet, apiPost, apiPut } from '@/src/api/methods';
import {
    LoginUserData,
    DishProposal,
    DishProposalRequest,
    DishResult, NotActivatedUser,
    UserPermissions, DetailedDishWithTranslations, NewDishDto, DishDocument
} from '@/src/types/api.types';
import { encodeIngredients } from '@/src/helpers/query.helper';
import { UserData } from '@/src/types/register.types';
import { ApiError } from 'next/dist/server/api-utils';
import {
    DishComment,
    DishDifferenceDto,
    DishRating,
    NewDishCommentDto,
    NewDishRatingDto
} from '@/src/types/dish.types';

export async function getDish(id: string): Promise<DetailedDishWithTranslations | never> {
    // eslint-disable-next-line no-useless-catch
    try {
        return apiGet<DetailedDishWithTranslations>(`dishes/${id}/details`);
    } catch (err) {
        throw err;
    }
}

export async function getDishes(ingredients: string[]): Promise<DishResult[]> {
    if (!ingredients.length) {
        return [];
    }

    return apiGet<DishResult[]>(`dishes?ings=${encodeIngredients(ingredients)}`);
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
    // eslint-disable-next-line no-useless-catch
    try {
        return apiPost<void>('users/refreshTokens');
    } catch (err: unknown) {
        throw err;
    }
}

export async function getDishProposals(): Promise<DishProposal[]> {
    let res: DishProposal[] = [];

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiGet<DishProposal[]>('dishes/proposal/all');
    } catch (err: unknown) {
        throw err;
    }

    return res;
}

export async function addDishProposal(ingredients: string[]): Promise<Response> {
    let res;

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiPost<DishProposalRequest>('dishes/proposal', {
            ingredients: ingredients.sort()
        });
    } catch (err: unknown) {
        throw err;
    }

    return res;
}

export async function getSoftAddedDishes(): Promise<DishDocument[]> {
    let res: DishDocument[] = [];

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiGet<DishDocument[]>('dishes/soft/added');
    } catch (err: unknown) {
        throw err;
    }

    return res;
}

export async function getSoftEditedDishes(): Promise<DishDocument[]> {
    let res: DishDocument[] = [];

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiGet<DishDocument[]>('dishes/soft/edited');
    } catch (err: unknown) {
        throw err;
    }

    return res;
}

export async function getSoftDeletedDishes(): Promise<DishDocument[]> {
    let res: DishDocument[] = [];

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiGet<DishDocument[]>('dishes/soft/deleted');
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

export async function confirmDishAddition(id: string): Promise<DishDocument> {
    let res;

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiPost(`dishes/${id}/create`);
    } catch (err: unknown) {
        throw err;
    }

    return await res.json();
}

export async function confirmDishEdition(id: string): Promise<DishDocument> {
    let res;

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiPost(`dishes/${id}/edit`);
    } catch (err: unknown) {
        throw err;
    }

    return await res.json();
}

export async function confirmDishDeletion(id: string): Promise<DishDocument> {
    let res;

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiPost(`dishes/${id}/delete`);
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

export async function createDish(data: NewDishDto): Promise<DishDocument> {
    const res = await apiPost<NewDishDto>('dishes/create', data);

    if (res.status > 299) {
        const json = await res.json();

        throw new ApiError(res.status, json.message);
    }

    return await res.json();
}

export async function getDishComments(dishId: string): Promise<DishComment[]> {
    let res: DishComment[] = [];

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiGet<DishComment[]>(`dishes/${dishId}/comments`);
    } catch (err: unknown) {
        throw err;
    }

    return res;
}

export async function postNewComment(data: NewDishCommentDto): Promise<void> {
    const res = await apiPost<NewDishCommentDto>(`dishes/${data.dishId}/comment`, data);

    if (res.status > 299) {
        const json = await res.json();

        throw new ApiError(res.status, json.message);
    }
}

export async function getDishRating(dishId: string): Promise<DishRating> {
    let res: DishRating = {
        dishId: dishId,
        rating: 0,
        count: 0
    };

    // eslint-disable-next-line no-useless-catch
    try {
        res = await apiGet<DishRating>(`dishes/${dishId}/rating`);
    } catch (err: unknown) {
        throw err;
    }

    return res;
}

export async function rateDish(data: NewDishRatingDto): Promise<void> {
    const res = await apiPost<NewDishRatingDto>(`dishes/${data.dishId}/rating`, data);

    if (res.status > 299) {
        const json = await res.json();

        throw new ApiError(res.status, json.message);
    }
}

export async function editDish(dishId: string, editDishDto: DishDifferenceDto): Promise<void> {
    const res = await apiPut<DishDifferenceDto>(`dishes/${dishId}`, editDishDto);

    if (res.status > 299) {
        const json = await res.json();

        throw new ApiError(res.status, json.message);
    }
}

export async function deleteDish(dishId: string): Promise<void> {
    const res = await apiDelete(`dishes/${dishId}`);

    if (res.status > 299) {
        const json = await res.json();

        throw new ApiError(res.status, json.message);
    }
}