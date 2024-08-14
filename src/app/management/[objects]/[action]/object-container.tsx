'use client';

import { useParams } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useObjectManagement } from '@/src/hooks/use-object-management';
import styles from '@/styles/app/management/page.module.scss';
import { ObjectList } from '@/src/app/management/[objects]/[action]/object-list';
import Link from 'next/link';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { ActionType, ObjectType } from '@/src/types/management.types';

interface ObjectManagementParams extends Params {
    objects: ObjectType;
    action: ActionType;
}

export function ObjectContainer() {
    const { objects, action } = useParams<ObjectManagementParams>();
    const { objectList, isLoading } = useObjectManagement(objects, action);

    return (
        <>
            <div className={styles['object-container']}>
                <div className={styles['back-link']}>
                    <Link href="/management">
                        <ArrowCircleLeftIcon />Back to management
                    </Link>
                </div>
                {isLoading
                    ? 'Loading...'
                    : objectList.length === 0
                        ? 'No objects.'
                        : <ObjectList objects={objectList} objectType={objects} actionType={action} />
                }
            </div>
        </>
    );
}