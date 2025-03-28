import styles from '@/styles/app/dishes/create/recipe-form.module.scss';
import { RecipeSection } from '@/src/app/dishes/create/recipe-section';
import { useRecipeFormContext } from '@/src/contexts/recipe-form.context';
import { createNewSection } from '@/src/helpers/recipe-form.helper';
import { ErrorMessage } from '@/src/components/common/error-message';
import { AddButton } from '@/src/components/common/buttons/add-button';

export function RecipeForm() {
    const { sections, onChangeSections, error } = useRecipeFormContext();

    const onAddSection = () => {
        const newSection = createNewSection();
        onChangeSections([...sections, newSection]);
    };

    return (
        <div className={styles['recipe-form']}>
            <h4>Przepis</h4>
            <ErrorMessage error={error} />
            <div className={styles['center-container']}>
                <AddButton label={'Dodaj nowy przepis'} onClick={onAddSection} />
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