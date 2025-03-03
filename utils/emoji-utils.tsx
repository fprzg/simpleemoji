import resources from "@/locales";
import { i18nTranslation } from "@/locales/i18n-translation";
import { Emoji, EmojiCategory } from "@/types/emoji";
import { emojiCategories } from "./emoji-category";

export interface EmojiRepertoire {
    langs: string[];
    categories: EmojiCategory[];
}

function checkTranslationAvailable(lang: string): boolean {
    if (resources[lang as keyof typeof resources]) {
        return true;
    }

    return false;
}

function getTranslations(allLangs: string[]): i18nTranslation[] {
    let langs: string[] = [];
    //console.log(allLangs);
    allLangs.forEach((lang) => {
        if (!(lang in langs)) {
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
    //console.log(translations);

    return translations;
}

export const emojiRepertoireBuilder = (lang: string): EmojiRepertoire => {
    let repertoire: EmojiRepertoire = { langs: [], categories: [] };
    // TODO(Farid): Fix the bugs that might occour when the other language is a variation of english (en-something).
    let translations = getTranslations([lang, "en"]);
    translations.forEach((translation) => repertoire.langs.push(translation.lang));

    emojiCategories.forEach((cat) => {
        let category: EmojiCategory = { name: cat.name, emojis: [] }
        cat.emojis.forEach((e) => {
            let emoji: Emoji = {
                char: e.char,
                names: {},
            };

            translations.forEach((translation) => {
                let transName = translation.emojiDescription[e.char as keyof typeof translation.emojiDescription];
                emoji.names[translation.lang as keyof typeof emoji.names] = transName;
            });

            category.emojis.push(emoji);

        })
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