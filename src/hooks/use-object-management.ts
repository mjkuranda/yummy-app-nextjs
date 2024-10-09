'use client';

import {
    confirmDishAddition, confirmDishDeletion, confirmDishEdition, confirmUserActivation,
    getNotActivatedUsers,
    getSoftAddedDishes,
    getSoftDeletedDishes,
    getSoftEditedDishes
} from '@/src/api/api';
import { useCallback, useEffect, useState } from 'react';
import { ActionType, ObjectType } from '@/src/types/manage.types';
import { useRouter } from 'next/navigation';
import { handleApiError } from '@/src/api/api-errors';
import { useUserContext } from '@/src/contexts/user.context';

export interface ObjectItemStruct {
    id: string;
    label: string;
    action: () => Promise<any>;
}

export function useObjectManagement(objects: ObjectType, action: ActionType) {
    const userContext = useUserContext();
    const router = useRouter();
    const [refetch, toggleRefetch] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [objectList, setObjectList] = useState<ObjectItemStruct[]>([]);

    const refetchObjects = useCallback(() => toggleRefetch(!refetch), []);

    const fetchObjects = useCallback(<FetchObject>(getFunction: () => Promise<FetchObject[]>, mapFunction: (object: FetchObject) => ObjectItemStruct): void => {
        getFunction()
            .then(fetchedObjects => {
                const objects = fetchedObjects.map(mapFunction);
                setObjectList(objects);
            })
            .catch(err => handleApiError(err, router, userContext))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (objects === 'users' && action === 'not-activated') {
            fetchObjects(
                getNotActivatedUsers,
                user => ({
                    id: user._id,
                    label: user.login,
                    action: async () => {
                        // eslint-disable-next-line no-useless-catch
                        try {
                            await confirmUserActivation(user._id);
                        } catch (err: unknown) {
                            throw err;
                        }
                    }
                })
            );
        }
        else if (objects === 'dishes') {
            switch (action) {
            case 'added':
                fetchObjects(
                    getSoftAddedDishes,
                    dish => ({
                        id: dish._id,
                        label: dish.title,
                        action: async () => {
                            // eslint-disable-next-line no-useless-catch
                            try {
                                await confirmDishAddition(dish._id);
                            } catch (err: unknown) {
                                throw err;
                            }
                        }
                    })
                );
                break;
            case 'edited':
                fetchObjects(
                    getSoftEditedDishes,
                    dish => ({
                        id: dish._id,
                        label: dish.title,
                        action: async () => {
                            // eslint-disable-next-line no-useless-catch
                            try {
                                await confirmDishEdition(dish._id);
                            } catch (err: unknown) {
                                throw err;
                            }
                        }
                    })
                );
                break;
            case 'deleted':
                fetchObjects(
                    getSoftDeletedDishes,
                    dish => ({
                        id: dish._id,
                        label: dish.title,
                        action: async () => {
                            // eslint-disable-next-line no-useless-catch
                            try {
                                await confirmDishDeletion(dish._id);
                            } catch (err: unknown) {
                                throw err;
                            }
                        }
                    })
                );
                break;
            }
        }
    }, [refetch]);

    return { isLoading, objectList, refetchObjects };
}