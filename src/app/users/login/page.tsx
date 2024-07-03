import { Footer } from '@/src/components/common/footer';
import styles from '@/styles/app/users/login/page.module.scss';
import { LoginForm } from '@/src/app/users/login/login-form';

export default function LoginPage() {
    return (
        <div className={styles['login-page']}>
            <LoginForm />
            <Footer />
        </div>
    );
}