import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
    DetailedMeal,
    DetailedMealWithTranslations,
    MealProposal,
    MealResult,
    NotActivatedUser
} from '@/src/types/api.types';
import {
    getMeal, getMealComments,
    getMealProposals,
    getMeals, getNotActivatedUsers,
    getSoftAddedMeals,
    getSoftDeletedMeals,
    getSoftEditedMeals
} from '@/src/api/api';
import { DAY, HOUR, MINUTE } from '@/src/constants/numbers';
import { MealComment } from '@/src/types/meal.types';

export function useGetMealById(id: string): UseQueryResult<DetailedMealWithTranslations> {
    return useQuery({
        queryFn: async (): Promise<DetailedMealWithTranslations> => await getMeal(id),
        queryKey: ['meals', id],
        staleTime: HOUR
    });
}

export function useGetMeals(ingredients: string[]): UseQueryResult<MealResult[]> {
    return useQuery({
        queryFn: async (): Promise<MealResult[]> => await getMeals(ingredients),
        queryKey: ['meals', { ings: ingredients }],
        staleTime: DAY
    });
}

export function useGetMealProposals(): UseQueryResult<MealProposal[]> {
    return useQuery({
        queryFn: async (): Promise<MealProposal[]> => await getMealProposals(),
        queryKey: ['proposals'],
        staleTime: DAY
    });
}

// TODO: Use to fetch data. Trigger hooks using boolean value
export function useGetSoftAddedMeals(isTriggered: boolean = true): UseQueryResult<DetailedMeal[]> {
    if (!isTriggered) {
        return useQuery({
            queryKey: ['meals', 'soft', 'added'],
            staleTime: HOUR
        });
    }

    return useQuery({
        queryFn: async (): Promise<DetailedMeal[]> => await getSoftAddedMeals(),
        queryKey: ['meals', 'soft', 'added'],
        staleTime: HOUR
    });
}

// TODO: Use to fetch data. Trigger hooks using boolean value
export function useGetSoftEditedMeals(isTriggered: boolean = true): UseQueryResult<DetailedMeal[]> {
    if (!isTriggered) {
        return useQuery({
            queryKey: ['meals', 'soft', 'edited'],
            staleTime: HOUR
        });
    }

    return useQuery({
        queryFn: async (): Promise<DetailedMeal[]> => await getSoftEditedMeals(),
        queryKey: ['meals', 'soft', 'edited'],
        staleTime: HOUR
    });
}

// TODO: Use to fetch data. Trigger hooks using boolean value
export function useGetSoftDeletedMeals(isTriggered: boolean = true): UseQueryResult<DetailedMeal[]> {
    if (!isTriggered) {
        return useQuery({
            queryKey: ['meals', 'soft', 'deleted'],
            staleTime: HOUR
        });
    }

    return useQuery({
        queryFn: async (): Promise<DetailedMeal[]> => await getSoftDeletedMeals(),
        queryKey: ['meals', 'soft', 'deleted'],
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

export function useGetMealComments(mealId: string): UseQueryResult<MealComment[]> {
    return useQuery({
        queryFn: async (): Promise<MealComment[]> => await getMealComments(mealId),
        queryKey: ['meals', 'comments', mealId],
        staleTime: MINUTE
    });
}