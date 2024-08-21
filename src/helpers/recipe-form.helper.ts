import { MealRecipeSectionWithId, MealRecipeStepWithId } from '@/src/types/meal.types';

export function createNewSection(): MealRecipeSectionWithId {
    return {
        id: crypto.randomUUID(),
        name: '',
        steps: []
    };
}

export function updateSectionName(id: string, newName: string, sections: MealRecipeSectionWithId[]): MealRecipeSectionWithId[] {
    const modifiedSections = [...sections];

    for (const section of modifiedSections) {
        if (section.id === id) {
            section.name = newName;

            return modifiedSections;
        }
    }

    return modifiedSections;
}

export function createNewRecipeStep(): MealRecipeStepWithId {
    return {
        id: crypto.randomUUID(),
        text: ''
    };
}

export function updateSectionStep(id: string, step: MealRecipeStepWithId, sections: MealRecipeSectionWithId[], isNew?: boolean): MealRecipeSectionWithId[] {
    const modifiedSections = [...sections];

    for (const section of modifiedSections) {
        if (section.id === id) {
            if (isNew) {
                section.steps.push(step);

                continue;
            }

            section.steps = section.steps.map(_step => {
                if (_step.id === step.id) {
                    return {
                        id: step.id,
                        text: step.text
                    };
                }

                return _step;
            });
        }
    }

    return modifiedSections;
}