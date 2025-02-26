"use client";

// pages/index.tsx
import { useState, useEffect, KeyboardEvent as ReactKeyboardEvent, useMemo } from 'react';
import Head from 'next/head';

// Define TypeScript interfaces
interface Emoji {
  char: string;
  name: string;
}

interface EmojiCategory {
  name: string;
  emojis: Emoji[];
}

export default function Home() {
  const [recentEmojis, setRecentEmojis] = useState<Emoji[]>([]);
  const [selectedEmojis, setSelectedEmojis] = useState<Emoji[]>([]);
  const [shiftPressed, setShiftPressed] = useState<boolean>(false);
  const [copyMessage, setCopyMessage] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Emoji[]>([]);

  // Emoji categories with emojis and their names
  const emojiCategories: EmojiCategory[] = [
    {
      name: 'Smileys & Emotion',
      emojis: [
        { char: '😀', name: 'grinning face' },
        { char: '😃', name: 'grinning face with big eyes' },
        { char: '😄', name: 'grinning face with smiling eyes' },
        { char: '😁', name: 'beaming face with smiling eyes' },
        { char: '😆', name: 'grinning squinting face' },
        { char: '😅', name: 'grinning face with sweat' },
        { char: '😂', name: 'face with tears of joy' },
        { char: '🤣', name: 'rolling on the floor laughing' },
        { char: '😊', name: 'smiling face with smiling eyes' },
        { char: '😇', name: 'smiling face with halo' },
        { char: '🙂', name: 'slightly smiling face' },
        { char: '🙃', name: 'upside-down face' },
        { char: '😉', name: 'winking face' },
        { char: '😌', name: 'relieved face' },
        { char: '😍', name: 'smiling face with heart-eyes' },
        { char: '🥰', name: 'smiling face with hearts' },
        { char: '😘', name: 'face blowing a kiss' },
        { char: '😗', name: 'kissing face' }
      ]
    },
    {
      name: 'People & Body',
      emojis: [
        { char: '👍', name: 'thumbs up' },
        { char: '👎', name: 'thumbs down' },
        { char: '👌', name: 'OK hand' },
        { char: '✌️', name: 'victory hand' },
        { char: '🤞', name: 'crossed fingers' },
        { char: '🤟', name: 'love-you gesture' },
        { char: '🤘', name: 'sign of the horns' },
        { char: '🤙', name: 'call me hand' },
        { char: '👈', name: 'backhand index pointing left' },
        { char: '👉', name: 'backhand index pointing right' },
        { char: '👆', name: 'backhand index pointing up' },
        { char: '👇', name: 'backhand index pointing down' },
        { char: '☝️', name: 'index pointing up' },
        { char: '👋', name: 'waving hand' },
        { char: '🤚', name: 'raised back of hand' }
      ]
    },
    {
      name: 'Animals & Nature',
      emojis: [
        { char: '🐶', name: 'dog face' },
        { char: '🐱', name: 'cat face' },
        { char: '🐭', name: 'mouse face' },
        { char: '🐹', name: 'hamster face' },
        { char: '🐰', name: 'rabbit face' },
        { char: '🦊', name: 'fox face' },
        { char: '🐻', name: 'bear face' },
        { char: '🐼', name: 'panda face' },
        { char: '🐨', name: 'koala face' },
        { char: '🐯', name: 'tiger face' },
        { char: '🦁', name: 'lion face' },
        { char: '🐮', name: 'cow face' },
        { char: '🌷', name: 'tulip' },
        { char: '🌹', name: 'rose' },
        { char: '🌺', name: 'hibiscus' }
      ]
    },
    {
      name: 'Food & Drink',
      emojis: [
        { char: '🍎', name: 'red apple' },
        { char: '🍐', name: 'pear' },
        { char: '🍊', name: 'tangerine' },
        { char: '🍋', name: 'lemon' },
        { char: '🍌', name: 'banana' },
        { char: '🍉', name: 'watermelon' },
        { char: '🍇', name: 'grapes' },
        { char: '🍓', name: 'strawberry' },
        { char: '🍈', name: 'melon' },
        { char: '🍒', name: 'cherries' },
        { char: '🍑', name: 'peach' },
        { char: '🥭', name: 'mango' },
        { char: '🍍', name: 'pineapple' },
        { char: '🥥', name: 'coconut' },
        { char: '🥝', name: 'kiwi fruit' }
      ]
    },
    {
      name: 'Travel & Places',
      emojis: [
        { char: '🚗', name: 'automobile' },
        { char: '🚕', name: 'taxi' },
        { char: '🚙', name: 'sport utility vehicle' },
        { char: '🚌', name: 'bus' },
        { char: '🚎', name: 'trolleybus' },
        { char: '🏎️', name: 'racing car' },
        { char: '🚓', name: 'police car' },
        { char: '🚑', name: 'ambulance' },
        { char: '🚒', name: 'fire engine' },
        { char: '✈️', name: 'airplane' },
        { char: '🚀', name: 'rocket' },
        { char: '🛸', name: 'flying saucer' },
        { char: '🚁', name: 'helicopter' },
        { char: '⛵', name: 'sailboat' },
        { char: '🚢', name: 'ship' }
      ]
    }
  ];

  // Memoize allEmojis to prevent recreation on every render
  const allEmojis = useMemo(() => {
    return emojiCategories.flatMap(category => category.emojis);
  }, []);

  useEffect(() => {
    // Load recent emojis from localStorage on component mount
    const storedEmojis = localStorage.getItem('recentEmojis');
    if (storedEmojis) {
      setRecentEmojis(JSON.parse(storedEmojis));
    }

    // Set up event listeners for shift key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setShiftPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setShiftPressed(false);
        if (selectedEmojis.length > 0) {
          copyToClipboard(selectedEmojis.map(emoji => emoji.char).join(''));
          setSelectedEmojis([]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [selectedEmojis]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = allEmojis.filter(emoji =>
      emoji.name.toLowerCase().includes(query) ||
      emoji.char.includes(query)
    );

    setSearchResults(results);
  }, [searchQuery, allEmojis]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage(`Copied: ${text}`);
      setTimeout(() => setCopyMessage(''), 2000);
    } catch (err) {
      setCopyMessage('Failed to copy to clipboard');
      console.error('Failed to copy: ', err);
    }
  };

  const handleEmojiClick = (emoji: Emoji) => {
    if (shiftPressed) {
      // If shift is pressed, add to selection
      setSelectedEmojis([...selectedEmojis, emoji]);
    } else {
      // Copy single emoji and update recent
      copyToClipboard(emoji.char);
      updateRecentEmojis(emoji);
    }
  };

  const updateRecentEmojis = (emoji: Emoji) => {
    // Create a new array with the clicked emoji at the front
    const updatedRecent = [
      emoji,
      ...recentEmojis.filter(e => e.char !== emoji.char)
    ].slice(0, 20);

    setRecentEmojis(updatedRecent);

    // Save to localStorage
    localStorage.setItem('recentEmojis', JSON.stringify(updatedRecent));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    // Clear search on Escape key
    if (e.key === 'Escape') {
      setSearchQuery('');
    }
  };

  // Render emoji grid
  const renderEmojiGrid = (emojis: Emoji[]) => (
    <div className="grid grid-cols-8 gap-2 md:grid-cols-10 lg:grid-cols-12">
      {emojis.map((emoji, index) => (
        <button
          key={`emoji-${index}-${emoji.char}`}
          className={`text-2xl p-2 border rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${selectedEmojis.some(e => e.char === emoji.char) ? 'bg-cyan-100 border-cyan-300' : ''
            }`}
          onClick={() => handleEmojiClick(emoji)}
          title={emoji.name}
        >
          {emoji.char}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>Simple Emoji</title>
        <meta name="description" content="Copy emojis with a click" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto md:max-w-xl lg:max-w-3xl">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Simple Emoji</h1>

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
                    placeholder="Search emojis..."
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
                <p>Hold Shift to select multiple emojis • Search by emoji name</p>
              </div>

              {/* Selected emojis display */}
              {selectedEmojis.length > 0 && (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <h2 className="text-sm font-medium text-gray-700 mb-2">Selected Emojis <span className="text-xs text-gray-500">(Release Shift to copy)</span></h2>
                  <div className="text-2xl">{selectedEmojis.map(emoji => emoji.char).join('')}</div>
                </div>
              )}

              {/* Search results */}
              {searchResults.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Search Results</h2>
                  {renderEmojiGrid(searchResults)}
                </div>
              )}

              {/* Recent emojis */}
              {recentEmojis.length > 0 && !searchQuery && (
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Recent</h2>
                  {renderEmojiGrid(recentEmojis)}
                </div>
              )}

              {/* Emoji categories - only show when not searching */}
              {!searchQuery && emojiCategories.map((category) => (
                <div key={category.name} className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">{category.name}</h2>
                  {renderEmojiGrid(category.emojis)}
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}