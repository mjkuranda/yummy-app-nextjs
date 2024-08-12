'use client';

import { useParams } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useObjectManagement } from '@/src/hooks/use-object-management';

interface ObjectManagementParams extends Params {
    objects: string;
    action: string;
}

export function ObjectContainer() {
    const { objects, action } = useParams<ObjectManagementParams>();
    const { isLoading, objectList } = useObjectManagement(objects, action);

    return (
        <>
            {isLoading
                ? 'Loading...'
                : objectList.length === 0
                    ? 'No objects.'
                    : (
                        <ul>
                            {objectList.map(object => {
                                return (
                                    <li key={object.id}>
                                        {object.label}
                                    </li>
                                );
                            })}
                        </ul>
                    )
            }
        </>
    );
}