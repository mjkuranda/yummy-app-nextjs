import { WrappedContentLayout } from '@/src/components/common/layouts/wrapped-content-layout';
import { LoginContainer } from '@/src/app/users/login/login-container';
import styles from '@/styles/app/users/login/page.module.scss';

export default function LoginPage() {
    return (
        <WrappedContentLayout>
            <div className={styles['login-box']}>
                <div className={styles['login-box__form-container']}>
                    <LoginContainer />
                </div>
                <div className={styles['login-box__img-container']}>
                    <img src="/login.jpg" alt="Man logging in" />
                </div>
            </div>
        </WrappedContentLayout>
    );
}