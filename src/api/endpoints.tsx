import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Meal, MealProposal, MealResult, NotActivatedUser } from '@/src/types/api.types';
import {
    getMeal,
    getMealProposals,
    getMeals, getNotActivatedUsers,
    getSoftAddedMeals,
    getSoftDeletedMeals,
    getSoftEditedMeals
} from '@/src/api/api';
import { DAY, HOUR } from '@/src/constants/numbers';

export function useGetMealById(id: string): UseQueryResult<Meal> {
    return useQuery({
        queryFn: async (): Promise<Meal> => await getMeal(id),
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

export function useGetSoftAddedMeals(): UseQueryResult<Meal[]> {
    return useQuery({
        queryFn: async (): Promise<Meal[]> => await getSoftAddedMeals(),
        queryKey: ['meals', 'soft', 'added'],
        staleTime: HOUR
    });
}

export function useGetSoftEditedMeals(): UseQueryResult<Meal[]> {
    return useQuery({
        queryFn: async (): Promise<Meal[]> => await getSoftEditedMeals(),
        queryKey: ['meals', 'soft', 'edited'],
        staleTime: HOUR
    });
}

export function useGetSoftDeletedMeals(): UseQueryResult<Meal[]> {
    return useQuery({
        queryFn: async (): Promise<Meal[]> => await getSoftDeletedMeals(),
        queryKey: ['meals', 'soft', 'deleted'],
        staleTime: HOUR
    });
}

export function useGetNotActivatedUsers(): UseQueryResult<NotActivatedUser[]> {
    return useQuery({
        queryFn: async (): Promise<NotActivatedUser[]> => await getNotActivatedUsers(),
        queryKey: ['users', 'not-activated'],
        staleTime: HOUR
    });
}