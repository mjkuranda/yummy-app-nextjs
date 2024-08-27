import { MealComment } from '@/src/types/meal.types';

interface MealCommentContentProps {
    data: MealComment[];
}

export function MealCommentContent({ data }: MealCommentContentProps) {
    if (data.length === 0) {
        return <p className="text-center">Brak komentarzy</p>;
    }

    return (
        <ul>{data.length}</ul>
    );
}