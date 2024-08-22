'use client';

import { MealRecipeSectionWithId } from '@/src/types/meal.types';
import { InputString } from '@/src/components/common/form/input-string';
import { useState } from 'react';
import { useRecipeFormContext } from '@/src/contexts/recipe-form.context';
import { createNewRecipeStep, updateSectionName, updateSectionStep } from '@/src/helpers/recipe-form.helper';
import { RecipeSectionStep } from '@/src/app/meals/create/recipe-section-step';
import { AddButton } from '@/src/components/common/add-button';

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

    return (
        <li>
            <InputString label={'Section name'} value={name} setValue={setValue} />
            <ol>
                {section.steps.map(step => <RecipeSectionStep key={step.id} step={step} section={section} />)}
            </ol>
            <AddButton label={'Add recipe step'} onClick={onAddStep} />
        </li>
    );
}