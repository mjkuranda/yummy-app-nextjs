import styles from '@/styles/app/users/registration/page.module.scss';
import { RegistrationForm } from '@/src/app/users/registration/registration-form';
import { Footer } from '@/src/components/common/footer';
import { Header } from '@/src/components/common/header';
import { BackLinkBar } from '@/src/components/common/back-link-bar';

export default function RegistrationPage() {
    return (
        <div className={styles['registration-page']}>
            <Header />
            <div style={{ margin: '.5rem' }}>
                <BackLinkBar link="/users/login" label={'Powrót do logowania'} />
            </div>
            <RegistrationForm />
            <Footer />
        </div>
    );
}