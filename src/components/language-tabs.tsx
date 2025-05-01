import { useState, SyntheticEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/system';
import { FlagIcon } from '@/src/components/common/flag-icon';
import { Language } from '@/src/types/api.types';
import { useDishDetailsContext } from '@/src/contexts/dish-details.context';

export default function LanguageTabs() {
    const languageTabs = [
        { language: 'en' },
        { language: 'pl' }
    ] as const;
    const { language, onChangeLanguage: onChangeContextLanguage } = useDishDetailsContext();
    const [langIdx, setLangIdx] = useState<number>(languageTabs.findIndex(t => t.language === language));

    const onChangeLanguage = (event: SyntheticEvent, newValue: number) => {
        const dataLanguage = event.currentTarget.getAttribute('aria-label') as Language;

        onChangeContextLanguage(dataLanguage);
        setLangIdx(newValue);
    };

    return (
        <StyledTabs value={langIdx} onChange={onChangeLanguage} aria-label="Dish language version tabs">
            {languageTabs.map(lang =>
                <Tab icon={<FlagIcon language={lang.language} size={32} />} aria-label={lang.language} />
            )}
        </StyledTabs>
    );
}

const StyledTabs = styled(Tabs)({
    backgroundColor: '#F3EEE7',
    borderBottom: '1px solid #ddd',
    borderTopLeftRadius: '0.618rem',
    borderTopRightRadius: '0.618rem'
});