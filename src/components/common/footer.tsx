import styles from '@/styles/components/common/footer.module.scss';
import { PageLink, PageLinkProps } from '@/src/components/common/links/page-link';

const mainLinks: PageLinkProps[] = [
    { label: 'Strona główna', href: '/' },
    { label: 'O stronie', href: '/#description' },
    { label: 'Wyszukaj dania', href: '/search' },
    { label: 'Rekomendacje', href: '/recommendations' },
    { label: 'Zaloguj się', href: '/users/login' },
    { label: 'Zarejestruj się', href: '/users/registration' }
];

const visitLinks: PageLinkProps[] = [
    { label: 'Kreator dania', href: '/dishes/create' }
];

const contactLinks: Array<PageLinkProps | any> = [
    { label: 'Email', href: 'mailto:my.email@email.com?subject=Witaj,%20DishMatcher!&body=Witaj,' }
];

export function Footer() {
    return (
        <footer className={styles['app-footer']}>
            <div className={styles['brand-container']}>
                <img src="/logo.svg" width={64} height={64} alt={'DishMatcher logo'} />
                <p>&copy; 2025 DishMatcher</p>
                <p>Wszelkie prawa zastrzeżone.</p>
            </div>
            <SectionContainer label={'Linki'} links={mainLinks} />
            <SectionContainer label={'Zobacz też'} links={visitLinks} />
            <SectionContainer label={'Kontakt'} links={contactLinks} />
        </footer>
    );
}

interface SectionContainerProps {
    label: string;
    links: PageLinkProps[];
}

function SectionContainer({ label, links }: SectionContainerProps) {
    return (
        <div className={styles['section-container']}>
            <div>
                <h5>{label}</h5>
                <ul>
                    {links.map(link => {
                        return (
                            <li key={link.href}>
                                <PageLink label={link.label} href={link.href} style={{ color: '#9A999A' /* shady-lady colour */ }} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}