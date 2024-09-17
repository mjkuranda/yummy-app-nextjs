'use client';

import { Item, ItemList } from '@/src/app/manage/item-list';
import { useEffect, useState } from 'react';
import { useUserContext } from '@/src/contexts/user.context';
import { useRouter } from 'next/navigation';

export function ItemContainer() {
    const router = useRouter();
    const { isFetching, user } = useUserContext();
    const [userItems, setUserItems] = useState<Item[]>([]);
    const [mealItems, setMealItems] = useState<Item[]>([]);

    useEffect(() => {
        if (isFetching) {
            return;
        }

        const userItemsTemp: Item[] = [];
        const mealItemsTemp: Item[] = [];

        if (user.isAdmin) {
            userItemsTemp.push({ link: 'users/not-activated', text: 'Nieaktywowani użytkownicy' });

            mealItemsTemp.push({ link: 'meals/added', text: 'Dodane posiłki' });
            mealItemsTemp.push({ link: 'meals/edited', text: 'Edytowane posiłki' });
            mealItemsTemp.push({ link: 'meals/deleted', text: 'Usunięte posiłki' });
        } else {
            if (user.capabilities?.canAdd) {
                mealItemsTemp.push({ link: 'meals/added', text: 'Dodane posiłki' });
            }

            if (user.capabilities?.canEdit) {
                mealItemsTemp.push({ link: 'meals/edited', text: 'Edytowane posiłki' });
            }

            if (user.capabilities?.canDelete) {
                mealItemsTemp.push({ link: 'meals/deleted', text: 'Usunięte posiłki' });
            }

            if (userItemsTemp.length === 0 && mealItemsTemp.length === 0) {
                return router.push('/');
            }
        }

        setUserItems([...userItemsTemp]);
        setMealItems([...mealItemsTemp]);
    }, [isFetching]);

    return (
        <>
            {userItems.length > 0 && <ItemList list={userItems} header='Users' />}
            {mealItems.length > 0 && <ItemList list={mealItems} header='Meals' />}
        </>
    );
}