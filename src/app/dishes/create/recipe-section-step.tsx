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
            'Dodaj 100 g masła i 2 łyżki cukru pudru do miski',
            // 'Wymieszaj wszystko dokładnie przez 2 minuty.',
            // 'Dodaj marchewkę i pietruszkę, duś przez 10 minut, przypraw. Wlej szklankę cukru, gotuj jeszcze kwadrans. Dodaj jabłko, duś jeszcze 10 minut.',
            // 'Do miski wsyp mąkę, cukier puder i proszek do pieczenia.',
            // 'Dodaj masło i posiekaj składniki nożem aż do uzyskania konsystencji kruszonki.',
            // 'Wbij jajko i zagnieć ciasto.',
            // 'Uformuj kulę, zawiń w folię spożywczą i włóż do lodówki na 30 minut.',
            // 'Rozwałkuj ciasto na oprószonym mąką blacie.',
            // 'Wylep ciastem formę do tarty i ponakłuwaj spód widelcem.',
            // 'Piecz w piekarniku nagrzanym do 180°C przez 20 minut.',
            // 'W międzyczasie przygotuj krem: utrzyj mascarpone z cukrem pudrem i dodaj śmietankę.',
            // 'Na ostudzony spód wyłóż krem i udekoruj świeżymi owocami.',
            // 'Wstaw tartę do lodówki na minimum godzinę przed podaniem.',
            // 'Na patelni rozgrzej oliwę z oliwek i podsmaż cebulę oraz czosnek.',
            // 'Dodaj pokrojoną w kostkę paprykę, cukinię oraz bakłażana. Smaż przez 10 minut.',
            // 'Wsyp przyprawy: kumin, kolendrę, słodką paprykę i szczyptę chili.',
            // 'Dodaj puszkę ciecierzycy oraz passatę pomidorową. Gotuj na małym ogniu przez 15 minut.',
            // 'Dopraw do smaku solą, pieprzem i odrobiną cukru trzcinowego.',
            // 'Pod koniec gotowania dodaj garść świeżej bazylii i natki pietruszki.',
            // 'Ugotuj kaszę bulgur zgodnie z instrukcją na opakowaniu.',
            // 'Na talerz wyłóż porcję kaszy, a na nią warzywa z sosem.',
            // 'Na wierzch połóż łyżkę jogurtu greckiego i posyp prażonymi pestkami dyni.',
            // 'Podawaj udekorowane świeżą miętą i skropione sokiem z cytryny.'
        ]) {
            // console.time(stepText);
            const result = parseStep(stepText, translations);
            console.log(stepText, JSON.stringify(result));
            // console.log(stepText, result);
            // console.timeEnd(stepText);
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