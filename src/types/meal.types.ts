import { Items } from '@/src/components/common/form/input-list';

export interface MealFormData {
    title: string;
    description: string;
    ingredients: Items;
    imageUrl?: string;
    imageFile?: File;
    type: MealType;
}

export type MealType = 'soup' | 'main course' | 'salad' | 'raw salad';