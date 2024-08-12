'use client';

import { getNotActivatedUsers, getSoftAddedMeals, getSoftDeletedMeals, getSoftEditedMeals } from '@/src/api/api';
import { useEffect, useState } from 'react';

export interface ObjectItem {
    id: string;
    label: string;
    action: () => Promise<void>;
}

export function useObjectManagement(objects: string, action: string) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [objectList, setObjectList] = useState<ObjectItem[]>([]);

    useEffect(() => {
        if (objects === 'users' && action === 'not-activated') {
            getNotActivatedUsers()
                .then(users => {
                    const objects = users.map(user => ({ id: user.email, label: user.login, action: async () => {} }));
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
                        const objects = meals.map(meal => ({ id: meal._id, label: meal.title, action: async () => {} }));
                        setObjectList(objects);
                    })
                    .catch(() => console.error('Error while fetching...'))
                    .finally(() => setIsLoading(false));
                break;
            case 'edited':
                getSoftEditedMeals()
                    .then(meals => {
                        const objects = meals.map(meal => ({ id: meal._id, label: meal.title, action: async () => {} }));
                        setObjectList(objects);
                    })
                    .catch(() => console.error('Error while fetching...'))
                    .finally(() => setIsLoading(false));
                break;
            case 'deleted':
                getSoftDeletedMeals()
                    .then(meals => {
                        const objects = meals.map(meal => ({ id: meal._id, label: meal.title, action: async () => {} }));
                        setObjectList(objects);
                    })
                    .catch(() => console.error('Error while fetching...'))
                    .finally(() => setIsLoading(false));
                break;
            }
        }
    }, []);

    return { isLoading, objectList };
}