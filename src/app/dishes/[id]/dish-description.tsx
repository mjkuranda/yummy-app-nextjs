import styles from '@/styles/app/dishes/[id]/page.module.scss';

interface DishDescriptionProps {
    description: string;
}

export function DishDescription({ description }: DishDescriptionProps) {
    return (
        <div className={styles['dish-description']}>
            <h5>Opis:</h5>
            <p dangerouslySetInnerHTML={{ __html: description?.length > 0 ? description : 'Brak dostarczonego opisu.' }} />
        </div>
    );
}