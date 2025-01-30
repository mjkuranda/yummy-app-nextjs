import styles from '@/styles/app/manage/page.module.scss';
import { ItemContainer } from '@/src/app/manage/item-container';
import { WrappedContentLayout } from '@/src/components/common/layouts/wrapped-content-layout';

export default function ManagementPage() {
    return (
        <WrappedContentLayout>
            <div className={styles['manage-container']}>
                <ItemContainer />
            </div>
        </WrappedContentLayout>
    );
}