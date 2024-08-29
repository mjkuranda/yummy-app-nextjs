import { MealFormData, MealRecipeSectionWithId, MealRecipeStepWithId } from '@/src/types/meal.types';
import { IngredientWithoutImage, Language, MealRecipeSection, NewMealDto } from '@/src/types/api.types';

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

export function removeSection(sectionId: string, sections: MealRecipeSectionWithId[]): MealRecipeSectionWithId[] {
    return sections.filter(section => section.id !== sectionId);
}

export function removeSectionStep(stepId: string, section: MealRecipeSectionWithId, sections: MealRecipeSectionWithId[]): MealRecipeSectionWithId[] {
    return sections.map(sectionElement => {
        if (sectionElement.id !== section.id) {
            return sectionElement;
        }

        return {
            ...section,
            steps: section.steps.filter(step => step.id !== stepId)
        };
    });
}

export function proceedFormToData(formData: MealFormData, author: string, language: Language, imgUrl?: string): NewMealDto {
    const { title, description, ingredients, type, recipe, imageUrl } = formData;
    const mealIngredients: IngredientWithoutImage[] = ingredients.map(ingredient => {
        return {
            id: ingredient.data.id,
            name: ingredient.data.en,
            amount: Number(ingredient.amount),
            unit: ingredient.unit
        };
    });
    const recipeSections: MealRecipeSection[] = recipe.map(section => {
        return {
            name: section.name,
            steps: section.steps.map(step => step.text)
        };
    });

    return {
        title,
        description,
        author,
        language,
        type,
        recipeSections,
        ingredients: mealIngredients,
        posted: Date.now(),
        provider: 'yummy',
        ...((imgUrl || imageUrl) && { imageUrl: imgUrl ?? imageUrl })
    };
}