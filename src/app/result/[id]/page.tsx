'use client';

import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';
import styles from '@/styles/app/result/page.module.scss';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Link from 'next/link';
import { redirect, useParams, useSearchParams } from 'next/navigation';
import { useGetMealById } from '@/src/api/endpoints';
import { MealContainer } from '@/src/app/result/[id]/meal-container';
import { Meal } from '@/src/types/api.types';

export default function ResultById() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const { data: meal, isLoading, isError } = useGetMealById(id as string);

    if (isApiError(meal)) {
        redirect('/search');
    }

    if (isError) {
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
                        ? 'Loading...'
                        : <MealContainer meal={meal as Meal} />
                    }
                    {!isLoading && !meal && <div>Meal has not been found.</div>}
                    {isError && <div>Error occurred.</div>}
                </div>
            </div>
            <Footer />
        </>
    );
}

function isApiError(meal: Meal | undefined): boolean {
    return (meal as any)?.statusCode !== undefined;
}