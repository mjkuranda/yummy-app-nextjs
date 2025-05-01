import { Language } from '@/src/types/api.types';
import { supportedLanguages } from '@/src/constants/common.constants';

export function useGetBrowserLanguage(): Language {
    const navigatorLanguage: string = navigator.language;
    const defaultLanguage: Language = 'pl';

    if (isSupportedLanguage(navigatorLanguage)) {
        return navigatorLanguage;
    }

    return defaultLanguage;
}

function isSupportedLanguage(language: string): language is Language {
    return supportedLanguages.includes(language as Language);
}