'use client';

import styles from '@/styles/app/dishes/[id]/dish-rating.module.scss';
import { DishRatingStars } from '@/src/app/dishes/[id]/dish-rating-stars';
import { DishRatingUser } from '@/src/app/dishes/[id]/dish-rating-user';
import { TextButton } from '@/src/components/common/buttons/text-button';
import { useEffect, useState } from 'react';
import { DishRating as DishRatingType } from '@/src/types/dish.types';
import { getDishRating } from '@/src/api/api';
import { useParams } from 'next/navigation';
import { useUserContext } from '@/src/contexts/user.context';

export function DishRating() {
    const { id } = useParams<{ id: string }>();
    const { isLoggedIn } = useUserContext();
    const [toggleRate, setToggleRate] = useState<boolean>(false);
    const [rating, setRating] = useState<DishRatingType>({ dishId: id, rating: 0, count: 0 });

    useEffect(() => {
        getDishRating(id)
            .then(dishRating => setRating(dishRating));
    }, []);

    const onToggleRate = (newRate: boolean) => {
        setToggleRate(!toggleRate);

        if (newRate) {
            getDishRating(id)
                .then(dishRating => setRating(dishRating));
        }
    };

    const renderRatingCountText = (count: number): string => {
        if (count === 0) {
            return 'Brak ocen';
        }

        if (count === 1) {
            return '1 ocena';
        }

        if (count < 5) {
            return `${count} oceny`;
        }

        return `${count} ocen`;
    };

    return (
        <div className={styles['dish-rating']}>
            <div className={styles['dish-rating__rating']}>
                <DishRatingStars rating={rating.rating} />
                <div className={styles['rate-count']}>({renderRatingCountText(rating.count)})</div>
                {isLoggedIn() && <TextButton label={'Oceń'} onClick={onToggleRate} />}
            </div>
            {toggleRate && <DishRatingUser onToggleRate={onToggleRate} />}
        </div>
    );
}