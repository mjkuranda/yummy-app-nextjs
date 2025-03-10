'use client';

import styles from '@/styles/app/dishes/[id]/page.module.scss';
import { redirect, useParams, useSearchParams } from 'next/navigation';
import { useGetDishById } from '@/src/api/endpoints';
import { DishContainer } from '@/src/app/dishes/[id]/dish-container';
import { DetailedDishWithTranslations } from '@/src/types/api.types';
import { toastError } from '@/src/utils/toast.utils';
import { Loader } from '@/src/components/common/loader';
import { useEffect } from 'react';
import { decodeSearchQuery } from '@/src/helpers/query.helper';
import { EncodedUrlQuery } from '@/src/types/search.types';
import { WrappedContentLayout } from '@/src/components/common/layouts/wrapped-content-layout';
import { BackLinkBar } from '@/src/components/common/back-link-bar';
import { PagePathname } from '@/src/constants/strings';

export default function DishById() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const { data: dish, isLoading, isError, error } = useGetDishById(id as string);

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

    const linkHref = (typeof searchParams.get('sourceUrl') === 'string' ? `/search?${decodeSearchQuery(searchParams.get('sourceUrl') as EncodedUrlQuery)}` : '/search') as PagePathname;

    return (
        <WrappedContentLayout>
            <div className={styles['result-page']}>
                <BackLinkBar link={linkHref} label={'Wróć do wyszukiwania'} onlyMarginBottom={true} />
                <div className={styles['result-container']}>
                    {isLoading || isError
                        ? <Loader isAbsolute={true} />
                        : <DishContainer complexDishObject={dish as DetailedDishWithTranslations} sourceUrl={searchParams.get('sourceUrl')} />
                    }
                    {!isLoading && !dish && <div>Danie nie zostało znalezione.</div>}
                    {isError && <div>Wystąpił błąd.</div>}
                </div>
            </div>
        </WrappedContentLayout>
    );
}

function isApiError(dish: DetailedDishWithTranslations | undefined): boolean {
    return (dish as any)?.statusCode !== undefined;
}