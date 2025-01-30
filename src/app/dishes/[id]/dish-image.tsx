'use client';

import styles from '@/styles/app/dishes/[id]/page.module.scss';
import { useHasImage } from '@/src/hooks/use-has-image';
import { Loader } from '@/src/components/common/loader';
import { getImageUrlForYummyDishes } from '@/src/helpers/dish-by-id.helper';
import { DishProvider } from '@/src/types/api.types';

interface DishImageProps {
    provider: DishProvider;
    title: string;
    imgUrl?: string;
}

export function DishImage({ imgUrl, title, provider }: DishImageProps) {
    const imageUrl = getImageUrlForYummyDishes(provider, imgUrl);
    const { hasImage, isLoading }  = useHasImage(imageUrl);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className={styles['result-image']}>
            <img src={hasImage ? imageUrl : '/no-image.png'} alt={`Zdjęcie daniam o nazwie ${title}`} onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/no-image.png';
                target.alt = 'Brak dostępnego zdjęcia';
            }} />
        </div>
    );
}