import styles from '@/styles/app/dishes/[id]/page.module.scss';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { IngredientImage } from '@/src/app/dishes/[id]/ingredient-image';

interface MealIngredientElementProps {
    text: string;
    imageUrl: string;
    contains: boolean | null;
}

export function DishIngredientElement({ text, imageUrl, contains }: MealIngredientElementProps) {
    return (
        <li className={`d-flex justify-content-start align-items-center ${styles['result-ingredient']}`} key={text}>
            <IngredientImage imageUrl={imageUrl} text={text} />
            <span className={styles['result-ingredient__text']}>{text.includes('Potrzebne') ? `${text} (autor nie nie określił jakie)`: text}</span>
            {contains !== null && (contains ? <DoneIcon color="success" /> : <ClearIcon color="error" />)}
        </li>
    );
}