'use client';

import styles from '@/styles/app/result/meal-comment-container.module.scss';
import { InputString } from '@/src/components/common/form/input-string';
import { useState } from 'react';
import { SendIconButton } from '@/src/components/common/send-icon-button';
import { useUserContext } from '@/src/contexts/user.context';

export function MealCommentAddSection() {
    const { user } = useUserContext();
    const [commentValue, setCommentValue] = useState<string>('');
    const [isPosting, setIsPosting] = useState<boolean>(false);

    const onAddComment = () => {};

    return (
        <div className={styles['meal-comment-add-section']}>
            <div className={styles['meal-comment-add-section__input']}>
                <InputString label={'Nowy komentarz'} value={commentValue} setValue={setCommentValue} />
                <div className={styles['meal-comment-add-section__send-icon']}><SendIconButton onClick={onAddComment} disabled={commentValue.length === 0} /></div>
            </div>
        </div>
    );
}