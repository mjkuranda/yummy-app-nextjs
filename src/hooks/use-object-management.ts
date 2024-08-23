'use client';

import {
    confirmMealAddition, confirmMealDeletion, confirmMealEdition, confirmUserActivation,
    getNotActivatedUsers,
    getSoftAddedMeals,
    getSoftDeletedMeals,
    getSoftEditedMeals
} from '@/src/api/api';
import { useEffect, useState } from 'react';
import { ActionType, ObjectType } from '@/src/types/management.types';
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

    const refetchObjects = () => toggleRefetch(!refetch);

    const fetchObjects = <Object>(getFunction: () => Promise<Object[]>, mapFunction: (object: Object) => ObjectItemStruct): void => {
        if (!isLoading) {
            setIsLoading(true);
        }

        getFunction()
            .then(fetchedObjects => {
                const objects = fetchedObjects.map(mapFunction);
                setObjectList(objects);
            })
            .catch(err => handleApiError(err, router, userContext))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        if (objects === 'users' && action === 'not-activated') {
            fetchObjects(
                getNotActivatedUsers,
                user => ({
                    id: user.email,
                    label: user.login,
                    action: async () => {
                        // eslint-disable-next-line no-useless-catch
                        try {
                            await confirmUserActivation(user.login);
                        } catch (err: unknown) {
                            throw err;
                        }
                    }
                })
            );
        }
        else if (objects === 'meals') {
            switch (action) {
            case 'added':
                fetchObjects(
                    getSoftAddedMeals,
                    meal => ({
                        id: meal._id,
                        label: meal.title,
                        action: async () => {
                            // eslint-disable-next-line no-useless-catch
                            try {
                                await confirmMealAddition(meal._id);
                            } catch (err: unknown) {
                                throw err;
                            }
                        }
                    })
                );
                break;
            case 'edited':
                fetchObjects(
                    getSoftEditedMeals,
                    meal => ({
                        id: meal._id,
                        label: meal.title,
                        action: async () => {
                            // eslint-disable-next-line no-useless-catch
                            try {
                                await confirmMealEdition(meal._id);
                            } catch (err: unknown) {
                                throw err;
                            }
                        }
                    })
                );
                break;
            case 'deleted':
                fetchObjects(
                    getSoftDeletedMeals,
                    meal => ({
                        id: meal._id,
                        label: meal.title,
                        action: async () => {
                            // eslint-disable-next-line no-useless-catch
                            try {
                                await confirmMealDeletion(meal._id);
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