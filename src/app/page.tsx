import styles from '@/src/styles/test.module.scss';

export default function Home() {
    return (
        <>Home page <div className={styles['test-class']}>Xxxxx</div><div className="y-class test-class">Y</div></>
    );
}
