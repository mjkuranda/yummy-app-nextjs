import styles from '@/styles/app/information-screen.module.scss';

interface InformationScreenProps {
    title: string;
    description: string;
    imageName: string;
}

export function InformationScreen({ title, description, imageName }: InformationScreenProps) {
    const className = `${styles['information-screen']} d-flex justify-content-center align-items-center`;

    return (
        <div className={className} data-image-name={imageName}>
            <div className={styles['information-screen-box']}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}