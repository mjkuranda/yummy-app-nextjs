import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';
import styles from '@/styles/app/about/page.module.scss';

export default function AboutPage() {
    return (
        <>
            <Header />
            <div className={styles['about-page']}>
                <div className={styles['about-container']}>
                    <div className={styles['about-section']}>
                        <div>Aplikacja została wykonana w ramach <strong>pracy inżynierskiej</strong>.</div>
                        <div>Tematem pracy była <strong>Platforma do zarządzania i rekomendacji dań</strong></div>
                        <div>(<i>Dish management and recommendation platform</i>)</div>
                    </div>
                    <div className={styles['about-section']}>
                        <div>Autorem jest <strong>Marek Kurańda</strong>.</div>
                        <div>Student kierunku <strong>Informatyka w Inżynierii Komputerowej</strong></div>
                        <div>na Wydziale Inżynierii Elektrycznej i Komputerowej</div>
                        <div>na <strong>Politechnice Krakowskiej</strong>.</div>
                    </div>
                    <div className={styles['about-section']}>
                        <div>Promotorem pracy jest <strong>dr inż. Damian Grela</strong>.</div>
                    </div>
                    <div className={styles['about-section']}>
                        <div>Aktualna wersja z dnia: <i>27.11.2024 r</i>.</div>
                        <div><i>v1.60.0</i></div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}