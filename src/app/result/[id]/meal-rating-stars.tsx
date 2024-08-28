'use client';

import styles from '@/styles/app/result/meal-rating.module.scss';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useEffect, useState } from 'react';

interface MealRatingStarsProps {
    rating: number;
}

interface StartState {
    solid: number;
    half: 0 | 1;
    rest: number;
}

export function MealRatingStars({ rating }: MealRatingStarsProps) {
    const [starState, setStarState] = useState<StartState>({
        solid: 2,
        half: 1,
        rest: 2
    });

    useEffect(() => {
        const solid = Math.floor(rating);
        const half = rating - solid > 0.2 ? 1 : 0;
        const rest = 5 - solid - half;

        setStarState({ solid, half, rest });
    }, [rating]);

    const renderSolid = (starState: StartState) => {
        return Array.from({ length: starState.solid }).map((_, index) => (
            <StarIcon key={`solid-${index}`} />
        ));
    };

    const renderHalf = (starState: StartState) => starState.half === 1 ? <StarHalfIcon /> : null;

    const renderRest = (starState: StartState) => {
        return Array.from({ length: starState.rest }).map((_, index) => (
            <StarBorderIcon key={`rest-${index}`} />
        ));
    };

    return (
        <div className={styles['meal-rating-stars']}>
            {renderSolid(starState)}
            {renderHalf(starState)}
            {renderRest(starState)}
        </div>
    );
}