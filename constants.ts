
import { Chat, Call } from './types';
import { Zap, ShieldCheck, Sticker, Lock, Globe } from 'lucide-react';
import React from 'react';

export const DEFAULT_CHATS: Chat[] = [
  {
    id: 'ai_assistant',
    userId: 'ai_service',
    user: {
      id: 'ai_service',
      name: 'NonGram', 
      avatar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMzMzkwZjciLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM3ZTM0ZjkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48Y2lyY2xlIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjI1NiIgZmlsbD0idXJsKCNhKSIvPjxwYXRoIGQ9Ik0xNjAgMzgwVjEzMmg1MGwxNDAgMTkwVjEzMmg1MHYyNDhoLTUwTDIxMCAxOTB2MTkwaC01MHoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=',
      isOnline: true,
      systemInstruction: 'You are the official NonGram AI assistant. NonGram is a modern, privacy-focused clone of Telegram. You help the user with questions about the app. Be polite, concise, and helpful.'
    },
    messages: [
      {
        id: 'm1',
        text: 'Добро пожаловать в NonGram! 🚀\n\nСамый современный и функциональный мессенджер.',
        senderId: 'ai_service',
        timestamp: Date.now() - 100000,
        status: 'read',
        type: 'text'
      },
      {
        id: 'm3',
        text: 'Попробуй отправить мне кружочек или голосовое!',
        senderId: 'ai_service',
        timestamp: Date.now(),
        status: 'read',
        type: 'text'
      }
    ],
    unreadCount: 1,
    lastMessage: 'Попробуй отправить мне кружочек или голосовое!',
    lastMessageTime: Date.now(),
    isPinned: true
  }
];

