import { Header } from '@/src/components/common/header';
import styles from '@/styles/app/search/page.module.scss';

export default function Search() {
    return (
        <div id={styles['search-page']}>
            <Header />
            <div id={styles['search-query-part']}>Query</div>
            <div id={styles['meal-result-part']}>Result</div>
        </div>
    );
}