import { Header } from '@/src/components/common/header';
import styles from '@/styles/app/search/page.module.scss';
import resultStyles from '@/styles/app/search/search-meal-result.module.scss';
import { Footer } from '@/src/components/common/footer';
import SearchIngredientCategory from '@/src/app/search/search-ingredient-category';
import { MealResult } from '@/src/types/api.types';
import { SearchMealResult } from '@/src/app/search/search-meal-result';

export default function Search() {
    const meals: MealResult[] = [
        { _id: '1', title: 'Test1', description: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.' },
        { _id: '2', title: 'Test2', description: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.' },
        { _id: '3', title: 'Test3', description: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.' }
    ];

    return (
        <div id={styles['search-page']}>
            <Header />
            <form>
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
                <div className="d-flex justify-content-center align-items-center mt-3 mb-5">
                    <button type="submit">Szukaj</button>
                </div>
            </form>
            <div id={styles['meal-result-part']}>
                <section className={resultStyles['result-box']}>
                    {meals.map(meal => {
                        return <SearchMealResult meal={meal} key={meal._id} />;
                    })}
                </section>
                <section id={resultStyles['adder']}>
                    <div className="d-flex justify-content-center align-items-center">
                        <p>Brakuje szukanego posiłku? Dodaj go!</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        {/*<button onClick="move('/meals/add')">Dodaj</button>*/}
                        <button>Dodaj</button>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}