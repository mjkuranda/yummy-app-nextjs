'use client';

import styles from '@/styles/app/result/meal-comment-container.module.scss';
import { useParams } from 'next/navigation';
import { useGetMealComments } from '@/src/api/endpoints';
import { Loader } from '@/src/components/common/loader';
import { MealCommentContent } from '@/src/app/result/[id]/meal-comment-content';
import { MealCommentAddSection } from '@/src/app/result/[id]/meal-comment-add-section';
import { MealComment } from '@/src/types/meal.types';

export function MealCommentContainer() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isFetching, refetch } = useGetMealComments(id);

    const mock: MealComment[] = [
        { _id: '123', mealId: '123', user: 'Xywfnjn', text: 'Lorem ipsum dolor sit amet.', posted: Date.now() },
        { _id: '123', mealId: '123', user: 'Xywfnjn', text: 'Lorem ipsum dolor sit amet.', posted: Date.now() },
        { _id: '123', mealId: '123', user: 'Xywfnjn', text: 'Lorem ipsum dolor sit amet.', posted: Date.now() }
    ];

    // fetching
    console.log(isLoading, isFetching);

    return (
        <div className={styles['meal-comment-container']}>
            {!isLoading && data
                ? (
                    <div className={styles['meal-comment-content']}>
                        <h3 className={styles['meal-comment-header']}>Comments</h3>
                        <MealCommentAddSection />
                        <MealCommentContent data={mock} />
                    </div>
                )
                : <Loader />
            }
        </div>
    );
}