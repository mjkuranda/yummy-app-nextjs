import styles from '@/styles/app/result/page.module.scss';

interface MealIngredientElementProps {
    text: string;
    imageUrl: string;
}

export function MealIngredientElement({ text, imageUrl }: MealIngredientElementProps) {
    return (
        <li className={`d-flex justify-content-center align-items-center ${styles['result-ingredient']}`} key={text}>
            <img className={styles['result-ingredient__image']} src={imageUrl} alt={text} />
            <span className={styles['result-ingredient__text']}>{text}</span>
        </li>
    );
}