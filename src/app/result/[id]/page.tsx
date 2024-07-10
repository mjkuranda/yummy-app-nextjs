'use client';

import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';
import styles from '@/styles/app/result/page.module.scss';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useGetMealById } from '@/src/api/endpoints';
import { MealResultImage } from '@/src/app/result/[id]/meal-result-image';

export default function ResultById() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const { data: meal, isLoading, isError } = useGetMealById(id as string);

    return (
        <>
            <Header />
            <div className={styles['result-page']}>
                <div className={styles['result-nav']}>
                    <Link href={searchParams.get('sourceUrl') ?? '/search'}>
                        <ArrowCircleLeftIcon />Wróć do wyszukiwania
                    </Link>
                </div>
                <div className={styles['result-container']}>
                    {isLoading
                        ? 'Loading...'
                        : (
                            <>
                                <MealResultImage imgUrl={meal?.imgUrl} title={meal?.title} />
                                <div className={styles['result-details']}>
                                    <ul>
                                        <li>
                                            <h3>{meal?.title}</h3>
                                        </li>
                                        <li>
                                            <h4>Wyświetlono X razy</h4>
                                        </li>
                                        <li>
                                            <h4>Wybrano X razy</h4>
                                        </li>
                                    </ul>
                                    <div>
                                        <p>{meal?.description}</p>
                                    </div>
                                </div>
                                <div className={styles['result-ingredients']}>
                                    <h3>Składniki</h3>
                                    <ul>
                                        {meal?.ingredients.map(ingredient => {
                                            return (
                                                <li className={`d-flex justify-content-center align-items-center ${styles['result-ingredient']}`}
                                                    key={ingredient.name}>
                                                    <img className={styles['result-ingredient__image']} src={ingredient.imageUrl}
                                                        alt={ingredient.name} />
                                                    <span
                                                        className={styles['result-ingredient__text']}>{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </>
                        )
                    }
                    {!isLoading && !meal && <div>Meal has not been found.</div>}
                    {isError && <div>Error occurred.</div>}
                </div>
            </div>
            <Footer />
        </>
    );
}