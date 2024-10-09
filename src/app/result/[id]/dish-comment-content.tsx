import styles from '@/styles/app/result/dish-comment-container.module.scss';
import PersonIcon from '@mui/icons-material/Person';
import { DishComment } from '@/src/types/dish.types';
import { HOUR, MINUTE, SECOND } from '@/src/constants/numbers';

interface DishCommentContentProps {
    data: DishComment[];
}

export function DishCommentContent({ data }: DishCommentContentProps) {
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
            {data.sort((a, b) => b.posted - a.posted).map(comment => {
                return (
                    <li key={comment._id} className={styles['dish-comment-item']}>
                        <div className={styles['dish-comment-item__header']}>
                            <p><PersonIcon />{comment.user}</p>
                            <p className={styles['dish-comment-item__posted']}>{getPostedText(comment.posted)}</p>
                        </div>
                        <p>{comment.text}</p>
                    </li>
                );
            })}
        </ul>
    );
}