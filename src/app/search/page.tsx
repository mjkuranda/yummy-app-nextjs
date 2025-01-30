import styles from '@/styles/app/search/page.module.scss';
import resultStyles from '@/styles/app/search/search-dish-result.module.scss';
import SearchIngredientCategory from '@/src/app/search/search-ingredient-category';
import { SearchForm } from '@/src/app/search/search-form';
import { DishResultBox } from '@/src/app/search/dish-result-box';
import Link from 'next/link';
import { WrappedContentLayout } from '@/src/components/common/layouts/wrapped-content-layout';

export default function Search() {
    return (
        <WrappedContentLayout>
            <SearchForm>
                <SearchIngredientCategory category="breads" />
                <SearchIngredientCategory category="cereal-products" />
                <SearchIngredientCategory category="dairy-and-eggs" />
                <SearchIngredientCategory category="fish-and-seafood" />
                <SearchIngredientCategory category="fruits" />
                <SearchIngredientCategory category="meats" />
                <SearchIngredientCategory category="mushrooms" />
                <SearchIngredientCategory category="oils-and-fats" />
                <SearchIngredientCategory category="pasta" />
                <SearchIngredientCategory category="seeds-and-nuts" />
                <SearchIngredientCategory category="spices" />
                <SearchIngredientCategory category="vegetables" />
            </SearchForm>
            <div id={styles['dish-result-part']}>
                <DishResultBox />
                <section id={resultStyles['adder']}>
                    <div className="d-flex justify-content-center align-items-center">
                        <p className="text-center">
                            Możesz również <Link href={'/dishes/create'}>utworzyć</Link> całkiem nowe danie,<br />
                            niezwiązane z obecnym wyszukiwaniem,<br />
                            dodając do bazy dań, by inni mogli wyszukać je w przyszłości.
                        </p>
                    </div>
                </section>
            </div>
        </WrappedContentLayout>
    );
}