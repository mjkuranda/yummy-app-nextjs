'use client';

import { DetailedDish } from '@/src/types/api.types';
import { useUserContext } from '@/src/contexts/user.context';
import { DeleteLink } from '@/src/components/common/links/delete-link';
import { useState } from 'react';
import { handleApiError } from '@/src/api/api-errors';
import { useRouter } from 'next/navigation';
import { deleteDish } from '@/src/api/api';
import { toastSuccess } from '@/src/utils/toast.utils';
import { Loader } from '@/src/components/common/loader';

interface DishDeletionProps {
    dish: DetailedDish;
}

export function DishDeletion({ dish }: DishDeletionProps) {
    const router = useRouter();
    const userContext = useUserContext();
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const { user } = userContext;

    const onClick = async () => {
        if (confirm('Czy na pewno chcesz usunąć to danie?')) {
            setIsDeleting(true);

            try {
                await deleteDish(dish.id);
                toastSuccess('Pomyślnie usunięto danie');
                router.push('/search');
            }
            catch (err: any) {
                handleApiError(err, router, userContext);
            }
            finally {
                setIsDeleting(false);
            }
        }
    };

    if (isDeleting) {
        return <Loader isAbsolute={true} />;
    }

    if (dish.provider !== 'yummy') {
        return <></>;
    }

    if (user?.isAdmin || user?.login === dish.sourceOrAuthor) {
        return <DeleteLink label={'Usuń'} onClick={onClick} />;
    }

    return <></>;
}