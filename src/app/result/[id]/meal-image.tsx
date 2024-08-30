'use client';

import styles from '@/styles/app/result/page.module.scss';
import { useHasImage } from '@/src/hooks/useHasImage';
import { Loader } from '@/src/components/common/loader';
import { getImageUrlForYummyMeals } from '@/src/helpers/result.helper';

interface MealImageProps {
    title: string;
    imgUrl?: string;
}

export function MealImage({ imgUrl, title }: MealImageProps) {
    const imageUrl = getImageUrlForYummyMeals(imgUrl);
    const { hasImage, isLoading }  = useHasImage(imageUrl);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className={styles['result-image']}>
            <img src={hasImage ? imageUrl : '/no-image.png'} alt={`Zdjęcie posiłku o nazwie ${title}`} onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/no-image.png';
                target.alt = 'Brak dostępnego zdjęcia';
            }} />
        </div>
    );
}