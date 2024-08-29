'use client';

import styles from '@/styles/app/result/meal-comment-container.module.scss';
import { InputString } from '@/src/components/common/form/input-string';
import { useEffect, useState } from 'react';
import { SendIconButton } from '@/src/components/common/send-icon-button';
import { postNewComment } from '@/src/api/api';
import { useParams, useRouter } from 'next/navigation';
import { QueryObserverResult } from '@tanstack/react-query';
import { MealComment } from '@/src/types/meal.types';
import { Loader } from '@/src/components/common/loader';
import { ApiError, handleApiError } from '@/src/api/api-errors';
import { useUserContext } from '@/src/contexts/user.context';

interface MealCommentAddSectionProps {
    refetch: () => Promise<QueryObserverResult<MealComment[], Error>>;
}

export function MealCommentAddSection({ refetch }: MealCommentAddSectionProps) {
    const { id } = useParams<{ id: string }>();
    const userContext = useUserContext();
    const router = useRouter();
    const [commentValue, setCommentValue] = useState<string>('');
    const [isPosting, setIsPosting] = useState<boolean>(false);

    useEffect(() => {
        if (isPosting) {
            setCommentValue('');
        }
    }, [isPosting]);

    const onKeyDown = (e: KeyboardEvent): void => {
        if (e.key === 'Enter') {
            onAddComment();
        }
    };

    const onAddComment = async () => {
        setIsPosting(true);

        try {
            await postNewComment({
                mealId: id,
                text: commentValue
            });

            await refetch();
        } catch (err: unknown) {
            if (err instanceof ApiError) {
                handleApiError(err, router, userContext);
            }
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <div className={styles['meal-comment-add-section']}>
            <div className={styles['meal-comment-add-section__input']}>
                <InputString label={'Nowy komentarz'} value={commentValue} setValue={setCommentValue} onKeyDown={onKeyDown} />
                <div className={styles['meal-comment-add-section__send-icon']}>
                    {isPosting ? <Loader /> : <SendIconButton onClick={onAddComment} disabled={commentValue.length === 0} />}
                </div>
            </div>
        </div>
    );
}