import Link from 'next/link';
import styles from '@/styles/app/manage/page.module.scss';

export interface Item {
    link: string;
    text: string;
}

interface ItemListProps {
    list: Item[];
    header: 'Users' | 'Meals';
}

export function ItemList({ list, header }: ItemListProps) {
    return (
        <div className={styles['item-list']}>
            <h3>{header}</h3>
            <ul>
                {list.map(item => {
                    return (
                        <li key={item.link}>
                            <Link href={`/manage/${item.link}`}>{item.text}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}