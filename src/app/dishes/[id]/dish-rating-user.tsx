import styles from '@/styles/app/dishes/[id]/dish-rating.module.scss';
import { DishRatingStars } from '@/src/app/dishes/[id]/dish-rating-stars';
import { ChangeEvent, useState } from 'react';
import { InputRange } from '@/src/components/common/form/input-range';
import { Button } from '@/src/components/common/buttons/button';
import { useParams, useRouter } from 'next/navigation';
import { ApiError, handleApiError } from '@/src/api/api-errors';
import { useUserContext } from '@/src/contexts/user.context';
import { rateDish } from '@/src/api/api';
import { toastSuccess } from '@/src/utils/toast.utils';
import { Loader } from '@/src/components/common/loader';

const ratingSettings = {
    min: 0,
    max: 5,
    value: 2.5,
    step: 0.5
};

interface DishRatingUserProps {
    onToggleRate: (newRating: boolean) => void;
}

export function DishRatingUser({ onToggleRate }: DishRatingUserProps) {
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
            await rateDish({ dishId: id, rating: userRating });

            toastSuccess('Pomyślnie dodano ocenę!');
        } catch (err: unknown) {
            if (err instanceof ApiError) {
                handleApiError(err, router, userContext);
            }
        } finally {
            onToggleRate(true);
            setIsRating(false);
        }
    };

    return (
        <div className={styles['dish-rating-user']}>
            <DishRatingStars rating={userRating} />
            <InputRange id={'rating'} name={'rating'} label={''} settings={{ ...ratingSettings, value: userRating }} onChange={onChange} />
            <div className={'d-flex justify-content-start'}>
                {userContext.isLoggedIn() && isRating ? <Loader /> : <Button label={'Oceń'} onClick={onRate} />}
            </div>
        </div>
    );
}