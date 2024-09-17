import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';
import { Item, ItemList } from '@/src/app/manage/item-list';
import styles from '@/styles/app/manage/page.module.scss';

export default function ManagementPage() {
    const userItems: Item[] = [
        { link: 'users/not-activated', text: 'Not activated accounts' }
    ];

    const mealItems: Item[] = [
        { link: 'meals/added', text: 'Added meals' },
        { link: 'meals/edited', text: 'Edited meals' },
        { link: 'meals/deleted', text: 'Deleted meals' }
    ];

    return (
        <>
            <Header />
            <div className={styles['manage-page']}>
                <ItemList list={userItems} header='Users' />
                <ItemList list={mealItems} header='Meals' />
            </div>
            <Footer />
        </>
    );
}