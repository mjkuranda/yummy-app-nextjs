import styles from '@/styles/app/meals/create/recipe-form.module.scss';
import { Button } from '@/src/components/common/button';
import { RecipeSection } from '@/src/app/meals/create/recipe-section';
import { useRecipeFormContext } from '@/src/contexts/recipe-form.context';
import { createNewSection } from '@/src/helpers/recipe-form.helper';
import { ErrorMessage } from '@/src/components/common/error-message';

export function RecipeForm() {
    const { sections, onChangeSections, error } = useRecipeFormContext();

    const onAddRecipe = () => {
        const newSection = createNewSection();
        onChangeSections([...sections, newSection]);
    };

    return (
        <div className={styles['recipe-form']}>
            <h4>Recipe</h4>
            <ErrorMessage error={error} />
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