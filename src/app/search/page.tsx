import { Header } from '@/src/components/common/header';
import styles from '@/styles/app/search/page.module.scss';
import resultStyles from '@/styles/app/search/search-meal-result.module.scss';
import { Footer } from '@/src/components/common/footer';
import SearchIngredientCategory from '@/src/app/search/search-ingredient-category';
import { SearchForm } from '@/src/app/search/search-form';
import { Button } from '@/src/components/common/button';
import { MealResultBox } from '@/src/app/search/meal-result-box';

export default function Search() {
    return (
        <div id={styles['search-page']}>
            <Header />
            <SearchForm>
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
            </SearchForm>
            <div id={styles['meal-result-part']}>
                <MealResultBox />
                <section id={resultStyles['adder']}>
                    <div className="d-flex justify-content-center align-items-center">
                        <p>Brakuje szukanego posiłku? Dodaj go!</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <Button label={'Dodaj'} link={'/meals/add'} />
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}