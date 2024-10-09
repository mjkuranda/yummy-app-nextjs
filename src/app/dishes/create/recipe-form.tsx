import styles from '@/styles/app/dishes/create/recipe-form.module.scss';
import { RecipeSection } from '@/src/app/dishes/create/recipe-section';
import { useRecipeFormContext } from '@/src/contexts/recipe-form.context';
import { createNewSection } from '@/src/helpers/recipe-form.helper';
import { ErrorMessage } from '@/src/components/common/error-message';
import { AddButton } from '@/src/components/common/add-button';

export function RecipeForm() {
    const { sections, onChangeSections, error } = useRecipeFormContext();

    const onAddSection = () => {
        const newSection = createNewSection();
        onChangeSections([...sections, newSection]);
    };

    return (
        <div className={styles['recipe-form']}>
            <h4>Recipe</h4>
            <ErrorMessage error={error} />
            <div className={styles['center-container']}>
                <AddButton label={'Add a new section'} onClick={onAddSection} />
            </div>
            <ul className={styles['recipe-section']}>
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