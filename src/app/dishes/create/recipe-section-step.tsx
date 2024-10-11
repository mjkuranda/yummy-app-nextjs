'use client';

import { DishRecipeSectionWithId, DishRecipeStepWithId } from '@/src/types/dish.types';
import { InputString } from '@/src/components/common/form/input-string';
import { useState } from 'react';
import { useRecipeFormContext } from '@/src/contexts/recipe-form.context';
import { removeSectionStep, updateSectionStep } from '@/src/helpers/recipe-form.helper';
import styles from '@/styles/app/dishes/create/recipe-form.module.scss';
import { RemoveButton } from '@/src/components/common/remove-button';

interface RecipeSectionStepProps {
    section: DishRecipeSectionWithId;
    step: DishRecipeStepWithId;
}

export function RecipeSectionStep({ section, step }: RecipeSectionStepProps) {
    const { sections, onChangeSections } = useRecipeFormContext();
    const [instructionStep, setInstructionStep] = useState<string>(step.text ?? '');

    const onChangeStep = (newValue: string): void => {
        const newStep: DishRecipeStepWithId = {
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
            <div className={styles['step-container']}>
                <InputString label={'Wpisz co należy wykonać w tym kroku'} value={instructionStep} setValue={onChangeStep} width={'330px'} />
                <RemoveButton label={'Usuń'} onClick={onRemoveStep} />
            </div>
        </li>
    );
}