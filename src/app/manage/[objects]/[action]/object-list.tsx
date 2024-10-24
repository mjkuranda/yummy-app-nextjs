'use client';

import { ObjectItemStruct } from '@/src/hooks/use-object-management';
import styles from '@/styles/app/manage/page.module.scss';
import { ActionType, ObjectType } from '@/src/types/manage.types';
import { ObjectItem } from '@/src/app/manage/[objects]/[action]/object-item';
import { useState } from 'react';
import { toastSuccess } from '@/src/utils/toast.utils';
import { handleApiError } from '@/src/api/api-errors';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/src/contexts/user.context';
import { Loader } from '@/src/components/common/loader';

interface ObjectListProps {
    objects: ObjectItemStruct[];
    objectType: ObjectType;
    actionType: ActionType;
}

export function ObjectList({ objects, objectType, actionType }: ObjectListProps) {
    const userContext = useUserContext();
    const router = useRouter();
    const [isProceeding, setIsProceeding] = useState<boolean>(false);

    const onClick = async (action: (objectList: ObjectItemStruct[]) => Promise<void>) => {
        setIsProceeding(true);

        try {
            await action(objects);
            toastSuccess('Pomyślnie wykonano akcję!');
        } catch (err: any) {
            handleApiError(err, router, userContext);
        } finally {
            setIsProceeding(false);
        }
    };

    return (
        <>
            <h3>{objectType === 'dishes' ? 'Lista dań' : 'Lista użytkowników'}</h3>
            <div className={styles['table-wrapper']}>
                <table className={styles['object-table']}>
                    <thead>
                        <tr>
                            <th className={styles['object-table__label']}>Nazwa</th>
                            <th className={styles['object-table__action']}>Akcja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {objects.map(object => <ObjectItem key={object.id} object={object} actionType={actionType}
                            onClick={onClick} />)}
                    </tbody>
                </table>
            </div>
            <p className="text-center mt-3 mb-2">Liczba elementów: {objects.length}</p>
            {isProceeding && <Loader isAbsolute={true} />}
        </>
    );
}