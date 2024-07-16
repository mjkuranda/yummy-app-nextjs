import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Meal, MealResult } from '@/src/types/api.types';
import { getMeal, getMeals } from '@/src/api/api';
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