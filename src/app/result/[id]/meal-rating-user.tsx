import styles from '@/styles/app/result/meal-rating.module.scss';
import { MealRatingStars } from '@/src/app/result/[id]/meal-rating-stars';
import { ChangeEvent, useState } from 'react';
import { InputRange } from '@/src/components/common/form/input-range';
import { Button } from '@/src/components/common/button';
import { useParams, useRouter } from 'next/navigation';
import { ApiError, handleApiError } from '@/src/api/api-errors';
import { useUserContext } from '@/src/contexts/user.context';
import { rateMeal } from '@/src/api/api';
import { toastSuccess } from '@/src/utils/toast.utils';
import { Loader } from '@/src/components/common/loader';

const ratingSettings = {
    min: 0,
    max: 5,
    value: 2.5,
    step: 0.5
};

interface MealRatingUserProps {
    onToggleRate: () => void;
}

export function MealRatingUser({ onToggleRate }: MealRatingUserProps) {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const userContext = useUserContext();
    const [userRating, setUserRating] = useState<number>(2.5);
    const [isRating, setIsRating] = useState<boolean>(false);

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const newValue = Number(e.target.value);

        setUserRating(newValue);
    };

    const onRate = async () => {
        setIsRating(true);

        try {
            await rateMeal({ mealId: id, rating: userRating });

            toastSuccess('Successfully rated this meal!');
        } catch (err: unknown) {
            if (err instanceof ApiError) {
                handleApiError(err, router, userContext);
            }
        } finally {
            onToggleRate();
            setIsRating(false);
        }
    };

    return (
        <div className={styles['meal-rating-user']}>
            <MealRatingStars rating={userRating} />
            <InputRange id={'rating'} name={'rating'} label={''} settings={{ ...ratingSettings, value: userRating }} onChange={onChange} />
            <div className={'d-flex justify-content-start'}>
                {isRating ? <Loader /> : <Button label={'Oceń'} onClick={onRate} />}
            </div>
        </div>
    );
}