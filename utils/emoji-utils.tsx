import resources from "@/locales";
import { i18nTranslation } from "@/locales/i18n-translation";
import { Emoji, EmojiCategory } from "@/types/emoji";
import { emojiCategories } from "./emoji-category";

export interface EmojiRepertoire {
    langs: string[];
    categories: EmojiCategory[];
}

export const saveEmojis = (emojis: Emoji[]) => {
    const asString = emojis.map((e) =>
        ({ char: e.char, names: {} })
    );
    const serialized = JSON.stringify(asString);
    localStorage.setItem('recentEmojis', serialized);
};

export const loadEmojis = (translations: i18nTranslation[]): Emoji[] => {
    let emojis: Emoji[] = [];

    const stored = localStorage.getItem('recentEmojis');

    if (stored) {
        const deserialized: Emoji[] = JSON.parse(stored);
        emojis = emojisAddNames(deserialized, translations)
    }

    return emojis;
};

const checkTranslationAvailable = (lang: string): boolean => {
    if (resources[lang as keyof typeof resources]) {
        return true;
    }

    return false;
}

export function getTranslations(allLangs: string[]): i18nTranslation[] {
    let langs: string[] = [];

    allLangs.forEach((lang) => {
        if (lang in langs) {
            // Do nothing
        } else {
            if (checkTranslationAvailable(lang)) {
                langs.push(lang)
            } else if (checkTranslationAvailable(lang.split("-")[0])) {
                langs.push(lang.split("-")[0]);
            }
        }
    });

    let translations: i18nTranslation[] = [];

    langs.forEach((lang) => {
        translations.push(resources[lang as keyof typeof resources].translation);
    })

    return translations;
}


export const buildEmojiFromChar = (char: string, translations: i18nTranslation[]): Emoji => {
    let emoji: Emoji = {
        char: char,
        names: {},
    };

    translations.forEach((translation) => {
        let transName = translation.emojiDescription[char as keyof typeof translation.emojiDescription];
        emoji.names[translation.lang as keyof typeof emoji.names] = transName;
    });
    return emoji;
}

export const emojisAddNames = (original: Emoji[], translations: i18nTranslation[]): Emoji[] => {
    let result: Emoji[] = [];

    original.forEach((e) => {
        const emoji = buildEmojiFromChar(e.char, translations);
        result.push(emoji);
    })

    return result;
}

export const emojiRepertoireBuilder = (lang: string): EmojiRepertoire => {
    let repertoire: EmojiRepertoire = { langs: [], categories: [] };

    let translations = getTranslations([lang, "en"]);
    translations.forEach((translation) => repertoire.langs.push(translation.lang));

    emojiCategories.forEach((cat) => {
        const category: EmojiCategory = {
            name: cat.name,
            emojis: emojisAddNames(cat.emojis, translations),
        };

        repertoire.categories.push(category);
    });

    return repertoire;
}

export const emojiSearch = (query: string, emojis: Emoji[], langs: string[]): Emoji[] => {
    if (query.trim() === '') {
        return [];
    }

    query = query.toLowerCase();

    const results = emojis.filter(emoji => {
        if (emoji.names !== undefined) {
            for (const lang in emoji.names) {
                const name = emoji.names[lang]?.toLowerCase();
                return name?.toLowerCase().includes(query);
            }
        }
    });

    return results;
}