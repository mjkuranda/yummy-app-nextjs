'use client';

import styles from '@/styles/app/result/page.module.scss';
import { useHasImage } from '@/src/hooks/useHasImage';

interface MealResultImageProps {
    imgUrl?: string;
    title?: string;
}

export function MealResultImage({ imgUrl, title }: MealResultImageProps) {
    const { hasImage, isLoading }  = useHasImage(imgUrl);

    if (isLoading) {
        return 'Loading image...';
    }

    return (
        <div className={styles['result-image']}>
            <img src={hasImage ? imgUrl : '/no-image.png'} alt={`Zdjęcie posiłku o nazwie ${title}`} />
        </div>
    );
}