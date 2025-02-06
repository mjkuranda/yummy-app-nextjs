import { IngredientWithId } from '@/src/types/ingredient.types';
import { IngredientWithoutImage, DishRecipeSection } from '@/src/types/api.types';

export interface DishFormData {
    title: string;
    description: string;
    readyInMinutes: string;
    type: DishType;
    mealType: OnlyMealType;
    ingredients: IngredientWithId[];
    recipe: DishRecipeSectionWithId[];
    hasImage: boolean;
    hasImageUrl?: boolean;
    imageUrl?: string;
    imageFile?: File;
}

export type OnlyMealType = 'breakfast' | 'launch' | 'dinner';

export type MealType = 'any' | OnlyMealType;

export type MealRecord = { en: string, pl: string };

export const MealTypeText: Record<MealType, MealRecord> = {
    any: {
        en: 'any',
        pl: 'każdy'
    },
    breakfast: {
        en: 'breakfast',
        pl: 'śniadanie'
    },
    launch: {
        en: 'launch',
        pl: 'obiad'
    },
    dinner: {
        en: 'dinner',
        pl: 'kolacja'
    }
};

export type DishType = 'any' | 'soup' | 'main course' | 'salad' | 'dessert' | 'beverage';

export type DishRecord = Record<string, MealRecord>;

export const DishTypeText: Record<MealType, DishRecord> = {
    any: {
        'any': {
            en: 'any',
            pl: 'każdy'
        },
        'beverage': {
            en: 'beverage',
            pl: 'napój'
        }
    },
    breakfast: {
        'any': {
            en: 'any',
            pl: 'każdy'
        }
    },
    launch: {
        'any': {
            en: 'any',
            pl: 'każdy'
        },
        'soup': {
            en: 'soup',
            pl: 'zupa'
        },
        'main course': {
            en: 'main course',
            pl: 'danie główne'
        },
        'salad': {
            en: 'salad',
            pl: 'sałatka'
        },
        'dessert': {
            en: 'dessert',
            pl: 'deser'
        },
        'beverage': {
            en: 'beverage',
            pl: 'napój'
        }
    },
    dinner: {}
};

type PeriodRecord = Record<MealType, string[]>;

export const PeriodText: PeriodRecord = {
    'any': [
        'Nie jem w nocy, bo mój lodówkowy czujnik kalorii ma laserowy alarm!',
        'Nocą jedzenie ma więcej kalorii – to udowodnione... przez moje spodnie rano.',
        'Lodówka powinna być zamknięta… jak twoje oczy! Idź spać!',
        'Zjesz teraz? Twój brzuch zapamięta… i twoje spodnie rano też.',
        'Pamiętaj: nocą lodówka jest pusta. Nawet jeśli jest pełna, to i tak jest pusta!',
        'Nocne podjadanie? Świetny pomysł! O ile chcesz, żeby twoja poduszka szeptała rano \'Naprawdę?'
    ],
    'breakfast': [
        'Zacznij dzień jak mistrz – owsianka! Albo jak leniuch – kawa i ciastko.',
        'Zasada śniadaniowa: Im później wstaniesz, tym bardziej przypomina to obiad!',
        'Jajecznica, tosty, a może naleśniki? Decyzja ważniejsza niż wybór prezydenta!',
        'Płatki z mlekiem? Klasyk! Chyba że skończyło się mleko… wtedy to już dramat.',
        'Nie wiesz, co zjeść? Weź kanapkę. Z czym? Z czymkolwiek – kanapka nie ocenia!'
    ],
    'launch': [
        'Obiad to taki moment, kiedy zaczynasz żałować, że nie zrobiłeś więcej śniadania.',
        'Zupa czy drugie danie? W sumie lepiej oba, żeby uniknąć trudnych wyborów.',
        'Makaron? Zawsze dobra opcja. Jak nie wiesz, co dodać, to ser uratuje sytuację.',
        'Kotlet, ziemniaki, surówka… albo po prostu pizza – też ma warzywa!',
        'Jak nie masz pomysłu na obiad, to znaczy, że pora na naleśniki. Takie są zasady!'
    ],
    'dinner': [
        'Kanapki? Sałatka? A może tost, bo to kanapka, ale na ciepło i z charakterem?',
        'Jeśli chcesz lekko – sałatka. Jeśli chcesz dobrze – kanapka. Jeśli chcesz perfekcyjnie – zapiekanka!',
        'Jajko sadzone, awokado, tost… albo po prostu wszystko, co masz w lodówce, wymieszane na patelni.',
        'Kolacja powinna być lekka… ale czy naleśniki z Nutellą się liczą jako lekkie? Nie słyszę sprzeciwu!'
    ]
};

export interface DishRecipeStepWithId {
    id: string;
    text: string;
}

export interface DishRecipeSectionWithId {
    id: string;
    steps: DishRecipeStepWithId[]
    name?: string,
}

export interface DishComment {
    readonly _id: string;
    readonly dishId: string;
    readonly user: string;
    readonly text: string;
    readonly posted: number;
}

export interface NewDishCommentDto {
    dishId: string;
    text: string;
}

export interface DishRating {
    dishId: string;
    rating: number;
    count: number;
}

export interface NewDishRatingDto {
    dishId: string;
    rating: number;
}

export interface DishDifferenceDto {
    title?: string;
    description?: string;
    readyInMinutes?: number;
    type?: DishType;
    mealType?: MealType;
    ingredients?: IngredientWithoutImage[];
    recipeSections?: DishRecipeSection[];
    imageUrl?: string;
}