'use client';

import styles from '@/styles/app/result/meal-rating.module.scss';
import { MealRatingStars } from '@/src/app/result/[id]/meal-rating-stars';
import { MealRatingUser } from '@/src/app/result/[id]/meal-rating-user';
import { TextButton } from '@/src/components/common/text-button';
import { useState } from 'react';

interface MealRatingProps {
    rating: number;
    count: number;
}

export function MealRating({ rating, count }: MealRatingProps) {
    const [toggleRate, setToggleRate] = useState<boolean>(false);

    const onToggleRate = () => setToggleRate(!toggleRate);

    return (
        <div className={styles['meal-rating']}>
            <div className={styles['meal-rating__rating']}>
                <MealRatingStars rating={rating} />
                <div className={styles['rate-count']}>({count > 0 ? `${count} ocen${count === 1 ? 'a' : ''}` : 'Brak ocen'})</div>
                <TextButton label={'Oceń'} onClick={onToggleRate} />
            </div>
            {toggleRate && <MealRatingUser onToggleRate={onToggleRate} />}
        </div>
    );
}