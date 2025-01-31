import { Language } from '@/src/types/api.types';

interface FlagIconProps {
    language: Language;
    hasTranslationInfo?: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const flagInfo: Record<Language, { alt: string, author: JSX.Element, image: string }> = {
    pl: {
        alt: 'Flaga Polski',
        author: <a href="https://www.flaticon.com/free-icons/poland" title="poland icons">Poland icons created by Smashicons - Flaticon</a>,
        image: 'pl'
    },
    en: {
        alt: 'Flaga UK',
        author: <a href="https://www.flaticon.com/free-icons/uk-flag" title="uk flag icons">Uk flag icons created by IconsBox - Flaticon</a>,
        image: 'uk'
    }
};

export function FlagIcon({ language, hasTranslationInfo }: FlagIconProps) {
    const flag = flagInfo[language];

    return (
        <img
            style={{ cursor: 'pointer' }}
            src={`/flags/${flag.image}.png`}
            alt={flag.alt}
            width={48}
            title={hasTranslationInfo ? 'Danie zostało przetłumaczone. Może zawierać błędy w tłumaczeniu.' : 'Język oryginału'}
            data-author={flag.author}
        />
    );
}