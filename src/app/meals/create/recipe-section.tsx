'use client';

import styles from '@/styles/app/meals/create/recipe-form.module.scss';
import { MealRecipeSectionWithId } from '@/src/types/meal.types';
import { InputString } from '@/src/components/common/form/input-string';
import { useState } from 'react';
import { useRecipeFormContext } from '@/src/contexts/recipe-form.context';
import {
    createNewRecipeStep,
    removeSection,
    updateSectionName,
    updateSectionStep
} from '@/src/helpers/recipe-form.helper';
import { RecipeSectionStep } from '@/src/app/meals/create/recipe-section-step';
import { AddButton } from '@/src/components/common/add-button';
import { RemoveButton } from '@/src/components/common/remove-button';

interface RecipeSectionProps {
    section: MealRecipeSectionWithId;
}

export function RecipeSection({ section }: RecipeSectionProps) {
    const { sections, onChangeSections } = useRecipeFormContext();
    const [name, setName] = useState<string>('');

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
                <InputString label={'Section name'} value={name} setValue={setValue} />
                <RemoveButton label={'Remove'} onClick={onRemoveSection} />
            </div>
            <ol>
                {section.steps.map(step => <RecipeSectionStep key={step.id} step={step} section={section} />)}
            </ol>
            <AddButton label={'Add the next step'} onClick={onAddStep} />
        </li>
    );
}