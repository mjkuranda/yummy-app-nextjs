import styles from '@/styles/app/dishes/[id]/page.module.scss';
import { DetailedDish } from '@/src/types/api.types';
import { useGetDishRecipe } from '@/src/api/endpoints';
import { Loader } from '@/src/components/common/loader';
import { useDishDetailsContext } from '@/src/contexts/dish-details.context';

interface DishRecipeProps {
    dish: DetailedDish;
}

export function DishRecipe({ dish }: DishRecipeProps) {
    const { language } = useDishDetailsContext();
    const { data: recipe, isLoading, isError } = useGetDishRecipe(dish.id, language);

    if (isError) {
        return <div>Wystąpił błąd w uzyskaniu przepisu. Spróbuj ponownie później.</div>;
    }

    if (isLoading) {
        return <Loader />;
    }

    if (!recipe) {
        return <Loader />;
    }

    if (recipe.sections.length === 0) {
        return (
            <div className={styles['instruction-section']}>
                <h5>Przepis:</h5>
                <p>Niestety, autor nie dostarczył żadnego przepisu dla tego posiłku.</p>
            </div>
        );
    }

    return (
        <div>
            {recipe && recipe.sections.map(section => {
                return (
                    <div key={section.name ?? 'x'} className={styles['instruction-section']}>
                        <h5>{section.name ? section.name : 'Przepis'}:</h5>
                        <ol>
                            {section.steps.map((step, idx) => {
                                // NOTE: Index is okay, because it's a static list
                                return (
                                    <li key={`${section.name ?? 'x'}-${idx}`}>{step}</li>
                                );
                            })}
                        </ol>
                    </div>
                );
            })}
        </div>
    );
}