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

export interface ObjectItemStruct {
    id: string;
    label: string;
    action: () => Promise<any>;
}

export function useObjectManagement(objects: ObjectType, action: ActionType) {
    const [refetch, toggleRefetch] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [objectList, setObjectList] = useState<ObjectItemStruct[]>([]);

    const refetchObjects = () => toggleRefetch(!refetch);

    useEffect(() => {
        setIsLoading(true);

        if (objects === 'users' && action === 'not-activated') {
            getNotActivatedUsers()
                .then(users => {
                    const objects = users.map(user => ({ id: user.email, label: user.login, action: async () => confirmUserActivation(user.login) }));
                    setObjectList(objects);
                })
                .catch(() => console.error('Error while fetching...'))
                .finally(() => setIsLoading(false));
        }
        else if (objects === 'meals') {
            switch (action) {
            case 'added':
                getSoftAddedMeals()
                    .then(meals => {
                        const objects = meals.map(meal => ({ id: meal._id, label: meal.title, action: async () => confirmMealAddition(meal._id) }));
                        setObjectList(objects);
                    })
                    .catch(() => console.error('Error while fetching...'))
                    .finally(() => setIsLoading(false));
                break;
            case 'edited':
                getSoftEditedMeals()
                    .then(meals => {
                        const objects = meals.map(meal => ({ id: meal._id, label: meal.title, action: async () => confirmMealEdition(meal._id) }));
                        setObjectList(objects);
                    })
                    .catch(() => console.error('Error while fetching...'))
                    .finally(() => setIsLoading(false));
                break;
            case 'deleted':
                getSoftDeletedMeals()
                    .then(meals => {
                        const objects = meals.map(meal => ({ id: meal._id, label: meal.title, action: async () => confirmMealDeletion(meal._id) }));
                        setObjectList(objects);
                    })
                    .catch(() => console.error('Error while fetching...'))
                    .finally(() => setIsLoading(false));
                break;
            }
        }
    }, [refetch]);

    return { isLoading, objectList, refetchObjects };
}