export const COUNTRY_CODES = [
  { code: '+1', country: 'USA' },
  { code: '+7', country: 'Russia' },
  { code: '+380', country: 'Ukraine' },
  { code: '+44', country: 'UK' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+81', country: 'Japan' },
  { code: '+86', country: 'China' },
  { code: '+971', country: 'UAE' },
];

export const WALLPAPERS = [
  'https://web.telegram.org/img/bg_0.png', // Default Telegram Dark
  'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)', // Deep Purple
  'linear-gradient(to top, #09203f 0%, #537895 100%)', // Underwater
  'linear-gradient(15deg, #13547a 0%, #80d0c7 100%)', // Aqua
  'linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)', // Night Sky
  'linear-gradient(to right, #434343 0%, black 100%)', // Dark Metal
];

export const MOCK_CALLS: Call[] = [
    { id: '1', name: 'Павел Дуров', type: 'incoming', date: 'Сегодня, 10:45', missed: true, avatar: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Pavel_Durov_2017.jpg' },
    { id: '2', name: 'Elon Musk', type: 'outgoing', date: 'Вчера, 18:30', missed: false, avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg' },
];

export const MOCK_NEARBY = [
    { id: 'n1', name: 'Анна', distance: '100 м', avatar: 'https://i.pravatar.cc/150?u=a' },
    { id: 'n2', name: 'Дмитрий', distance: '300 м', avatar: 'https://i.pravatar.cc/150?u=d' },
    { id: 'n3', name: 'Мария', distance: '500 м', avatar: 'https://i.pravatar.cc/150?u=m' },
    { id: 'n4', name: 'Иван', distance: '850 м', avatar: 'https://i.pravatar.cc/150?u=i' },
    { id: 'g1', name: 'Тусовка IT', distance: '1.2 км', isGroup: true, members: 156, avatar: '' },
];

export const FEATURES = [
    { title: 'Скорость', desc: 'NonGram доставляет сообщения быстрее, чем любое другое приложение.', icon: React.createElement(Zap, {className: "text-yellow-400"}) },
    { title: 'Безопасность', desc: 'Мы защищаем ваши сообщения от хакерских атак.', icon: React.createElement(ShieldCheck, {className: "text-green-400"}) },
    { title: 'Безлимитное облако', desc: 'Неограниченное место для хранения ваших медиа и файлов.', icon: React.createElement(Globe, {className: "text-blue-400"}) },
    { title: 'Мощные стикеры', desc: 'Выражайте эмоции с помощью анимированных стикеров.', icon: React.createElement(Sticker, {className: "text-orange-400"}) },
    { title: 'Шифрование', desc: 'Все чаты защищены сквозным шифрованием (в секретных чатах).', icon: React.createElement(Lock, {className: "text-purple-400"}) },
];

export const STICKER_SETS = [
  {
    name: "Hot Cherry",
    stickers: [
      "https://cdn-icons-png.flaticon.com/256/742/742751.png",
      "https://cdn-icons-png.flaticon.com/256/742/742752.png",
      "https://cdn-icons-png.flaticon.com/256/742/742760.png",
      "https://cdn-icons-png.flaticon.com/256/742/742750.png",
      "https://cdn-icons-png.flaticon.com/256/742/742918.png",
      "https://cdn-icons-png.flaticon.com/256/742/742940.png"
    ]
  },
  {
    name: "Cool Duck",
    stickers: [
      "https://cdn-icons-png.flaticon.com/256/1998/1998610.png",
      "https://cdn-icons-png.flaticon.com/256/1998/1998627.png",
      "https://cdn-icons-png.flaticon.com/256/1998/1998592.png",
      "https://cdn-icons-png.flaticon.com/256/1998/1998670.png",
      "https://cdn-icons-png.flaticon.com/256/1998/1998765.png",
      "https://cdn-icons-png.flaticon.com/256/1998/1998749.png"
    ]
  },
  {
    name: "Doge",
    stickers: [
      "https://cdn-icons-png.flaticon.com/256/616/616554.png",
      "https://cdn-icons-png.flaticon.com/256/616/616430.png",
      "https://cdn-icons-png.flaticon.com/256/616/616569.png",
      "https://cdn-icons-png.flaticon.com/256/616/616494.png",
      "https://cdn-icons-png.flaticon.com/256/616/616574.png",
      "https://cdn-icons-png.flaticon.com/256/616/616408.png"
    ]
  }
];

export const TRENDING_GIFS = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3V4cDR5eW54aTh2eWx4cDR5eW54aTh2eWx4cDR5eW54aTh2eWx4cDR5eW54aTh2eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L1R1TVThqceK6M7tZf/giphy.mp4",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZ0c3Z0c3Z0c3Z0c3Z0c3Z0c3Z0c3Z0c3Z0c3Z0c3Z0c3Z0c3Z0c3Z0c3Z0cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26ufdipQqU2lhNA4g/giphy.mp4",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTh2eWx4cDR5eW54aTh2eWx4cDR5eW54aTh2eWx4cDR5eW54aTh2eWx4cDR5eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKr3nzbh5WgCFxe/giphy.mp4",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3V4cDR5eW54aTh2eWx4cDR5eW54aTh2eWx4cDR5eW54aTh2eWx4cDR5eW54aTh2eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JIX9t2j0ZTN9S/giphy.mp4",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3V4cDR5eW54aTh2eWx4cDR5eW54aTh2eWx4cDR5eW54aTh2eWx4cDR5eW54aTh2eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mlvseq9yvZhba/giphy.mp4",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3V4cDR5eW54aTh2eWx4cDR5eW54aTh2eWx4cDR5eW54aTh2eWx4cDR5eW54aTh2eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Cmr1OMJ2FN0B2/giphy.mp4"
];

export const EMOJI_CATEGORIES = {
    'Smileys': ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '🥲', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳', '😏', '😒', '😞', '😔', 'worried', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', 'sneezing', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', 'RG', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃'],
    'Hands': ['👋', '🤚', 'Vk', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '💅', '🤳', '💪'],
    'Hearts': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟'],
    'Nature': ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🪱', '🐛', '🦋', '🐌', '🐞', '🐜', '🪰', '🪲', '🪳', '🦟', '🦗', '🕷', '🕸', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🦣', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦬', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊', '🐇', '🦝', '🦨', '🦡', '🦫', '🦦', '🦥', '🐁', '🐀', '🐿', '🦔', '🐾', '🐉', '🐲', '🌵', '🎄', '🌲', '🌳', '🌴', '🪵', '🌱', '🌿', '☘️', '🍀', '🎍', '🪴', '🎋', '🍃', '🍂', '🍁', '🍄', '🐚', '🪨', '🌾', '💐', '🌷', '🌹', '🥀', '🌺', '🌸', '🌼', '🌻', '🌞', '🌝', '🌛', '🌜', '🌚', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌙', '🌎', '🌍', '🌏', '🪐', '💫', '⭐️', '🌟', '✨', '⚡️', '☄️', '💥', '🔥', '🌪', '🌈', '☀️', '🌤', '⛅️', '🌥', '☁️', '🌦', '🌧', '⛈', '🌩', '🌨', '❄️', '☃️', '⛄️', '🌬', '💨', '💧', '💦', '☔️', '☂️', '🌊'],
    'Food': ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🫓', '🥪', '🥙', '🧆', '🌮', '🌯', '🫔', '🥗', '🥘', '🫕', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '🫖', '☕️', '🍵', '🧃', '🥤', '🧋', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', '🍾', '🧊', '🥄', '🍴', '🍽', '🥣', '🥡', '🥢', '🧂'],
};
