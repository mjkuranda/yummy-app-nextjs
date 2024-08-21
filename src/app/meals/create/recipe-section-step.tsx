'use client';

import { MealRecipeSectionWithId, MealRecipeStepWithId } from '@/src/types/meal.types';
import { InputString } from '@/src/components/common/form/input-string';
import { ChangeEvent, useState } from 'react';
import { useRecipeFormContext } from '@/src/contexts/recipe-form.context';
import { updateSectionStep } from '@/src/helpers/recipe-form.helper';

interface RecipeSectionStepProps {
    section: MealRecipeSectionWithId;
    step: MealRecipeStepWithId;
}

export function RecipeSectionStep({ section, step }: RecipeSectionStepProps) {
    const { sections, onChangeSections } = useRecipeFormContext();
    const [instructionStep, setInstructionStep] = useState<string>('');

    const onChangeStep = (newValue: string): void => {
        const newStep: MealRecipeStepWithId = {
            id: step.id,
            text: newValue
        };
        const modifiedSections = updateSectionStep(section.id, newStep, sections);

        setInstructionStep(newValue);
        onChangeSections(modifiedSections);
    };

    return (
        <li>
            <InputString label={'Type step instruction'} value={instructionStep} setValue={onChangeStep} />
        </li>
    );
}