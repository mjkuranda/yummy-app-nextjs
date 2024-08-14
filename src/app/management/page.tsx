import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';
import { Item, ItemList } from '@/src/app/management/item-list';
import styles from '@/styles/app/management/page.module.scss';

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
            <div className={styles['management-page']}>
                <ItemList list={userItems} header='Users' />
                <ItemList list={mealItems} header='Meals' />
            </div>
            <Footer />
        </>
    );
}