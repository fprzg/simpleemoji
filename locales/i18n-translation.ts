export interface i18nTranslation {
    lang: string;

    ui: {
        [language: string]: any;
    };

    categories: {
        [language: string]: string;
    };

    emojiDescription: {
        [char: string]: string;
    };
};