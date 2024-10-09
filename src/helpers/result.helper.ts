import { API_URL } from '@/src/api/methods';
import { DishProvider } from '@/src/types/api.types';

export function getImageUrlForYummyDishes(provider: DishProvider, imgUrl?: string): string | undefined {
    if (provider === 'spoonacular') {
        return imgUrl;
    }

    return imgUrl ? `${API_URL}/images/meals/${imgUrl}` : undefined;
}