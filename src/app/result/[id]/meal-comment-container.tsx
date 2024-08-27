'use client';

import styles from '@/styles/app/result/meal-comment-container.module.scss';
import { useParams } from 'next/navigation';
import { useGetMealComments } from '@/src/api/endpoints';
import { Loader } from '@/src/components/common/loader';
import { MealCommentContent } from '@/src/app/result/[id]/meal-comment-content';
import { MealCommentAddSection } from '@/src/app/result/[id]/meal-comment-add-section';

export function MealCommentContainer() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetMealComments(id);

    return (
        <div className={styles['meal-comment-container']}>
            {!isLoading && data
                ? (
                    <div className={styles['meal-comment-content']}>
                        <h3 className={styles['meal-comment-header']}>Comments</h3>
                        <MealCommentContent data={data} />
                        <MealCommentAddSection />
                    </div>
                )
                : <Loader />
            }
        </div>
    );
}