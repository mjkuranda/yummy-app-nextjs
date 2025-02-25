import styles from '@/styles/app/information-screen.module.scss';

interface InformationScreenProps {
    title: string;
    description: string;
    imageName: string;
    authorInfo: string;
}

export function InformationScreen({ title, description, imageName, authorInfo }: InformationScreenProps) {
    return (
        <div className={styles['information-screen']}>
            <div className={styles['information-screen__details-container']}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div className={styles['information-screen__image-container']}>
                <div data-image-name={imageName} data-author-info={authorInfo}></div>
            </div>
        </div>
    );
}