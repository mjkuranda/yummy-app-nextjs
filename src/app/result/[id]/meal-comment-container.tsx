'use client';

import styles from '@/styles/app/result/meal-comment-container.module.scss';
import { useParams } from 'next/navigation';
import { useGetMealComments } from '@/src/api/endpoints';
import { Loader } from '@/src/components/common/loader';
import { MealCommentContent } from '@/src/app/result/[id]/meal-comment-content';
import { MealCommentAddSection } from '@/src/app/result/[id]/meal-comment-add-section';
import Link from 'next/link';
import { useUserContext } from '@/src/contexts/user.context';

export function MealCommentContainer() {
    const { id } = useParams<{ id: string }>();
    const { isLoggedIn } = useUserContext();
    const { data, isLoading, refetch } = useGetMealComments(id);

    return (
        <div className={styles['meal-comment-container']}>
            {!isLoading && data
                ? (
                    <div className={styles['meal-comment-content']}>
                        <h3 className={styles['meal-comment-header']}>Comments</h3>
                        {isLoggedIn()
                            ? <MealCommentAddSection refetch={refetch} />
                            : <p className="text-center"><Link href={'/users/login'}>Zaloguj się</Link>, aby dodać komentarz.</p>
                        }
                        <MealCommentContent data={data} />
                    </div>
                )
                : <Loader />
            }
        </div>
    );
}