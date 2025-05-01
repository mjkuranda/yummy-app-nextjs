import { DishImage } from '@/src/app/dishes/[id]/dish-image';
import { DishGeneral } from '@/src/app/dishes/[id]/dish-general';
import { DishCommentContainer } from '@/src/app/dishes/[id]/dish-comment-container';
import { useGetDishById } from '@/src/api/endpoints';
import { useEffect } from 'react';
import { toastError } from '@/src/utils/toast.utils';
import { redirect } from 'next/navigation';
import { DetailedDish } from '@/src/types/api.types';
import { ApiError } from '@/src/api/api-errors';
import { Loader } from '@/src/components/common/loader';
import { useDishDetailsContext } from '@/src/contexts/dish-details.context';

interface DishContainerProps {
    dishId: string;
    sourceUrl: string | null;
}

export function DishContainer({ dishId, sourceUrl }: DishContainerProps) {
    const { language } = useDishDetailsContext();
    const { data: dish, isLoading, isError, error } = useGetDishById(dishId, language);

    useEffect(() => {
        if (isError && error.message.includes('was not confirmed by admin')) {
            toastError('To danie nie zostało jeszcze zatwierdzone przez administrację.');
            redirect('/search');
        }

        if (isError && error.message.includes('deleted')) {
            toastError('To danie zostało wyłączone do wglądu i czeka na usunięcie przez administrację.');
            redirect('/search');
        }

        if (isApiError(dish)) {
            toastError('Wystąpił błąd podczas pobierania danych.');
            redirect('/search');
        }

        if (isError) {
            toastError('Wystąpił błąd podczas pobierania danych.');
            redirect('/search');
        }
    }, [dish, isError]);

    if (isLoading) {
        return <Loader isAbsolute={true} />;
    }

    if (isError) {
        return <div>Wystąpił błąd.</div>;
    }

    if (!isDetailedDish(dish, isLoading)) {
        return <div>Danie nie zostało znalezione.</div>;
    }

    return (
        <>
            <DishImage imgUrl={dish.imgUrl} title={dish.title} provider={dish.provider} />
            <DishGeneral dish={dish} sourceUrl={sourceUrl} />
            <DishCommentContainer />
        </>
    );
}

function isApiError(dish: DetailedDish | ApiError | undefined): dish is ApiError {
    return (dish as any)?.statusCode !== undefined;
}

function isDetailedDish(dish: DetailedDish | undefined, isLoading: boolean): dish is DetailedDish {
    return !isLoading && Boolean(dish);
}