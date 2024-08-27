import styles from '@/styles/app/result/meal-comment-container.module.scss';
import PersonIcon from '@mui/icons-material/Person';
import { MealComment } from '@/src/types/meal.types';
import { HOUR, MINUTE, SECOND } from '@/src/constants/numbers';

interface MealCommentContentProps {
    data: MealComment[];
}

export function MealCommentContent({ data }: MealCommentContentProps) {
    const getPostedText = (postedComment: number): string => {
        const diff = Date.now() - postedComment;

        if (diff < SECOND * 10) {
            return 'Chwilę temu';
        }

        if (diff < MINUTE) {
            return 'Mniej niż 1 minutę temu';
        }

        if (diff < HOUR) {
            return `${Math.ceil(diff / MINUTE)} minut temu`;
        }

        return new Date(postedComment).toLocaleDateString();
    };

    if (data.length === 0) {
        return <p className="text-center">Brak komentarzy</p>;
    }

    return (
        <ul>
            {data.map(comment => {
                return (
                    <li key={comment._id} className={styles['meal-comment-item']}>
                        <div className={styles['meal-comment-item__header']}>
                            <p><PersonIcon />{comment.user}</p>
                            <p className={styles['meal-comment-item__posted']}>{getPostedText(comment.posted)}</p>
                        </div>
                        <p>{comment.text}</p>
                    </li>
                );
            })}
        </ul>
    );
}