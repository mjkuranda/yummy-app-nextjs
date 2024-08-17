import styles from '@/styles/app/users/registration/page.module.scss';
import { RegistrationForm } from '@/src/app/users/registration/registration-form';
import { Footer } from '@/src/components/common/footer';

export default function RegistrationPage() {
    return (
        <div className={styles['registration-page']}>
            <RegistrationForm />
            <Footer />
        </div>
    );
}