import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
    DetailedDishWithTranslations, DishDocument,
    DishProposal,
    DishResult,
    NotActivatedUser
} from '@/src/types/api.types';
import {
    getDish, getDishComments,
    getDishProposals,
    getDishes, getNotActivatedUsers, getSoftAddedDishes, getSoftEditedDishes, getSoftDeletedDishes,
} from '@/src/api/api';
import { DAY, HOUR, MINUTE } from '@/src/constants/numbers';
import { DishComment } from '@/src/types/dish.types';

export function useGetDishById(id: string): UseQueryResult<DetailedDishWithTranslations> {
    return useQuery({
        queryFn: async (): Promise<DetailedDishWithTranslations> => await getDish(id),
        queryKey: ['dishes', id],
        staleTime: HOUR
    });
}

export function useGetDishes(ingredients: string[]): UseQueryResult<DishResult[]> {
    return useQuery({
        queryFn: async (): Promise<DishResult[]> => await getDishes(ingredients),
        queryKey: ['dishes', { ings: ingredients }],
        staleTime: DAY
    });
}

export function useGetDishProposals(): UseQueryResult<DishProposal[]> {
    return useQuery({
        queryFn: async (): Promise<DishProposal[]> => await getDishProposals(),
        queryKey: ['proposals'],
        staleTime: DAY
    });
}

// TODO: Use to fetch data. Trigger hooks using boolean value
export function useGetSoftAddedDishes(isTriggered: boolean = true): UseQueryResult<DishDocument[]> {
    if (!isTriggered) {
        return useQuery({
            queryKey: ['dishes', 'soft', 'added'],
            staleTime: HOUR
        });
    }

    return useQuery({
        queryFn: async (): Promise<DishDocument[]> => await getSoftAddedDishes(),
        queryKey: ['dishes', 'soft', 'added'],
        staleTime: HOUR
    });
}

// TODO: Use to fetch data. Trigger hooks using boolean value
export function useGetSoftEditedDishes(isTriggered: boolean = true): UseQueryResult<DishDocument[]> {
    if (!isTriggered) {
        return useQuery({
            queryKey: ['dishes', 'soft', 'edited'],
            staleTime: HOUR
        });
    }

    return useQuery({
        queryFn: async (): Promise<DishDocument[]> => await getSoftEditedDishes(),
        queryKey: ['dishes', 'soft', 'edited'],
        staleTime: HOUR
    });
}

// TODO: Use to fetch data. Trigger hooks using boolean value
export function useGetSoftDeletedDishes(isTriggered: boolean = true): UseQueryResult<DishDocument[]> {
    if (!isTriggered) {
        return useQuery({
            queryKey: ['dishes', 'soft', 'deleted'],
            staleTime: HOUR
        });
    }

    return useQuery({
        queryFn: async (): Promise<DishDocument[]> => await getSoftDeletedDishes(),
        queryKey: ['dishes', 'soft', 'deleted'],
        staleTime: HOUR
    });
}

// TODO: Use to fetch data. Trigger hooks using boolean value
export function useGetNotActivatedUsers(isTriggered: boolean = true): UseQueryResult<NotActivatedUser[]> {
    if (!isTriggered) {
        return useQuery({
            queryKey: ['users', 'not-activated'],
            staleTime: HOUR
        });
    }

    return useQuery({
        queryFn: async (): Promise<NotActivatedUser[]> => await getNotActivatedUsers(),
        queryKey: ['users', 'not-activated'],
        staleTime: HOUR
    });
}

export function useGetDishComments(dishId: string): UseQueryResult<DishComment[]> {
    return useQuery({
        queryFn: async (): Promise<DishComment[]> => await getDishComments(dishId),
        queryKey: ['dishes', 'comments', dishId],
        staleTime: 5 * MINUTE,
        refetchInterval: MINUTE
    });
}