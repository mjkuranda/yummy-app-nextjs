import { MealResultImage } from '@/src/app/result/[id]/meal-result-image';
import styles from '@/styles/app/result/page.module.scss';
import { Meal } from '@/src/types/api.types';

interface MealContainerProps {
    meal: Meal;
}

export function MealContainer({ meal }: MealContainerProps) {
    return (
        <>
            <MealResultImage imgUrl={meal.imgUrl} title={meal.title} />
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
                    <p dangerouslySetInnerHTML={{ __html: meal.description }} />
                    <div>
                        {meal.instruction.map(el => {
                            return (
                                <div className={styles['instruction-section']}>
                                    <h5>Przepis: {el.name || '-'}</h5>
                                    <ol>
                                        {el.steps.map(step => {
                                            return (
                                                <li>{step.step}</li>
                                            );
                                        })}
                                    </ol>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className={styles['result-ingredients']}>
                <h3>Składniki</h3>
                <ul>
                    {meal.ingredients.map(ingredient => {
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
    );
}