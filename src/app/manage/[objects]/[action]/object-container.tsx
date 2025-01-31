'use client';

import { useParams, useRouter } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useObjectManagement } from '@/src/hooks/use-object-management';
import styles from '@/styles/app/manage/page.module.scss';
import { ObjectList } from '@/src/app/manage/[objects]/[action]/object-list';
import Link from 'next/link';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { ActionType, ObjectType } from '@/src/types/manage.types';
import { Loader } from '@/src/components/common/loader';
import { useEffect } from 'react';
import { toastInfo } from '@/src/utils/toast.utils';
import { useUserContext } from '@/src/contexts/user.context';
import { PaginationProvider } from '@/src/contexts/pagination.context';

interface ObjectManagementParams extends Params {
    objects: ObjectType;
    action: ActionType;
}

export function ObjectContainer() {
    const router = useRouter();
    const { isFetching, user } = useUserContext();
    const { objects, action } = useParams<ObjectManagementParams>();
    const { objectList, isLoading } = useObjectManagement(objects, action);

    useEffect(() => {
        if (isFetching) {
            return;
        }

        if (user.isAdmin) {
            return;
        }

        if (action === 'added' && !user.capabilities?.canAdd) {
            toastInfo('Aby zatwierdzać nowe posiłki, potrzebujesz uprawnień admina, badź możliwości dodawania.');

            return router.push('/');
        }

        if (action === 'edited' && !user.capabilities?.canEdit) {
            toastInfo('Aby zatwierdzać edycję posiłków, potrzebujesz uprawnień admina, badź możliwości edycji.');

            return router.push('/');
        }

        if (action === 'deleted' && !user.capabilities?.canDelete) {
            toastInfo('Aby zatwierdzać usunięcie posiłków, potrzebujesz uprawnień admina, badź możliwości usuwania.');

            return router.push('/');
        }
    }, [isFetching]);

    return (
        <>
            <div className={styles['object-container']} style={{ minHeight: 'calc(100vh - 222px - 96px)' }}>
                <div className={styles['back-link']}>
                    <Link href="/manage">
                        <ArrowCircleLeftIcon />Powrót do zarządzania
                    </Link>
                </div>
                {isLoading
                    ? <Loader isAbsolute={true} />
                    : objectList.length === 0
                        ? 'Brak obiektów.'
                        : (
                            <PaginationProvider>
                                <ObjectList objects={objectList} objectType={objects} actionType={action} />
                            </PaginationProvider>
                        )
                }
            </div>
        </>
    );
}