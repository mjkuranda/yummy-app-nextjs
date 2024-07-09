import { apiGet } from '@/src/api/methods';
import { Meal } from '@/src/types/api.types';

export async function getMeal(id: string): Promise<Meal> {
    return apiGet<Meal>(`meals/${id}/details`);
}