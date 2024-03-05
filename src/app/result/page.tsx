import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';
import { Meal } from '@/src/types/api.types';
import styles from '@/styles/app/result/page.module.scss';

export default function Result() {
    const meal: Meal = {
        _id: '1',
        title: 'Test1',
        description: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.',
        author: 'Unknown',
        ingredients: ['carrot', 'apple', 'fish']
    };
    const imgSrc = meal.imageUrl ? `/uploads/${meal.imageUrl}` : '/no-image.png';

    return (
        <>
            <Header />
            <div className={styles['result-page']}>
                <div className={styles['result-nav']}>
                    <a href="{{sourceUrl}}"><i className="fa fa-chevron-circle-left"></i>Wróć do wyszukiwania</a>
                </div>
                <div className={styles['result-container']}>
                    <div className={styles['result-image']}>
                        <img src={imgSrc} alt="Zdjęcie posiłku o nazwie {{meal.title}}" />
                    </div>
                    <div className={styles['result-details']}>
                        <ul>
                            <li>
                                <h3>{meal.title}</h3>
                            </li>
                            <li>
                                <h4>Wyświetlono X razy</h4>
                            </li>
                            <li>
                                <h4>Wybrano X razy</h4>
                            </li>
                        </ul>
                        <div>
                            <p>{meal.description}</p>
                        </div>
                    </div>
                    <div className={styles['result-ingredients']}>
                        <h3>Składniki</h3>
                        <ul>
                            {meal.ingredients.map(ingredient => {
                                return (
                                    <li className="flex-center" key={ingredient}>
                                        {/*<img*/}
                                        {/*    className="icon"*/}
                                        {/*    src="../{{ing.icon.src}}"*/}
                                        {/*    alt="'{{ing.icon.name}}' ingredient image"*/}
                                        {/*    author="{{ing.icon.link}}"*/}
                                        {/*></img>*/}
                                        <span>{ingredient}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}