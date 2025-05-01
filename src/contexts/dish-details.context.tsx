import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { DetailedDish, Language } from '@/src/types/api.types';
import { useGetBrowserLanguage } from '@/src/hooks/use-get-browser-language';

interface DishDetailsContextProps {
    dish?: DetailedDish;
    onChangeDish: (dish: DetailedDish, language: Language) => void;
    language: Language;
    onChangeLanguage: (language: Language) => void;
}

type DishDetailsProviderProps = Omit<DishDetailsContextProps, 'language' | 'onChangeLanguage' | 'onChangeDish'> & PropsWithChildren;

const DishDetailsContext = createContext<DishDetailsContextProps | undefined>(undefined);

export function DishDetailsProvider({ children }: DishDetailsProviderProps) {
    const initialLanguage: Language = useGetBrowserLanguage();
    const [dish, setDish] = useState<DetailedDish>();
    const [language, setLanguage] = useState<Language>(initialLanguage);

    const onChangeLanguage = useCallback((language: Language) => setLanguage(language), []);
    const onChangeDish = useCallback((dish: DetailedDish) => setDish(dish), []);

    const props: DishDetailsContextProps = useMemo(() => ({ dish, language, onChangeLanguage, onChangeDish }), [dish, language]);

    return (
        <DishDetailsContext.Provider value={props}>
            {children}
        </DishDetailsContext.Provider>
    );
}

export const useDishDetailsContext = () => {
    const context = useContext(DishDetailsContext);

    if (context === undefined) {
        throw new Error('useSidebarActions must be used within SidebarProvider');
    }

    return context;
};
