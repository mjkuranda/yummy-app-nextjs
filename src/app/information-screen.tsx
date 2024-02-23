import styles from '@/styles/app/information-screen.module.scss';

interface InformationScreenProps {
    title: string;
    description: string;
}

export function InformationScreen({ title, description }: InformationScreenProps) {
    const className = `${styles['information-screen']} d-flex justify-content-center align-items-center`;

    return (
        <div className={className}>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}