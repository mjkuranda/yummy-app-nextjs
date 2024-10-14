'use client';

import styles from '@/styles/app/result/dish-comment-container.module.scss';
import { useParams } from 'next/navigation';
import { useGetDishComments } from '@/src/api/endpoints';
import { Loader } from '@/src/components/common/loader';
import { DishCommentContent } from '@/src/app/result/[id]/dish-comment-content';
import { DishCommentAddSection } from '@/src/app/result/[id]/dish-comment-add-section';
import Link from 'next/link';
import { useUserContext } from '@/src/contexts/user.context';

export function DishCommentContainer() {
    const { id } = useParams<{ id: string }>();
    const { isLoggedIn } = useUserContext();
    const { data, isLoading, refetch } = useGetDishComments(id);

    return (
        <div className={styles['dish-comment-container']}>
            {!isLoading && data
                ? (
                    <div className={styles['dish-comment-content']}>
                        <h3 className={styles['dish-comment-header']}>Komentarze</h3>
                        {isLoggedIn()
                            ? <DishCommentAddSection refetch={refetch} />
                            : <p className="text-center"><Link href={'/users/login'}>Zaloguj się</Link>, aby dodać komentarz.</p>
                        }
                        <DishCommentContent data={data} />
                    </div>
                )
                : <Loader />
            }
        </div>
    );
}