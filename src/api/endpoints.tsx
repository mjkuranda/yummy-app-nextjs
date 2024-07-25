import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Meal, MealProposal, MealResult } from '@/src/types/api.types';
import { getMeal, getMealProposals, getMeals } from '@/src/api/api';
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