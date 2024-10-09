import styles from '@/styles/app/result/page.module.scss';
import { DetailedDish, DishRecipeSection } from '@/src/types/api.types';

interface DishRecipeProps {
    dish: DetailedDish;
    recipe?: DishRecipeSection[];
}

export function DishRecipe({ recipe }: DishRecipeProps) {
    if (!recipe || recipe.length === 0) {
        return (
            <div className={styles['instruction-section']}>
                <h5>Przepis:</h5>
                <p>Niesety, autor nie dostarczył żadnego przepisu dla tego posiłku.</p>
            </div>
        );
    }

    return (
        <div>
            {recipe && recipe.map(section => {
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