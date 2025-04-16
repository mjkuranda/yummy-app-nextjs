import styles from '@/styles/components/common/header/header.module.scss';
import { PageLink } from '@/src/components/common/links/page-link';
import AccountDropdown from '@/src/components/common/account-dropdown';
import { useUser } from '@/src/hooks/use-user';
import { Button } from '@/src/components/common/buttons/button';

export default function Nav() {
    const { isLoggedIn } = useUser();

    return (
        <>
            <div className={styles['link-container']}>
                <PageLink href={'/'} label={'Strona główna'} />
                <PageLink href={'/#description'} label={'O stronie'} />
            </div>
            <div className={styles['user-container']}>
                {isLoggedIn() ? <AccountDropdown /> : <Button label="Zaloguj się" icon="log in" link="/users/login" />}
            </div>
        </>
    );
}