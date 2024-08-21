import styles from '@/styles/app/meals/create/page.module.scss';
import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';
import { CreateMealForm } from '@/src/app/meals/create/create-meal-form';
import { BackLink } from '@/src/components/common/back-link';

export default function CreateMealPage() {
    return (
        <>
            <Header />
            <div className={styles['create-meal-page']}>
                <BackLink link="/search" label={'Back to search'} />
                <CreateMealForm />
            </div>
            <Footer />
        </>
    );
}