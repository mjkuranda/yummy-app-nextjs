import Link from 'next/link';

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
        <div>
            <h3>{header}</h3>
            <ul>
                {list.map(item => {
                    return (
                        <li key={item.link}>
                            <Link href={`/management/${item.link}`}>{item.text}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}