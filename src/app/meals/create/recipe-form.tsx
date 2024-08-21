import styles from '@/styles/app/meals/create/recipe-form.module.scss';
import { Button } from '@/src/components/common/button';
import { RecipeSection } from '@/src/app/meals/create/recipe-section';
import { useRecipeFormContext } from '@/src/contexts/recipe-form.context';
import { createNewSection } from '@/src/helpers/recipe-form.helper';

export function RecipeForm() {
    const { sections, onChangeSections, error } = useRecipeFormContext();

    const onAddRecipe = () => {
        const newSection = createNewSection();
        onChangeSections([...sections, newSection]);
    };

    return (
        <div className={styles['recipe-form']}>
            <h4>Recipe</h4>
            {error?.message && <p className={styles['error-container']}>{error.message}</p>}
            <div className={styles['center-container']}>
                <Button label={'Add a new recipe'} onClick={onAddRecipe} />
            </div>
            <ul>
                {sections.map(section =>
                    <RecipeSection
                        key={section.id}
                        section={section}
                    />
                )}
            </ul>
        </div>
    );
}