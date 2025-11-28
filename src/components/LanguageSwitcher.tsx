import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const currentLanguage = i18n.language;

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => changeLanguage('de')}
                className={`px-3 py-2 rounded-xl border cursor-pointer ${
                    currentLanguage === 'de'
                        ? 'bg-blue-100 border-blue-500 font-bold dark:bg-blue-900 dark:border-blue-400'
                        : 'bg-zinc-200 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700'
                } text-zinc-900 dark:text-zinc-100`}
            >
                🇩🇪 DE
            </button>
            <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-2 rounded-xl border cursor-pointer ${
                    currentLanguage === 'en'
                        ? 'bg-blue-100 border-blue-500 font-bold dark:bg-blue-900 dark:border-blue-400'
                        : 'bg-zinc-200 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700'
                } text-zinc-900 dark:text-zinc-100`}
            >
                🇬🇧 EN
            </button>
        </div>
    );
}
