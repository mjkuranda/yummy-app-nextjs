import styles from '@/styles/components/common/header/header.module.scss';
import { PageLink } from '@/src/components/common/links/page-link';
import { User } from '@/src/components/common/user';

export default function Nav() {
    return (
        <>
            <div className={styles['link-container']}>
                <PageLink href={'/'} label={'Strona główna'} />
                <PageLink href={'/#description'} label={'O stronie'} />
            </div>
            <div className={styles['user-container']}>
                <User />
            </div>
        </>
    );
}