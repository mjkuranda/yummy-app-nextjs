import { DishFormData, DishRecipeSectionWithId, DishRecipeStepWithId } from '@/src/types/dish.types';
import { IngredientWithoutImage, Language, DishRecipeSection, NewDishDto } from '@/src/types/api.types';

export function createNewSection(): DishRecipeSectionWithId {
    return {
        id: crypto.randomUUID(),
        name: '',
        steps: []
    };
}

export function updateSectionName(id: string, newName: string, sections: DishRecipeSectionWithId[]): DishRecipeSectionWithId[] {
    const modifiedSections = [...sections];

    for (const section of modifiedSections) {
        if (section.id === id) {
            section.name = newName;

            return modifiedSections;
        }
    }

    return modifiedSections;
}

export function createNewRecipeStep(): DishRecipeStepWithId {
    return {
        id: crypto.randomUUID(),
        text: ''
    };
}

export function updateSectionStep(id: string, step: DishRecipeStepWithId, sections: DishRecipeSectionWithId[], isNew?: boolean): DishRecipeSectionWithId[] {
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

export function removeSection(sectionId: string, sections: DishRecipeSectionWithId[]): DishRecipeSectionWithId[] {
    return sections.filter(section => section.id !== sectionId);
}

export function removeSectionStep(stepId: string, section: DishRecipeSectionWithId, sections: DishRecipeSectionWithId[]): DishRecipeSectionWithId[] {
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

export function proceedFormToData(formData: DishFormData, author: string, language: Language, imgUrl?: string): NewDishDto {
    const { title, description, mealType, readyInMinutes, ingredients, type, recipe, imageUrl } = formData;
    const mealIngredients: IngredientWithoutImage[] = ingredients.map(ingredient => {
        return {
            id: ingredient.data.id,
            name: ingredient.data.en,
            amount: Number(ingredient.amount),
            unit: ingredient.unit
        };
    });
    const recipeSections: DishRecipeSection[] = recipe.map(section => {
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
        mealType,
        readyInMinutes: Number(readyInMinutes),
        recipeSections,
        ingredients: mealIngredients,
        posted: Date.now(),
        provider: 'yummy',
        ...((imgUrl || imageUrl) && { imageUrl: imgUrl ?? imageUrl })
    };
}

export function loadRecipeSections(sections: DishRecipeSection[]): DishRecipeSectionWithId[] {
    return sections.map(section => {
        return {
            ...section,
            id: crypto.randomUUID(),
            steps: section.steps.map(step => {
                return {
                    id: crypto.randomUUID(),
                    text: step
                };
            })
        };
    });
}