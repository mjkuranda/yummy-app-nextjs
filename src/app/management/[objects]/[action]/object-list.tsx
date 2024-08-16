'use client';

import { ObjectItemStruct } from '@/src/hooks/use-object-management';
import styles from '@/styles/app/management/page.module.scss';
import { ActionType, ObjectType } from '@/src/types/management.types';
import { ObjectItem } from '@/src/app/management/[objects]/[action]/object-item';
import { useState } from 'react';
import { toastError, toastSuccess } from '@/src/utils/toast.utils';

interface ObjectListProps {
    objects: ObjectItemStruct[];
    objectType: ObjectType;
    actionType: ActionType;
    refetch: () => void;
}

export function ObjectList({ objects, objectType, actionType, refetch }: ObjectListProps) {
    const [isProceeding, setIsProceeding] = useState<boolean>(false);

    const onClick = async (action: () => Promise<any>) => {
        setIsProceeding(true);

        try {
            await action();
            refetch();
            toastSuccess('Action performed successfully!');
        } catch (err: any) {
            toastError(err.message);
        } finally {
            setIsProceeding(false);
        }
    };

    return (
        <>
            <h3>{objectType === 'meals' ? 'Meal list' : 'User list'}</h3>
            <table className={styles['object-table']}>
                <thead>
                    <tr>
                        <th className={styles['object-table__label']}>Name</th>
                        <th className={styles['object-table__action']}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {objects.map(object => <ObjectItem key={object.id} object={object} actionType={actionType} onClick={onClick} />)}
                </tbody>
            </table>
            {isProceeding && 'Proceeding...'}
        </>
    );
}