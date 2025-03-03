import resources from "@/locales";
import { i18nTranslation } from "@/locales/i18n-translation";
import { Emoji, EmojiCategory } from "@/types/emoji";

// tengo que separar las categorias de la interfaz que se expone al publico

const emojiCategories: EmojiCategory[] = [
    {
        name: 'emotion',
        emojis: [
            { char: '😀', names: {} },
            //{ char: '😃', names: {} },
            { char: '😄', names: {} },
            { char: '😁', names: {} },
            { char: '😆', names: {} },
            { char: '😅', names: {} },
            { char: '😂', names: {} },
            { char: '🤣', names: {} },
            { char: '😊', names: {} },
            { char: '😇', names: {} },
            { char: '🙂', names: {} },
            { char: '🙃', names: {} },
            { char: '😉', names: {} },
            { char: '😌', names: {} },
            { char: '😍', names: {} },
            { char: '🥰', names: {} },
            { char: '😘', names: {} },
            { char: '😗', names: {} },
            { char: '😙', names: {} },
            { char: '😚', names: {} },
            { char: '😋', names: {} },
            { char: '😛', names: {} },
            { char: '😜', names: {} },
            { char: '😝', names: {} },
            { char: '🤑', names: {} },
            { char: '🤗', names: {} },
            { char: '🤭', names: {} },
            { char: '🤫', names: {} },
            { char: '🤔', names: {} },
            { char: '🤐', names: {} },
            { char: '🤨', names: {} },
            { char: '😐', names: {} },
            { char: '😑', names: {} },
            { char: '😶', names: {} },
            { char: '😏', names: {} },
            { char: '😒', names: {} },
            { char: '🙄', names: {} },
            { char: '😬', names: {} },
            { char: '🤥', names: {} },
            //{ char: '😌', names: {} },
            { char: '😔', names: {} },
            //{ char: '😪', names: {} },
            { char: '🤤', names: {} },
            { char: '😴', names: {} },
            { char: '😷', names: {} },
            { char: '🤒', names: {} },
            { char: '🤕', names: {} },
            { char: '🤢', names: {} },
            { char: '🤮', names: {} },
            { char: '🤧', names: {} },
        ]
    },
    {
        name: 'face_negative',
        emojis: [
            { char: '😕', names: {} },
            { char: '😟', names: {} },
            { char: '🙁', names: {} },
            { char: '☹️', names: {} },
            { char: '😮', names: {} },
            { char: '😯', names: {} },
            { char: '😲', names: {} },
            { char: '😳', names: {} },
            { char: '🥺', names: {} },
            { char: '😦', names: {} },
            { char: '😧', names: {} },
            { char: '😨', names: {} },
            { char: '😰', names: {} },
            { char: '😥', names: {} },
            { char: '😢', names: {} },
            { char: '😭', names: {} },
            { char: '😱', names: {} },
            { char: '😖', names: {} },
            { char: '😣', names: {} },
            { char: '😞', names: {} },
            { char: '😓', names: {} },
            { char: '😩', names: {} },
            { char: '😫', names: {} },
            { char: '🥱', names: {} },
        ]
    },
    {
        name: 'costume',
        emojis: [
            { char: '😈', names: {} },
            { char: '👿', names: {} },
            { char: '👹', names: {} },
            { char: '👺', names: {} },
            { char: '💀', names: {} },
            { char: '☠️', names: {} },
            { char: '👻', names: {} },
            { char: '👽', names: {} },
            { char: '👾', names: {} },
            { char: '🤖', names: {} },
            { char: '🎃', names: {} },
            { char: '😺', names: {} },
            { char: '😸', names: {} },
            { char: '😹', names: {} },
            { char: '😻', names: {} },
            { char: '😼', names: {} },
            { char: '😽', names: {} },
            { char: '🙀', names: {} },
            { char: '😿', names: {} },
            { char: '😾', names: {} },
        ]
    },
    {
        name: 'people',
        emojis: [
            { char: '👋', names: {} },
            { char: '🤚', names: {} },
            { char: '🖐️', names: {} },
            { char: '✋', names: {} },
            { char: '🖖', names: {} },
            { char: '👌', names: {} },
            { char: '🤌', names: {} },
            { char: '🤏', names: {} },
            { char: '✌️', names: {} },
            { char: '🤞', names: {} },
            { char: '🤟', names: {} },
            { char: '🤘', names: {} },
            { char: '🤙', names: {} },
            { char: '👈', names: {} },
            { char: '👉', names: {} },
            { char: '👆', names: {} },
            { char: '🖕', names: {} },
            { char: '👇', names: {} },
            { char: '☝️', names: {} },
            { char: '👍', names: {} },
            { char: '👎', names: {} },
            { char: '✊', names: {} },
            { char: '👊', names: {} },
            { char: '🤛', names: {} },
            { char: '🤜', names: {} },
            { char: '👏', names: {} },
            { char: '🙌', names: {} },
            { char: '👐', names: {} },
            { char: '🤲', names: {} },
            { char: '🤝', names: {} },
            { char: '🙏', names: {} },
            { char: '✍️', names: {} },
            { char: '💅', names: {} },
            { char: '🤳', names: {} },
            { char: '💪', names: {} },
            { char: '🦾', names: {} },
            { char: '🦿', names: {} },
            { char: '🦵', names: {} },
            { char: '🦶', names: {} },
            { char: '👂', names: {} },
            { char: '🦻', names: {} },
        ]
    },
    {
        name: 'body',
        emojis: [
            { char: '👃', names: {} },
            { char: '🧠', names: {} },
            { char: '🫀', names: {} },
            { char: '🫁', names: {} },
            { char: '🦷', names: {} },
            { char: '🦴', names: {} },
            { char: '👀', names: {} },
            { char: '👁️', names: {} },
            { char: '👅', names: {} },
            { char: '👄', names: {} },
        ]
    },
    {
        name: 'person',
        emojis: [
            { char: '👶', names: {} },
            { char: '🧒', names: {} },
            { char: '👦', names: {} },
            { char: '👧', names: {} },
            { char: '🧑', names: {} },
            { char: '👱', names: {} },
            { char: '👨', names: {} },
            { char: '🧔', names: {} },
            { char: '👨‍🦰', names: {} },
            { char: '👨‍🦱', names: {} },
            { char: '👨‍🦳', names: {} },
            { char: '👨‍🦲', names: {} },
            { char: '👩', names: {} },
            { char: '👩‍🦰', names: {} },
            { char: '👩‍🦱', names: {} },
            { char: '👩‍🦳', names: {} },
            { char: '👩‍🦲', names: {} },
            { char: '👴', names: {} },
            { char: '👵', names: {} },
            { char: '🧓', names: {} },
        ]
    },
    {
        name: 'gesture',
        emojis: [
            { char: '🙍', names: {} },
            { char: '🙎', names: {} },
            { char: '🙅', names: {} },
            { char: '🙆', names: {} },
            { char: '💁', names: {} },
            { char: '🙋', names: {} },
            { char: '🧏', names: {} },
            { char: '🙇', names: {} },
            { char: '🤦', names: {} },
            { char: '🤷', names: {} },
        ]
    },
    {
        name: 'nature',
        emojis: [
            { char: '🐶', names: {} },
            { char: '🐕', names: {} },
            { char: '🦮', names: {} },
            { char: '🐕‍🦺', names: {} },
            { char: '🐩', names: {} },
            { char: '🐺', names: {} },
            { char: '🦊', names: {} },
            { char: '🦝', names: {} },
            { char: '🐱', names: {} },
            { char: '🐈', names: {} },
            { char: '🐈‍⬛', names: {} },
            { char: '🦁', names: {} },
            { char: '🐯', names: {} },
            { char: '🐅', names: {} },
            { char: '🐆', names: {} },
            { char: '🐴', names: {} },
            { char: '🐎', names: {} },
            { char: '🦄', names: {} },
            { char: '🦓', names: {} },
            { char: '🦌', names: {} },
            { char: '🐮', names: {} },
            { char: '🐂', names: {} },
            { char: '🐃', names: {} },
            { char: '🐄', names: {} },
            { char: '🐷', names: {} },
            { char: '🐖', names: {} },
            { char: '🐗', names: {} },
            { char: '🐽', names: {} },
            { char: '🐏', names: {} },
            { char: '🐑', names: {} },
        ]
    },
    {
        name: 'animals',
        emojis: [
            { char: '🐐', names: {} },
            { char: '🐪', names: {} },
            { char: '🐫', names: {} },
            { char: '🦙', names: {} },
            { char: '🦒', names: {} },
            { char: '🐘', names: {} },
            { char: '🦣', names: {} },
            { char: '🦏', names: {} },
            { char: '🦛', names: {} },
            { char: '🐭', names: {} },
            { char: '🐁', names: {} },
            { char: '🐀', names: {} },
            { char: '🐹', names: {} },
            { char: '🐰', names: {} },
            { char: '🐇', names: {} },
            { char: '🐿️', names: {} },
            { char: '🦫', names: {} },
            { char: '🦔', names: {} },
            { char: '🦇', names: {} },
            { char: '🐻', names: {} },
            { char: '🐻‍❄️', names: {} },
            { char: '🐨', names: {} },
            { char: '🐼', names: {} },
            { char: '🦘', names: {} },
            { char: '🦡', names: {} },
        ]
    },
    {
        name: 'birds',
        emojis: [
            { char: '🦃', names: {} },
            { char: '🐔', names: {} },
            { char: '🐓', names: {} },
            { char: '🐣', names: {} },
            { char: '🐤', names: {} },
            { char: '🐥', names: {} },
            { char: '🐦', names: {} },
            { char: '🐧', names: {} },
            { char: '🕊️', names: {} },
            { char: '🦅', names: {} },
            { char: '🦆', names: {} },
            { char: '🦢', names: {} },
            { char: '🦉', names: {} },
            { char: '🦤', names: {} },
            { char: '🪶', names: {} },
        ]
    },
    {
        name: 'reptiles',
        emojis: [
            { char: '🐸', names: {} },
            { char: '🐊', names: {} },
            { char: '🐢', names: {} },
            { char: '🦎', names: {} },
            { char: '🐍', names: {} },
            { char: '🐲', names: {} },
            { char: '🐉', names: {} },
        ]
    },
    {
        name: 'marine_animals',
        emojis: [
            { char: '🐳', names: {} },
            { char: '🐋', names: {} },
            { char: '🐬', names: {} },
            { char: '🦭', names: {} },
            { char: '🐟', names: {} },
            { char: '🐠', names: {} },
            { char: '🐡', names: {} },
            { char: '🦈', names: {} },
            { char: '🐙', names: {} },
            { char: '🐚', names: {} },
            { char: '🪸', names: {} },
        ]
    },
    {
        name: 'insects',
        emojis: [
            { char: '🐌', names: {} },
            { char: '🦋', names: {} },
            { char: '🐛', names: {} },
            { char: '🐜', names: {} },
            { char: '🐝', names: {} },
            { char: '🪲', names: {} },
            { char: '🐞', names: {} },
            { char: '🦗', names: {} },
            { char: '🪳', names: {} },
            { char: '🕷️', names: {} },
            { char: '🕸️', names: {} },
            { char: '🦂', names: {} },
            { char: '🦟', names: {} },
            { char: '🦠', names: {} },
        ]
    },
    {
        name: 'plants',
        emojis: [
            { char: '💐', names: {} },
            { char: '🌸', names: {} },
            { char: '💮', names: {} },
            { char: '🏵️', names: {} },
            { char: '🌹', names: {} },
            { char: '🥀', names: {} },
            { char: '🌺', names: {} },
            { char: '🌻', names: {} },
            { char: '🌼', names: {} },
            { char: '🌷', names: {} },
            { char: '🌱', names: {} },
            { char: '🪴', names: {} },
            { char: '🌲', names: {} },
            { char: '🌳', names: {} },
            { char: '🌴', names: {} },
            { char: '🌵', names: {} },
            { char: '🌾', names: {} },
            { char: '🌿', names: {} },
            { char: '☘️', names: {} },
            { char: '🍀', names: {} },
            { char: '🍁', names: {} },
            { char: '🍂', names: {} },
            { char: '🍃', names: {} },
        ]
    },
    {
        name: 'food',
        emojis: [
            { char: '🍇', names: {} },
            { char: '🍈', names: {} },
            { char: '🍉', names: {} },
            { char: '🍊', names: {} },
            { char: '🍋', names: {} },
            { char: '🍌', names: {} },
            { char: '🍍', names: {} },
            { char: '🥭', names: {} },
            { char: '🍎', names: {} },
            { char: '🍏', names: {} },
            { char: '🍐', names: {} },
            { char: '🍑', names: {} },
            { char: '🍒', names: {} },
            { char: '🍓', names: {} },
            { char: '🫐', names: {} },
            { char: '🥝', names: {} },
            { char: '🍅', names: {} },
            { char: '🫒', names: {} },
            { char: '🥥', names: {} },
            { char: '🥑', names: {} },
        ]
    },
    {
        name: 'prepared_food',
        emojis: [
            { char: '🍞', names: {} },
            { char: '🥐', names: {} },
            { char: '🥖', names: {} },
            { char: '🥨', names: {} },
            { char: '🥯', names: {} },
            { char: '🥞', names: {} },
            { char: '🧇', names: {} },
            { char: '🧀', names: {} },
            { char: '🍖', names: {} },
            { char: '🍗', names: {} },
            { char: '🥩', names: {} },
            { char: '🥓', names: {} },
            { char: '🍔', names: {} },
            { char: '🍟', names: {} },
            { char: '🍕', names: {} },
            { char: '🌭', names: {} },
            { char: '🥪', names: {} },
            { char: '🌮', names: {} },
            { char: '🌯', names: {} },
            { char: '🫔', names: {} },
        ]
    },
    {
        name: 'drinks',
        emojis: [
            { char: '🥤', names: {} },
            { char: '🧋', names: {} },
            { char: '🧃', names: {} },
            { char: '🧉', names: {} },
            { char: '🧊', names: {} },
            { char: '🍶', names: {} },
            { char: '🍾', names: {} },
            { char: '🍷', names: {} },
            { char: '🍸', names: {} },
            { char: '🍹', names: {} },
            { char: '🍺', names: {} },
            { char: '🍻', names: {} },
            { char: '🥂', names: {} },
            { char: '🥃', names: {} },
            { char: '☕', names: {} },
            { char: '🫖', names: {} },
            { char: '🍵', names: {} },
        ]
    },
    {
        name: 'travel',
        emojis: [
            { char: '🚗', names: {} },
            { char: '🚕', names: {} },
            { char: '🚙', names: {} },
            { char: '🚌', names: {} },
            { char: '🚎', names: {} },
            { char: '🏎️', names: {} },
            { char: '🚓', names: {} },
            { char: '🚑', names: {} },
            { char: '🚒', names: {} },
            { char: '🚐', names: {} },
            { char: '🚚', names: {} },
            { char: '🚛', names: {} },
            { char: '🚜', names: {} },
            { char: '🏍️', names: {} },
            { char: '🛵', names: {} },
            { char: '🚲', names: {} },
            { char: '🚂', names: {} },
            { char: '🚆', names: {} },
            { char: '🚊', names: {} },
            { char: '🚉', names: {} },
        ]
    },
    {
        name: 'transport',
        emojis: [
            { char: '✈️', names: {} },
            { char: '🛩️', names: {} },
            { char: '🚁', names: {} },
            { char: '🚀', names: {} },
            { char: '🛸', names: {} },
            { char: '⛵', names: {} },
            { char: '🚢', names: {} },
            { char: '🛥️', names: {} },
            { char: '🛳️', names: {} },
            { char: '⚓', names: {} },
        ]
    },
    {
        name: 'time',
        emojis: [
            { char: '⌛', names: {} },
            { char: '⏳', names: {} },
            { char: '⌚', names: {} },
            { char: '⏰', names: {} },
            { char: '⏱️', names: {} },
            { char: '⏲️', names: {} },
            { char: '🕰️', names: {} },
            { char: '🕛', names: {} },
            { char: '🕧', names: {} },
            { char: '🕐', names: {} },
        ]
    },
    {
        name: 'weather',
        emojis: [
            { char: '☀️', names: {} },
            { char: '🌝', names: {} },
            { char: '🌞', names: {} },
            { char: '⭐', names: {} },
            { char: '🌟', names: {} },
            { char: '🌠', names: {} },
            { char: '☁️', names: {} },
            { char: '⛅', names: {} },
        ]
    }
];

function ifTranslationAvailableAdd(lang: string, translations: i18nTranslation[]): boolean {
    if (resources[lang as keyof typeof resources]) {
        translations.push(resources[lang as keyof typeof resources].translation);
        return true;
    }

    return false;
}

function getTranslations(langs: string[]): i18nTranslation[] {
    let translations: i18nTranslation[] = [];

    langs.forEach((lang) => {
        if (!ifTranslationAvailableAdd(lang, translations)) {
            ifTranslationAvailableAdd(lang.split("-")[0], translations);
        }
    })

    return translations;
}

export interface EmojiRepertoire {
    langs: string[];
    categories: EmojiCategory[];
}

export const emojiRepertoireBuilder = (lang: string): EmojiRepertoire => {
    let repertoire: EmojiRepertoire = { langs: [], categories: [] };
    // TODO(Farid): Fix the bugs that might occour when the other language is a variation of english (en-something).
    let translations = getTranslations([lang, "en"]);
    //console.log(translations);
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

    //console.log(repertoire);

    return repertoire;
}