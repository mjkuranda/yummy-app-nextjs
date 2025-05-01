'use client';

import styles from '@/styles/app/dishes/[id]/page.module.scss';
import { useParams, useSearchParams } from 'next/navigation';
import { DishContainer } from '@/src/app/dishes/[id]/dish-container';
import { decodeSearchQuery } from '@/src/helpers/query.helper';
import { EncodedUrlQuery } from '@/src/types/search.types';
import { WrappedContentLayout } from '@/src/components/common/layouts/wrapped-content-layout';
import { BackLinkBar } from '@/src/components/common/back-link-bar';
import { PagePathname } from '@/src/constants/strings.constants';
import { DishDetailsProvider } from '@/src/contexts/dish-details.context';

export default function DishById() {
    const { id } = useParams();
    const searchParams = useSearchParams();

    const linkHref = (typeof searchParams.get('sourceUrl') === 'string' ? `/search?${decodeSearchQuery(searchParams.get('sourceUrl') as EncodedUrlQuery)}` : '/search') as PagePathname;

    return (
        <WrappedContentLayout>
            <div className={styles['result-page']}>
                <BackLinkBar link={linkHref} label={'Wróć do wyszukiwania'} onlyMarginBottom={true} />
                <div className={styles['result-container']}>
                    <DishDetailsProvider>
                        <DishContainer dishId={id as string} sourceUrl={searchParams.get('sourceUrl')} />
                    </DishDetailsProvider>
                </div>
            </div>
        </WrappedContentLayout>
    );
}