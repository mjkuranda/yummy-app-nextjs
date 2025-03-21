import Link from 'next/link';
import styles from '@/styles/app/manage/page.module.scss';

type HeaderType = 'Users' | 'Dishes';

export interface Item {
    link: string;
    text: string;
    description: string;
}

interface ItemListProps {
    list: Item[];
    header: HeaderType;
}

export function ItemList({ list, header }: ItemListProps) {
    return (
        <div className={styles['item-list']}>
            <h3 className={styles['item-list__header']}>{getItemHeader(header)}</h3>
            <ul className={styles['item-list__container']}>
                {list.map(item => {
                    return (
                        <li key={item.link} className={styles['item-list__item']}>
                            <Link href={`/manage/${item.link}`}>
                                <div>
                                    <p className={styles['item-text']}>{item.text}</p>
                                    <p className={styles['item-description']}>{item.description}</p>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function getItemHeader(header: HeaderType): string {
    switch (header) {
    case 'Users': return 'Użytkownicy';
    case 'Dishes': return 'Dania';
    }
}