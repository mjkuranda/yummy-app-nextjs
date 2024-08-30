import { API_URL } from '@/src/api/methods';
import { MealProvider } from '@/src/types/api.types';

export function getImageUrlForYummyMeals(provider: MealProvider, imgUrl?: string): string | undefined {
    if (provider === 'spoonacular') {
        return imgUrl;
    }

    return imgUrl ? `${API_URL}/images/meals/${imgUrl}` : undefined;
}