'use client';

import styles from '@/styles/app/result/meal-rating.module.scss';
import { MealRatingStars } from '@/src/app/result/[id]/meal-rating-stars';
import { MealRatingUser } from '@/src/app/result/[id]/meal-rating-user';
import { TextButton } from '@/src/components/common/text-button';
import { useEffect, useState } from 'react';
import { MealRating as MealRatingType } from '@/src/types/meal.types';
import { getMealRating } from '@/src/api/api';
import { useParams } from 'next/navigation';

export function MealRating() {
    const { id } = useParams<{ id: string }>();
    const [toggleRate, setToggleRate] = useState<boolean>(false);
    const [rating, setRating] = useState<MealRatingType>({ mealId: id, rating: 0, count: 0 });

    useEffect(() => {
        getMealRating(id)
            .then(mealRating => setRating(mealRating));
    }, []);

    const onToggleRate = (newRate: boolean) => {
        setToggleRate(!toggleRate);

        if (newRate) {
            getMealRating(id)
                .then(mealRating => setRating(mealRating));
        }
    };

    return (
        <div className={styles['meal-rating']}>
            <div className={styles['meal-rating__rating']}>
                <MealRatingStars rating={rating.rating} />
                <div className={styles['rate-count']}>({rating.count > 0 ? `${rating.count} ocen${rating.count === 1 ? 'a' : ''}` : 'Brak ocen'})</div>
                <TextButton label={'Oceń'} onClick={onToggleRate} />
            </div>
            {toggleRate && <MealRatingUser onToggleRate={onToggleRate} />}
        </div>
    );
}