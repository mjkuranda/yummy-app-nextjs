import { DishProvider } from '@/src/types/api.types';

export function getImageUrlForYummyDishes(provider: DishProvider, imgUrl?: string): string | undefined {
    if (provider === 'spoonacular') {
        return imgUrl;
    }

    if (imgUrl?.includes('http')) {
        return imgUrl;
    }

    return imgUrl ? `${process.env.NEXT_PUBLIC_API_URL}/images/meals/${imgUrl}` : undefined;
}