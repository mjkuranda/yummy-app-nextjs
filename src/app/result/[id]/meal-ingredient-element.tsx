import styles from '@/styles/app/result/page.module.scss';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

interface MealIngredientElementProps {
    text: string;
    imageUrl: string;
    contains: boolean | null;
}

export function MealIngredientElement({ text, imageUrl, contains }: MealIngredientElementProps) {
    return (
        <li className={`d-flex justify-content-start align-items-center ${styles['result-ingredient']}`} key={text}>
            <img className={styles['result-ingredient__image']} src={imageUrl} alt={text} />
            <span className={styles['result-ingredient__text']}>{text}</span>
            {contains !== null && (contains ? <DoneIcon color="success" /> : <ClearIcon color="error" />)}
        </li>
    );
}