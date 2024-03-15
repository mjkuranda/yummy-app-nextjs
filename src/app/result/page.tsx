import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';
import { Meal } from '@/src/types/api.types';
import styles from '@/styles/app/result/page.module.scss';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Link from 'next/link';

export default function Result() {
    const meal: Meal = {
        _id: '1',
        title: 'Test1',
        description: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.',
        author: 'Unknown',
        ingredients: [
            { name: 'carrot', image: 'https://spoonacular.com/cdn/ingredients_100x100/carrot.jpg', amount: 1.0, unit: 'piece of', originalName: '1 carrot' },
            { name: 'apple', image: 'https://spoonacular.com/cdn/ingredients_100x100/apple.jpg', amount: 2.0, unit: 'large', originalName: '2 large apples' },
            { name: 'fish', image: 'https://spoonacular.com/cdn/ingredients_100x100/fish.jpg', amount: 3.0, unit: 'pieces of', originalName: '3 fish' }
        ]
    };
    const imgSrc = meal.imageUrl ? `/uploads/${meal.imageUrl}` : '/no-image.png';

    return (
        <>
            <Header />
            <div className={styles['result-page']}>
                <div className={styles['result-nav']}>
                    <Link href="{{sourceUrl}}">
                        <ArrowCircleLeftIcon />Wróć do wyszukiwania
                    </Link>
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
                                    <li className="d-flex justify-content-center align-items-center" key={ingredient.name}>
                                        <span>{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}</span>
                                        <img src={ingredient.image} alt={ingredient.name} />
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