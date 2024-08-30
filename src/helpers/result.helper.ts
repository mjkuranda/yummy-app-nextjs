import { API_URL } from '@/src/api/methods';

export function getImageUrlForYummyMeals(imgUrl?: string): string | undefined {
    return imgUrl ? `${API_URL}/images/meals/${imgUrl}` : undefined;
}