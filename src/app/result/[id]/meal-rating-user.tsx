import { MealRatingStars } from '@/src/app/result/[id]/meal-rating-stars';
import { ChangeEvent, useState } from 'react';
import { InputRange } from '@/src/components/common/form/input-range';

const ratingSettings = {
    min: 0,
    max: 5,
    value: 2.5,
    step: 0.5
};

export function MealRatingUser() {
    const [userRating, setUserRating] = useState<number>(5);

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const newValue = Number(e.target.value);

        setUserRating(newValue);
    };

    return (
        <div>
            <InputRange id={'rating'} name={'rating'} label={'rating'} settings={{ ...ratingSettings, value: userRating }} onChange={onChange} />
            <MealRatingStars rating={userRating} />
        </div>
    );
}