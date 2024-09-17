import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';
import styles from '@/styles/app/manage/page.module.scss';
import { ItemContainer } from '@/src/app/manage/item-container';

export default function ManagementPage() {
    return (
        <>
            <Header />
            <div className={styles['manage-page']}>
                <ItemContainer />
            </div>
            <Footer />
        </>
    );
}