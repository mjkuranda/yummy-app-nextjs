'use client';

import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';
import styles from '@/styles/app/result/page.module.scss';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Link from 'next/link';
import { redirect, useParams, useSearchParams } from 'next/navigation';
import { useGetMealById } from '@/src/api/endpoints';
import { MealContainer } from '@/src/app/result/[id]/meal-container';
import { DetailedMealWithTranslations } from '@/src/types/api.types';
import { toastError } from '@/src/utils/toast.utils';
import { Loader } from '@/src/components/common/loader';

export default function ResultById() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const { data: meal, isLoading, isError } = useGetMealById(id as string);

    if (isApiError(meal)) {
        toastError('Error occurred while fetching this meal.');
        redirect('/search');
    }

    if (isError) {
        toastError('Error occurred while fetching this meal.');
        redirect('/search');
    }

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
                    {isLoading
                        ? <Loader isAbsolute={true} />
                        : <MealContainer complexMealObject={meal as DetailedMealWithTranslations} />
                    }
                    {!isLoading && !meal && <div>Meal has not been found.</div>}
                    {isError && <div>Error occurred.</div>}
                </div>
            </div>
            <Footer />
        </>
    );
}

function isApiError(meal: DetailedMealWithTranslations | undefined): boolean {
    return (meal as any)?.statusCode !== undefined;
}