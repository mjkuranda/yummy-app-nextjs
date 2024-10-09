'use client';

import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';
import styles from '@/styles/app/result/page.module.scss';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Link from 'next/link';
import { redirect, useParams, useSearchParams } from 'next/navigation';
import { useGetDishById } from '@/src/api/endpoints';
import { DishContainer } from '@/src/app/result/[id]/dish-container';
import { DetailedDishWithTranslations } from '@/src/types/api.types';
import { toastError } from '@/src/utils/toast.utils';
import { Loader } from '@/src/components/common/loader';
import { useEffect } from 'react';

export default function ResultById() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const { data: dish, isLoading, isError, error } = useGetDishById(id as string);

    useEffect(() => {
        if (isError && error.message.includes('was not confirmed by admin')) {
            toastError('Ten posiłek nie został jeszcze zatwierdzony przez administrację.');
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

    return (
        <>
            <Header />
            <div className={styles['result-page']}>
                <div className={styles['result-nav']}>
                    <Link href={searchParams.get('sourceUrl') ?? '/search'}>
                        <ArrowCircleLeftIcon />Wróć do wyszukiwania
                    </Link>
                </div>
                <div className={styles['result-container']}>
                    {isLoading || isError
                        ? <Loader isAbsolute={true} />
                        : <DishContainer complexDishObject={dish as DetailedDishWithTranslations} />
                    }
                    {!isLoading && !dish && <div>Danie nie zostało znalezione.</div>}
                    {isError && <div>Wystąpił błąd.</div>}
                </div>
            </div>
            <Footer />
        </>
    );
}

function isApiError(dish: DetailedDishWithTranslations | undefined): boolean {
    return (dish as any)?.statusCode !== undefined;
}