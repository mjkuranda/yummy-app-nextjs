'use client';

import { Item, ItemList } from '@/src/app/manage/item-list';
import { useEffect, useState } from 'react';
import { useUserContext } from '@/src/contexts/user.context';
import { useRouter } from 'next/navigation';

export function ItemContainer() {
    const router = useRouter();
    const { isFetching, user } = useUserContext();
    const [userItems, setUserItems] = useState<Item[]>([]);
    const [dishItems, setDishItems] = useState<Item[]>([]);

    useEffect(() => {
        if (isFetching) {
            return;
        }

        const userItemsTemp: Item[] = [];
        const dishItemsTemp: Item[] = [];

        if (user.isAdmin) {
            userItemsTemp.push({ link: 'users/permission-for-adding', text: 'Uprawnienia do dodawania', description: 'Nadaj uprawnienia użytkownikom, by mogli zatwierdzać nowe dania.' });
            userItemsTemp.push({ link: 'users/permission-for-editing', text: 'Uprawnienia do edycji', description: 'Nadaj uprawnienia użytkownikom, by mogli zatwierdzać edycję dań.' });
            userItemsTemp.push({ link: 'users/permission-for-deleting', text: 'Uprawnienia do usuwania', description: 'Nadaj uprawnienia użytkownikom, by mogli zatwierdzać usuwanie dań.' });
            userItemsTemp.push({ link: 'users/not-activated', text: 'Nowo zarejestrowani', description: 'Aktywuj nowo utworzonych użytkowników. Nieaktywowani użytkownicy nie mają możliwości logowania.' });

            dishItemsTemp.push({ link: 'dishes/added', text: 'Dodane dania', description: 'Zatwierdź nowo dodane dania. Dania niezatwierdzone nie są widoczne dla użytkowników.' });
            dishItemsTemp.push({ link: 'dishes/edited', text: 'Edytowane dania', description: 'Zatwierdź edycję dań. Użytkownicy nie widzą zmiań, dopóki nie zostaną one zatwierdzone.' });
            dishItemsTemp.push({ link: 'dishes/deleted', text: 'Usunięte dania', description: 'Zatwierdź zlecenie usunięcia poszczególnych dań. Zatwierdzenie tej akcji permanentnie usunie takie dania.' });
        } else {
            if (user.capabilities?.canAdd) {
                dishItemsTemp.push({ link: 'dishes/added', text: 'Dodane dania', description: 'Zatwierdź nowo dodane dania. Dania niezatwierdzone nie są widoczne dla użytkowników.' });
            }

            if (user.capabilities?.canEdit) {
                dishItemsTemp.push({ link: 'dishes/edited', text: 'Edytowane dania', description: 'Zatwierdź edycję dań. Użytkownicy nie widzą zmiań, dopóki nie zostaną one zatwierdzone.' });
            }

            if (user.capabilities?.canDelete) {
                dishItemsTemp.push({ link: 'dishes/deleted', text: 'Usunięte dania', description: 'Zatwierdź zlecenie usunięcia poszczególnych dań. Zatwierdzenie tej akcji permanentnie usunie takie dania.' });
            }

            if (userItemsTemp.length === 0 && dishItemsTemp.length === 0) {
                return router.push('/');
            }
        }

        setUserItems([...userItemsTemp]);
        setDishItems([...dishItemsTemp]);
    }, [isFetching]);

    return (
        <>
            {userItems.length > 0 && <ItemList list={userItems} header='Users' />}
            {dishItems.length > 0 && <ItemList list={dishItems} header='Dishes' />}
        </>
    );
}