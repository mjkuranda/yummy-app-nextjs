'use client';

import Link from 'next/link';
import { MealResult } from '@/src/types/api.types';
import styles from '@/styles/app/search/search-meal-result.module.scss';
import { Button } from '@/src/components/common/button';
import { useHasImage } from '@/src/hooks/useHasImage';
import { Loader } from '@/src/components/common/loader';
import { ReactElement } from 'react';

interface SearchMealResultProps {
    meal: MealResult;
    ingredientQuery: string;
}

export function SearchMealResult({ meal, ingredientQuery }: SearchMealResultProps) {
    const { hasImage, isLoading } = useHasImage(meal.imgUrl);
    const imgSrc = hasImage ? meal.imgUrl : '/no-image.png';
    const encodedUri = encodeURI(`/search?${ingredientQuery}`);

    const renderMissing = (missingCount: number): ReactElement | string => {
        if (missingCount === 0) {
            return <b style={{ color: 'green' }}>Idealnie pasujące</b>;
        }

        if (missingCount === 1) {
            return '1 brakujący składnik';
        }

        if (missingCount < 5) {
            return `${missingCount} brakujące składniki`;
        }

        return `${missingCount} brakujących składników`;
    };

    const renderRelevance = (relevance: number): ReactElement => {
        return <>Zgodność z Twoim wyszukiwaniem: <b>{Math.ceil(relevance * 100)}%</b></>;
    };

    return (
        <div className={`${styles['result-container']} d-flex justify-content-center align-items-center`}>
            <div className={styles['result-image']}>
                <Link className={styles['img-link']} href={`/result/${meal.id}?sourceUrl=${ingredientQuery}`} target="_blank">
                    {isLoading ? <Loader /> : <img src={imgSrc} alt={`Zdjęcie posiłku o nazwie ${meal.title}`} />}
                </Link>
            </div>
            <div className={styles['result-label']}>
                <div className={styles['result-description']}>
                    <div className={styles['result-title']}>{meal.title}</div>
                    <div className={styles['result-text']}>
                        <span>{renderRelevance(meal.relevance)}</span>
                        <span>{renderMissing(meal.missingCount)}</span>
                    </div>
                </div>
                <div className={`${styles['result-button']} d-flex justify-content-center align-items-center`}>
                    <Button label={'Zobacz'} link={`/result/${meal.id}?sourceUrl=${encodedUri}`} />
                </div>
            </div>
        </div>
    );
}