import styles from '@/styles/app/users/password/page.module.scss';
import { Footer } from '@/src/components/common/footer';
import { ResetPasswordContainer } from '@/src/app/users/password/reset-password-container';

export function ResetPasswordPage() {
    return (
        <div className={styles['reset-password-page']}>
            <ResetPasswordContainer />
            <Footer />
        </div>
    );
}