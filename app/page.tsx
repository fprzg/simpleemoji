"use client";

// pages/index.tsx
import { useState, useEffect, KeyboardEvent as ReactKeyboardEvent, useMemo, useCallback } from 'react';
import { useTranslation } from "react-i18next";
import "@/i18n";
import Head from 'next/head';
import { Emoji } from "@/types/emoji";
import { emojiRepertoireBuilder } from "@/utils/emoji-utils";


export default function Home() {
  const [recentEmojis, setRecentEmojis] = useState<Emoji[]>([]);
  const [selectedEmojis, setSelectedEmojis] = useState<Emoji[]>([]);
  const [controlPressed, setControlPressed] = useState<boolean>(false);
  const [copyMessage, setCopyMessage] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Emoji[]>([]);

  const { t, i18n } = useTranslation();

  // Memoize allEmojis to prevent recreation on every render
  const emojiRepertoire = useMemo(() => {
    return emojiRepertoireBuilder(i18n.language);
  }, [i18n.language]);

  const allEmojis = useMemo(() => {
    return emojiRepertoire.categories.flatMap((category) => category.emojis);

  }, [emojiRepertoire]);

  const copyToClipboard = async (emojis: Emoji[]) => {
    const text = emojis.map(emoji => emoji.char).join('');
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage(`Copied: ${text}`);
      setTimeout(() => setCopyMessage(''), 2000);
    } catch (err) {
      setCopyMessage('Failed to copy to clipboard');
      console.error('Failed to copy: ', err);
    }
  };

  const copyAndAddToRecent = useCallback((toAdd: Emoji[]) => {
    let newUpdated = [...recentEmojis];

    for (const emoji of toAdd) {
      newUpdated = newUpdated.filter(e => e !== emoji);
      newUpdated.unshift(emoji);
    }

    newUpdated = newUpdated.slice(0, 20);

    // Update state and localStorage
    setRecentEmojis(newUpdated);
    localStorage.setItem('recentEmojis', JSON.stringify(newUpdated));
    copyToClipboard(toAdd);
  }, [recentEmojis, setRecentEmojis]);

  useEffect(() => {
    // Load recent emojis from localStorage on component mount
    const storedEmojis = localStorage.getItem('recentEmojis');
    if (storedEmojis) {
      setRecentEmojis(JSON.parse(storedEmojis));
    }
  }, []);

  useEffect(() => {
    // Set up event listeners for control key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Control') {
        setControlPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Control') {
        setControlPressed(false);

        if (selectedEmojis.length > 0) {
          copyAndAddToRecent(selectedEmojis);
          setSelectedEmojis([]);
        }
      }
    };

    const handleBlur = () => {
      //setControlPressed(false);
    };

    const handleFocus = () => {
      if (selectedEmojis.length > 0) {
        copyAndAddToRecent(selectedEmojis);
        setSelectedEmojis([]);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [selectedEmojis, copyAndAddToRecent]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();

    const results = allEmojis.filter(emoji => {
      const name = emoji.names["en"]?.toLowerCase();
      return name?.toLowerCase().includes(query);
    }
      //emoji.names.en.toLowerCase().includes(query) ||
      //emoji.names["en"].toLowerCase().includes(query) ||
      //emoji.names.en.includes(query)
    );

    setSearchResults(results);
  }, [searchQuery, emojiRepertoire, allEmojis]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    // Clear search on Escape key
    if (e.key === 'Escape') {
      setSearchQuery('');
    }
  };

  const getEmojiName = (emoji: Emoji): string => {
    if (emoji.names !== undefined) {
      for (const lang of emojiRepertoire.langs) {
        if (lang in emoji.names) {
          return emoji.names[lang];
        }
      }
    }

    return emoji.char;
  };

  // Render emoji grid
  const renderEmojiGrid = (emojis: Emoji[]) => (
    <div className="grid grid-cols-8 gap-2 md:grid-cols-10 lg:grid-cols-12">
      {emojis.map((emoji, index) => (
        <button
          key={`emoji-${index}-${emoji}`}
          className={`text-2xl p-2 border rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${selectedEmojis.some(e => e === emoji) ? 'bg-cyan-100 border-cyan-300' : ''
            }`}
          onClick={() => {
            if (controlPressed) {
              // If control is pressed, add to selection
              setSelectedEmojis([...selectedEmojis, emoji]);
            } else {
              copyAndAddToRecent([emoji]);
            }
          }}
          title={getEmojiName(emoji)}
        >
          {emoji.char}
        </button>
      ))
      }
    </div >
  );

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>{t("ui.title")}</title>
        <meta name="description" content="{t('ui.description')}" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
        {/*
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg sm:rounded-3xl"></div>
        */}
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto md:max-w-xl lg:max-w-3xl">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">{t("ui.title")}</h1>

              <div className="text-right mb-4">
                <button onClick={() => i18n.changeLanguage("en")} className='mr-2'>us English</button>
                <br />
                <button onClick={() => i18n.changeLanguage("es")} className='mr-2'>es Español</button>
              </div>

              {/* Copy message */}
              {copyMessage && (
                <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
                  {copyMessage}
                </div>
              )}

              {/* Search input */}
              <div className="mb-6">
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    className="focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-4 pr-10 py-3 sm:text-sm border-gray-300 rounded-md"
                    placeholder={t("ui.searchPlaceholder")}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                  />
                  {searchQuery && (
                    <button
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                      onClick={() => setSearchQuery('')}
                    >
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>{t("ui.holdControl")}</p>
              </div>

              {/* Selected emojis display */}
              <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h2 className="text-sm font-medium text-gray-700 mb-2">{t("ui.selectedEmojis")}<span className="text-xs text-gray-500">{t("selectedEmojisInstructions")}</span></h2>
                <div className="text-2xl">
                  {selectedEmojis.length > 0 && (
                    <>
                      {selectedEmojis.map(emoji => emoji.char).join('')}
                    </>
                  )}
                </div>
              </div>

              {/* Search results */}
              {searchQuery !== "" && (
                <div className="mb-6">
                  {searchResults.length > 0 ? (
                    <>
                      < h2 className="text-lg font-medium text-gray-900 mb-2">{t("ui.searchResults")}</h2>
                      {renderEmojiGrid(searchResults)}
                    </>
                  ) : (
                    <>
                      <div className="text-lg text-gray-700">{t("ui.noMatch")}</div>
                    </>
                  )}
                </div>
              )}

              {/* Recent emojis */}
              {recentEmojis.length > 0 && !searchQuery && (
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">{t("ui.recent")}</h2>
                  {renderEmojiGrid(recentEmojis)}
                </div>
              )}

              {/* Emoji categories - only show when not searching */}
              {!searchQuery && emojiRepertoire.categories.map((category) => (
                <div key={category.name} className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">
                    {t(`categories.${category.name}`)}
                  </h2>
                  {renderEmojiGrid(category.emojis)}
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div >
  );
}