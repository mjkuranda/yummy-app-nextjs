import styles from '@/styles/app/result/page.module.scss';
import { DetailedDish } from '@/src/types/api.types';

interface DishDescriptionProps {
    dish: DetailedDish;
    description?: string;
}

export function DishDescription({ dish, description }: DishDescriptionProps) {
    return (
        <div className={styles['dish-description']}>
            <h5>Opis:</h5>
            <p dangerouslySetInnerHTML={{ __html: description && description.length > 0 ? description : dish.description }} />
        </div>
    );
}