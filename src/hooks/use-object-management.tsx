'use client';

import {
    confirmDishAddition, confirmDishDeletion, confirmDishEdition, confirmUserActivation, denyPermission, getAllUsers,
    getNotActivatedUsers,
    getSoftAddedDishes,
    getSoftDeletedDishes,
    getSoftEditedDishes, grandPermission
} from '@/src/api/api';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { ActionType, ObjectType } from '@/src/types/manage.types';
import { useRouter } from 'next/navigation';
import { handleApiError } from '@/src/api/api-errors';
import { useUserContext } from '@/src/contexts/user.context';
import Link from 'next/link';

export interface ObjectItemStruct {
    id: string;
    label: ReactNode;
    labelIcon?: 'person-grand' | 'person-deny';
    action: (objectList: ObjectItemStruct[]) => Promise<void>;
    actionLabel?: string;
    actionDisabled?: boolean;
}

export function useObjectManagement(objects: ObjectType, action: ActionType) {
    const userContext = useUserContext();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [objectList, setObjectList] = useState<ObjectItemStruct[]>([]);

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
        if (objects === 'users') {
            switch (action) {
            case 'permission-for-adding':
                fetchObjects(
                    getAllUsers,
                    user => ({
                        id: user.id,
                        label: <Link href={`/users/${user.login}/profile`}>{user.login}</Link>,
                        labelIcon: user.isAdmin || user.capabilities?.canAdd ? 'person-grand' : 'person-deny',
                        action: async (objectList: ObjectItemStruct[]) => {
                            const shouldGrand = !user?.capabilities?.canAdd;

                            // eslint-disable-next-line no-useless-catch
                            try {
                                shouldGrand
                                    ? await grandPermission(user.login, 'canAdd')
                                    : await denyPermission(user.login, 'canAdd');

                                user.capabilities = {
                                    ...user.capabilities,
                                    ...(shouldGrand && { canAdd: true })
                                };

                                setObjectList(objectList.map(object => {
                                    if (object.id === user.id) {
                                        return {
                                            ...object,
                                            actionLabel: shouldGrand ? '- Odbierz uprawnienie' : '+ Nadaj uprawnienie',
                                            labelIcon: object.labelIcon === 'person-grand' ? 'person-deny' : 'person-grand'
                                        };
                                    }

                                    return object;
                                }));
                            } catch (err: unknown) {
                                throw err;
                            }
                        },
                        actionLabel: user.isAdmin || user.capabilities?.canAdd ? '- Odbierz uprawnienie' : '+ Nadaj uprawnienie',
                        actionDisabled: user.isAdmin
                    })
                );
                break;
            case 'permission-for-editing':
                fetchObjects(
                    getAllUsers,
                    user => ({
                        id: user.id,
                        label: <Link href={`/users/${user.login}/profile`}>{user.login}</Link>,
                        labelIcon: user.isAdmin || user.capabilities?.canEdit ? 'person-grand' : 'person-deny',
                        action: async (objectList: ObjectItemStruct[]) => {
                            const shouldGrand = !user?.capabilities?.canEdit;

                            // eslint-disable-next-line no-useless-catch
                            try {
                                shouldGrand
                                    ? await grandPermission(user.login, 'canEdit')
                                    : await denyPermission(user.login, 'canEdit');

                                user.capabilities = {
                                    ...user.capabilities,
                                    ...(shouldGrand && { canEdit: true })
                                };

                                setObjectList(objectList.map(object => {
                                    if (object.id === user.id) {
                                        return {
                                            ...object,
                                            actionLabel: shouldGrand ? '- Odbierz uprawnienie' : '+ Nadaj uprawnienie',
                                            labelIcon: object.labelIcon === 'person-grand' ? 'person-deny' : 'person-grand'
                                        };
                                    }

                                    return object;
                                }));
                            } catch (err: unknown) {
                                throw err;
                            }
                        },
                        actionLabel: user.isAdmin || user.capabilities?.canEdit ? '- Odbierz uprawnienie' : '+ Nadaj uprawnienie',
                        actionDisabled: user.isAdmin
                    })
                );
                break;
            case 'permission-for-deleting':
                fetchObjects(
                    getAllUsers,
                    user => ({
                        id: user.id,
                        label: <Link href={`/users/${user.login}/profile`}>{user.login}</Link>,
                        labelIcon: user.isAdmin || user.capabilities?.canDelete ? 'person-grand' : 'person-deny',
                        action: async (objectList: ObjectItemStruct[]) => {
                            const shouldGrand = !user?.capabilities?.canDelete;

                            // eslint-disable-next-line no-useless-catch
                            try {
                                shouldGrand
                                    ? await grandPermission(user.login, 'canDelete')
                                    : await denyPermission(user.login, 'canDelete');

                                user.capabilities = {
                                    ...user.capabilities,
                                    ...(shouldGrand && { canDelete: true })
                                };

                                setObjectList(objectList.map(object => {
                                    if (object.id === user.id) {
                                        return {
                                            ...object,
                                            actionLabel: shouldGrand ? '- Odbierz uprawnienie' : '+ Nadaj uprawnienie',
                                            labelIcon: object.labelIcon === 'person-grand' ? 'person-deny' : 'person-grand'
                                        };
                                    }

                                    return object;
                                }));
                            } catch (err: unknown) {
                                throw err;
                            }
                        },
                        actionLabel: user.isAdmin || user.capabilities?.canDelete ? '- Odbierz uprawnienie' : '+ Nadaj uprawnienie',
                        actionDisabled: user.isAdmin
                    })
                );
                break;
            case 'not-activated':
                fetchObjects(
                    getNotActivatedUsers,
                    user => ({
                        id: user._id,
                        label: <Link href={`/users/${user.login}/profile`}>{user.login}</Link>,
                        action: async (objectList: ObjectItemStruct[]) => {
                            // eslint-disable-next-line no-useless-catch
                            try {
                                await confirmUserActivation(user._id);
                                setObjectList(objectList.filter(object => object.id !== user._id));
                            } catch (err: unknown) {
                                throw err;
                            }
                        }
                    })
                );
                break;
            }
        }
        else if (objects === 'dishes') {
            switch (action) {
            case 'added':
                fetchObjects(
                    getSoftAddedDishes,
                    dish => ({
                        id: dish._id,
                        label: dish.title,
                        action: async (objectList: ObjectItemStruct[]) => {
                            // eslint-disable-next-line no-useless-catch
                            try {
                                await confirmDishAddition(dish._id);
                                setObjectList(objectList.filter(object => object.id !== dish._id));
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
                        label: <Link href={`/dishes/${dish._id}`}>{dish.title}</Link>,
                        action: async (objectList: ObjectItemStruct[]) => {
                            // eslint-disable-next-line no-useless-catch
                            try {
                                await confirmDishEdition(dish._id);
                                setObjectList(objectList.filter(object => object.id !== dish._id));
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
                        label: <Link href={`/dishes/${dish._id}`}>{dish.title}</Link>,
                        action: async (objectList: ObjectItemStruct[]) => {
                            // eslint-disable-next-line no-useless-catch
                            try {
                                await confirmDishDeletion(dish._id);
                                setObjectList(objectList.filter(object => object.id !== dish._id));
                            } catch (err: unknown) {
                                throw err;
                            }
                        }
                    })
                );
                break;
            }
        }
    }, []);

    return { isLoading, objectList };
}