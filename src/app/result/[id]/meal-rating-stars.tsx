import styles from '@/styles/app/result/meal-rating.module.scss';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface MealRatingStarsProps {
    rating: number;
}

export function MealRatingStars({ rating }: MealRatingStarsProps) {
    const solid = Math.floor(rating);
    const half = rating - solid > 0.2 ? 1 : 0;
    const rest = 5 - solid - half;

    const renderSolid = () => new Array(solid).fill(<StarIcon key={crypto.randomUUID()} />);

    const renderHalf = () => half === 1 ? <StarHalfIcon /> : null;

    const renderRest = () => new Array(rest).fill(<StarBorderIcon />);

    return (
        <div className={styles['meal-rating-stars']}>
            {renderSolid()}
            {renderHalf()}
            {renderRest()}
        </div>
    );
}