'use client';

import { DetailedDish } from '@/src/types/api.types';
import { EditLink } from '@/src/components/common/edit-link';
import { useUserContext } from '@/src/contexts/user.context';

interface DishEditionProps {
    dish: DetailedDish;
}

export function  DishEdition({ dish }: DishEditionProps) {
    const { user } = useUserContext();

    if (dish.provider !== 'yummy') {
        return <></>;
    }

    if (user.isAdmin || dish.sourceOrAuthor === user.login) {
        return <EditLink label={'Edytuj'} link={`/dishes/${dish.id}/edit`} />;
    }

    return <></>;
}