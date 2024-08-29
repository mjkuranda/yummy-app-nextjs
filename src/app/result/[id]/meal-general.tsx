import styles from '@/styles/app/result/page.module.scss';
import { MealRecipe } from '@/src/app/result/[id]/meal-recipe';
import { DetailedMeal } from '@/src/types/api.types';
import { MealRating } from '@/src/app/result/[id]/meal-rating';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { EditLink } from '@/src/components/common/edit-link';
import { MealTypeText } from '@/src/types/meal.types';
import FlatwareIcon from '@mui/icons-material/Flatware';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface MealGeneralProps {
    meal: DetailedMeal;
}

export function MealGeneral({ meal }: MealGeneralProps) {
    return (
        <div className={styles['result-details']}>
            <ul>
                <li>
                    <h3>{meal.title}</h3>
                    <div className={styles['information-container']}>
                        <span>Czas wykonania:</span>
                        <span><AccessTimeIcon /></span>
                        <span>{meal.readyInMinutes}</span>
                        <span>minut</span>
                    </div>
                    <div className={styles['information-container']}>
                        <span>Typ posiłku:</span>
                        <span><FlatwareIcon /></span>
                        <span>{MealTypeText[meal.type].pl}</span>
                    </div>
                    <div className={styles['information-container']}>
                        <span>Autor:</span>
                        <span><PersonAddIcon /></span>
                        <span>{meal.sourceOrAuthor}</span>
                    </div>
                </li>
                <li className={styles['result-rating']}>
                    <MealRating />
                    {meal.provider === 'yummy' && <EditLink label={'Edytuj'} link={`/meals/create/${meal.id}`} />}
                </li>
            </ul>
            <div>
                <p dangerouslySetInnerHTML={{ __html: meal.description }} />
                <MealRecipe meal={meal} />
            </div>
        </div>
    );
}