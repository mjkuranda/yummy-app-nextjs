'use client';

import Link from 'next/link';
import { DishResult } from '@/src/types/api.types';
import styles from '@/styles/app/search/search-dish-result.module.scss';
import { Button } from '@/src/components/common/button';
import { useHasImage } from '@/src/hooks/use-has-image';
import { Loader } from '@/src/components/common/loader';
import { ReactElement } from 'react';
import { encodeSearchQuery } from '@/src/helpers/query.helper';
import { useSearchFilters } from '@/src/hooks/use-search-filters';
import { FlagIcon } from '@/src/components/common/flag-icon';

interface SearchDishResultProps {
    dish: DishResult;
}

export function SearchDishResult({ dish }: SearchDishResultProps) {
    const { hasImage, isLoading } = useHasImage(dish.imgUrl);
    const imgSrc = hasImage ? dish.imgUrl : '/no-image.png';
    const { ings, mealType, dishType } = useSearchFilters();
    const searchUrlQuery = encodeSearchQuery(ings, mealType, dishType);

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
                <Link className={styles['img-link']} href={`/dishes/${dish.id}?sourceUrl=${searchUrlQuery}`} target="_blank">
                    {isLoading
                        ? (
                            <div className="d-flex justify-content-center align-items-center w-100 h-100">
                                <Loader />
                            </div>
                        ) : <img src={imgSrc} alt={`Zdjęcie dania o nazwie ${dish.title}`} />}
                </Link>
            </div>
            <div className={styles['result-label']}>
                <div className={styles['result-description']}>
                    <div className={styles['result-title']}>{dish.title}</div>
                    <div className={styles['result-text']}>
                        <span>{renderRelevance(dish.relevance)}</span>
                        <span>{renderMissing(dish.missingCount)}</span>
                        <div className="d-flex justify-content-center">
                            <FlagIcon language={dish.language} hasTranslationInfo={false} />
                        </div>
                    </div>
                </div>
                <div className={`${styles['result-button']} d-flex justify-content-center align-items-center`}>
                    <Button label={'Zobacz'} link={`/dishes/${dish.id}?sourceUrl=${searchUrlQuery}`} />
                </div>
            </div>
        </div>
    );
}