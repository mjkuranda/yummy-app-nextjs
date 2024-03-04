import { Header } from '@/src/components/common/header';
import styles from '@/styles/app/search/page.module.scss';
import { Footer } from '@/src/components/common/footer';
import SearchIngredientCategory from '@/src/app/search/search-ingredient-category';

export default function Search() {
    return (
        <div id={styles['search-page']}>
            <Header />
            <div id={styles['search-query-part']}>
                <SearchIngredientCategory category="breads" />
                <SearchIngredientCategory category="dairy-and-eggs" />
                <SearchIngredientCategory category="fish-and-seafood" />
                <SearchIngredientCategory category="fruits" />
                <SearchIngredientCategory category="meats" />
                <SearchIngredientCategory category="oils-and-fats" />
                <SearchIngredientCategory category="pasta" />
                <SearchIngredientCategory category="seeds-and-nuts" />
                <SearchIngredientCategory category="spices" />
                <SearchIngredientCategory category="vegetables" />
            </div>
            <div id={styles['meal-result-part']}>Meal results</div>
            <Footer />
        </div>
    );
}