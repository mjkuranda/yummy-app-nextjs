'use client';

import { DishRecipeSectionWithId, DishRecipeStepWithId } from '@/src/types/dish.types';
import { DebounceInputString } from '@/src/components/common/form/input-string';
import { useState } from 'react';
import { useRecipeFormContext } from '@/src/contexts/recipe-form.context';
import { removeSectionStep, updateSectionStep } from '@/src/helpers/recipe-form.helper';
import styles from '@/styles/app/dishes/create/recipe-form.module.scss';
import { RemoveButton } from '@/src/components/common/buttons/remove-button';
import { parseStep } from '@/src/utils/recipe.utils';

interface RecipeSectionStepProps {
    section: DishRecipeSectionWithId;
    step: DishRecipeStepWithId;
}

export function RecipeSectionStep({ section, step }: RecipeSectionStepProps) {
    const { translations, sections, onChangeSections } = useRecipeFormContext();
    const [instructionStep, setInstructionStep] = useState<string>(step.text ?? '');

    const onChangeStep = (newValue: string): void => {
        const newStep: DishRecipeStepWithId = {
            id: step.id,
            text: newValue
        };
        const modifiedSections = updateSectionStep(section.id, newStep, sections);

        const parsedStepResult = parseStep(newValue, translations);

        // TODO: The problem is that `cukru pudru` does not exist. The algorithm compares the actual text to its language occurrence...
        for (const stepText of [
            'Dodaj 100 g masło i 2 łyżki cukru pudru do miski',
            'Wymieszaj wszystko dokładnie przez 2 minuty.',
            'Dodaj marchew i pietruszkę, duś przez 10 minut, przypraw. Wlej szklankę cukru, gotuj jeszcze kwadrans. Dodaj jabłko, duś jeszcze 10 minut.'
        ]) {
            console.time(stepText);
            const result = parseStep(stepText, translations);
            console.log(stepText, JSON.stringify(result));
            console.timeEnd(stepText);
        }

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
                <DebounceInputString
                    label={'Wpisz, co należy wykonać w tym kroku'}
                    value={instructionStep}
                    setValue={onChangeStep}
                    width={'670px'}
                    minLength={2}
                    debounceTimeout={300}
                />
                <RemoveButton label={'Usuń'} onClick={onRemoveStep} />
            </div>
        </li>
    );
}