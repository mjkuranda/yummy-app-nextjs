import styles from '@/styles/app/result/page.module.scss';
import { DetailedMeal, MealRecipeSection } from '@/src/types/api.types';

interface MealRecipeProps {
    meal: DetailedMeal;
    recipe?: MealRecipeSection[];
}

export function MealRecipe({ meal, recipe }: MealRecipeProps) {
    const { recipeSections } = meal;

    return (
        <div>
            {recipeSections.length === 0
                ? 'Unfortunately, the author does not provide any recipe for this meal.'
                : recipeSections.map(section => {
                    return (
                        <div className={styles['instruction-section']}>
                            <h5>Przepis{section.name ? `na ${section.name}` : ''}:</h5>
                            <ol>
                                {section.steps.map((step, idx) => {
                                    // NOTE: Index is okay, because it's a static list
                                    return (
                                        <li key={idx}>{step}</li>
                                    );
                                })}
                            </ol>
                        </div>
                    );
                })}
        </div>
    );
}