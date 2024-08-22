'use client';

import { MealRecipeSectionWithId, MealRecipeStepWithId } from '@/src/types/meal.types';
import { InputString } from '@/src/components/common/form/input-string';
import { useState } from 'react';
import { useRecipeFormContext } from '@/src/contexts/recipe-form.context';
import { removeSectionStep, updateSectionStep } from '@/src/helpers/recipe-form.helper';
import styles from '@/styles/app/meals/create/recipe-form.module.scss';
import { RemoveButton } from '@/src/components/common/remove-button';

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

    const onRemoveStep = () => {
        const modifiedSections = removeSectionStep(step.id, section, sections);

        onChangeSections(modifiedSections);
    };

    return (
        <li className={styles['recipe-section-step']}>
            <InputString label={'Type step instruction'} value={instructionStep} setValue={onChangeStep} />
            <RemoveButton label={'Remove'} onClick={onRemoveStep} />
        </li>
    );
}