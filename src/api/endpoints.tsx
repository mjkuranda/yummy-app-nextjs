import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Meal } from '@/src/types/api.types';
import { getMeal } from '@/src/api/api';
import { HOUR } from '@/src/constants/numbers';

export function useGetMealById(id: string): UseQueryResult<Meal> {
    return useQuery({
        queryFn: async () => await getMeal(id),
        queryKey: ['meals', id],
        staleTime: HOUR
    });
}