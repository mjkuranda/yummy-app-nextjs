import styles from '@/styles/app/result/page.module.scss';
import { DetailedMeal } from '@/src/types/api.types';

interface MealRecipeProps {
    meal: DetailedMeal;
}

export function MealRecipe({ meal }: MealRecipeProps) {
    const { recipeSections } = meal;

    return (
        <div>
            {recipeSections.length === 0
                ? 'Unfortunately, the author does not provide any recipe for this meal.'
                : recipeSections.map(section => {
                    return (
                        <div className={styles['instruction-section']}>
                            <h5>Przepis: {section.name || '-'}</h5>
                            <ol>
                                {section.steps.map(step => {
                                    return (
                                        <li key={step.number}>{step.step}</li>
                                    );
                                })}
                            </ol>
                        </div>
                    );
                })}
        </div>
    );
}