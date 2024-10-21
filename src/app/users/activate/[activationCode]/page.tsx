import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';
import { ActivationContainer } from '@/src/app/users/activate/[activationCode]/activation-container';
import styles from '@/styles/app/not-found.module.scss';

export default function ActivationPage() {
    return (
        <div className={styles['not-found']}>
            <Header />
            <ActivationContainer />
            <Footer />
        </div>
    );
}