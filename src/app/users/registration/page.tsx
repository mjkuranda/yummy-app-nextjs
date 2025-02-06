import { WrappedContentLayout } from '@/src/components/common/layouts/wrapped-content-layout';
import { RegistrationContainer } from '@/src/app/users/registration/registration-container';
import styles from '@/styles/app/users/registration/page.module.scss';

export default function RegistrationPage() {
    return (
        <WrappedContentLayout>
            <div className={styles['registration-box']}>
                <div className={styles['registration-box__form-container']}>
                    <RegistrationContainer />
                </div>
                <div className={styles['registration-box__img-container']}>
                    <img src="/register.jpg" alt="People united by food" />
                </div>
            </div>
        </WrappedContentLayout>
    );
}