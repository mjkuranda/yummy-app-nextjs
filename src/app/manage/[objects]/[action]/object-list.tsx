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
import { CustomTablePagination } from '@/src/components/common/custom-table-pagination';
import { usePaginationContext } from '@/src/contexts/pagination.context';

interface ObjectListProps {
    objects: ObjectItemStruct[];
    objectType: ObjectType;
    actionType: ActionType;
}

export function ObjectList({ objects, objectType, actionType }: ObjectListProps) {
    const userContext = useUserContext();
    const { rowsPerPage, page } = usePaginationContext();
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
                        {(rowsPerPage > 0
                            ? objects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : objects
                        ).map(object => <ObjectItem key={object.id} object={object} actionType={actionType}
                            onClick={onClick} />)}
                    </tbody>
                </table>
            </div>
            <div className={styles['table-pagination-container']}>
                <CustomTablePagination objects={objects} />
            </div>
            {isProceeding && <Loader isAbsolute={true} />}
        </>
    );
}