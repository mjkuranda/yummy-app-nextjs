'use client';

import styles from '@/styles/app/dishes/[id]/page.module.scss';
import { useHasImage } from '@/src/hooks/use-has-image';

interface IngredientImageProps {
    imageUrl: string;
    text: string;
}

export function IngredientImage({ imageUrl, text }: IngredientImageProps) {
    const { hasImage, isLoading }  = useHasImage(imageUrl);

    if (isLoading || !hasImage) {
        return (
            <img
                className={styles['result-ingredient__image']}
                src="/ingredient.png"
                alt="Generic ingredient image icon"
                width={32}
                data-a-href="https://www.flaticon.com/free-icons/ingredients"
                data-a-title="ingredients icons"
                data-a-text="Ingredients icons created by Flat Icons - Flaticon"
            />
        );
    }

    return <img className={styles['result-ingredient__image']} src={imageUrl} alt={text} />;
}