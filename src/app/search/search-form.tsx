'use client';

import styles from '@/styles/app/search/page.module.scss';
// import { Button } from '@/src/components/common/button';
import { FormEvent } from 'react';
import { getSearchFormData } from '@/src/utils/search-form.utils';

export function SearchForm({ children }) {
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { ingredients } = getSearchFormData(e);
        console.log('Ingredients:', ingredients);
    };

    return (
        <form onSubmit={onSubmit}>
            <div id={styles['search-query-part']}>
                {children}
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3 mb-5">
                {/*<Button label={'Szukaj'} type="submit" />*/}
                <button type='submit'>Szukaj</button>
            </div>
        </form>
    );
}