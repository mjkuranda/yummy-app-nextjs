'use client';

import { ObjectItemStruct } from '@/src/hooks/use-object-management';
import styles from '@/styles/app/management/page.module.scss';
import { ActionType, ObjectType } from '@/src/types/management.types';
import { ObjectItem } from '@/src/app/management/[objects]/[action]/object-item';
import { useState } from 'react';
import { toastSuccess } from '@/src/utils/toast.utils';
import { handleApiError } from '@/src/api/api-errors';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/src/contexts/user.context';

interface ObjectListProps {
    objects: ObjectItemStruct[];
    objectType: ObjectType;
    actionType: ActionType;
    refetch: () => void;
}

export function ObjectList({ objects, objectType, actionType, refetch }: ObjectListProps) {
    const userContext = useUserContext();
    const router = useRouter();
    const [isProceeding, setIsProceeding] = useState<boolean>(false);

    const onClick = async (action: () => Promise<any>) => {
        setIsProceeding(true);

        try {
            await action();
            refetch();
            toastSuccess('Action performed successfully!');
        } catch (err: any) {
            handleApiError(err, router, userContext);
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