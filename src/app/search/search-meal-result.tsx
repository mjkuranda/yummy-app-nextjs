import Link from 'next/link';
import { MealResult } from '@/src/types/api.types';
import styles from '@/styles/app/search/search-meal-result.module.scss';
import { Button } from '@/src/components/common/button';

interface SearchMealResultProps {
    meal: MealResult;
}

export function SearchMealResult({ meal }: SearchMealResultProps) {
    const imgSrc = meal.imageUrl ? `/uploads/${meal.imageUrl}` : '/no-image.png';
    const sourceUrl = 'your-query';

    return (
        <div className={`${styles['result-container']} d-flex justify-content-center align-items-center`}>
            <div className={styles['result-image']}>
                <Link className={styles['img-link']} href={`/result/${meal._id}?${sourceUrl}`} target="_blank">
                    <img src={imgSrc} alt="Zdjęcie posiłku o nazwie {{meal.title}}" />
                </Link>
            </div>
            <div className={styles['result-label']}>
                <div className={styles['result-description']}>
                    <div className={styles['result-title']}>{meal.title}</div>
                    <div className={styles['result-text']}>{meal.description}</div>
                </div>
                <div className={`${styles['result-button']} d-flex justify-content-center align-items-center`}>
                    <Button label={'Zobacz'} link={`/result/${meal._id}?${sourceUrl}`} />
                </div>
            </div>
        </div>
    );
}