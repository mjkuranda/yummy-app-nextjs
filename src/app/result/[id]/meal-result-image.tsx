'use client';

import styles from '@/styles/app/result/page.module.scss';
import { useEffect, useState } from 'react';

interface MealResultImageProps {
    imgUrl?: string;
    title?: string;
}

export function MealResultImage({ imgUrl, title }: MealResultImageProps) {
    const [hasImage, setHasImage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!imgUrl) {
            setIsLoading(false);

            return;
        }

        checkImageUrl(imgUrl)
            .then(result => setHasImage(result))
            .catch(() => setHasImage(false))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return 'Loading image...';
    }

    return (
        <div className={styles['result-image']}>
            <img src={hasImage ? imgUrl : '/no-image.png'} alt={`Zdjęcie posiłku o nazwie ${title}`} />
        </div>
    );
}

function checkImageUrl(urlString: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        try {
            const url = new URL(urlString);
            const img = new Image();

            img.onload = () => resolve(true);
            img.onerror = () => reject(false);
            img.src = url.toString();
        } catch (error) {
            reject(false);
        }
    });
}