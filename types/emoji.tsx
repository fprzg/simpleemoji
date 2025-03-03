export interface Emoji {
    char: string;
    names: {
        [language: string]: string;
    }
};

export interface EmojiCategory {
    name: string;
    emojis: Emoji[];
};