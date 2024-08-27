'use client';

import styles from '@/styles/app/result/meal-comment-container.module.scss';
import { Button } from '@/src/components/common/button';
import { InputString } from '@/src/components/common/form/input-string';
import { useState } from 'react';

export function MealCommentAddSection() {
    const [commentValue, setCommentValue] = useState<string>('');

    const onAddComment = () => {};

    return (
        <div className={styles['meal-comment-add-section']}>
            <div className={styles['meal-comment-add-section__input']}>
                <InputString label={'Nowy komentarz'} value={commentValue} setValue={setCommentValue} />
            </div>
            <Button label={'Dodaj komentarz'} onClick={onAddComment} />
        </div>
    );
}