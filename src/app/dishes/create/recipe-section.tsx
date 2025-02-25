'use client';

import styles from '@/styles/app/dishes/create/recipe-form.module.scss';
import { DishRecipeSectionWithId } from '@/src/types/dish.types';
import { InputString } from '@/src/components/common/form/input-string';
import { useState } from 'react';
import { useRecipeFormContext } from '@/src/contexts/recipe-form.context';
import {
    createNewRecipeStep,
    removeSection,
    updateSectionName,
    updateSectionStep
} from '@/src/helpers/recipe-form.helper';
import { RecipeSectionStep } from '@/src/app/dishes/create/recipe-section-step';
import { AddButton } from '@/src/components/common/buttons/add-button';
import { RemoveButton } from '@/src/components/common/buttons/remove-button';

interface RecipeSectionProps {
    section: DishRecipeSectionWithId;
}

export function RecipeSection({ section }: RecipeSectionProps) {
    const { sections, onChangeSections } = useRecipeFormContext();
    const [name, setName] = useState<string>(section.name ?? '');

    const setValue = (newValue: string): void => {
        const modifiedSections = updateSectionName(section.id, newValue, sections);

        setName(newValue);
        onChangeSections(modifiedSections);
    };

    const onAddStep = () => {
        const newStep = createNewRecipeStep();
        const modifiedSections = updateSectionStep(section.id, newStep, sections, true);

        onChangeSections(modifiedSections);
    };

    const onRemoveSection = () => {
        const modifiedSections = removeSection(section.id, sections);

        onChangeSections(modifiedSections);
    };

    return (
        <li>
            <div className={styles['section-name-container']}>
                <InputString label={'Etykieta przepisu'} value={name} setValue={setValue} width="50%" />
                <RemoveButton label={'Usuń'} onClick={onRemoveSection} />
            </div>
            <ol style={{ marginTop: '16px' }}>
                {section.steps.map(step => <RecipeSectionStep key={step.id} step={step} section={section} />)}
            </ol>
            <AddButton label={'Dodaj nowy krok'} onClick={onAddStep} />
        </li>
    );
}