
import React, { useState, useEffect } from 'react';
import { Chat, Message, UserProfile, MessageType, AppSettings, ViewType, Call } from './types';
import { ChatList } from './components/ChatList';
import { ChatScreen } from './components/ChatScreen';
import { AuthScreen } from './components/AuthScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { apiClient } from './client/apiClient';
import { ArrowLeft, UserPlus, Phone, Users, MapPin, Share2, Zap, ShieldCheck, Sticker, CheckCircle2 } from 'lucide-react';
import { MOCK_NEARBY, FEATURES } from './constants';

export default function App() {
  // --- Global State ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [view, setView] = useState<ViewType>('main');
  
  // --- App Settings ---
  const [appSettings, setAppSettings] = useState<AppSettings>(() => {
      const saved = localStorage.getItem('nongram_settings');
      return saved ? JSON.parse(saved) : {
          messageTextSize: 16,
          messageCornerRadius: 16,
          wallpaper: 'https://web.telegram.org/img/bg_0.png',
          privacyLocked: true,
          privacyPhone: false,
          privacyLastSeen: true,
          notificationsChat: true,
          notificationsGroup: true,
          notificationsChannel: true,
          sound: true,
          vibration: true,
          autoDownloadWifi: true,
          autoDownloadCellular: false,
          powerSaving: false
      };
  });

  // Persist settings
  useEffect(() => {
      localStorage.setItem('nongram_settings', JSON.stringify(appSettings));
  }, [appSettings]);

  // --- Data State ---
  const [chats, setChats] = useState<Chat[]>([]);
  const [calls, setCalls] = useState<Call[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [typingStatus, setTypingStatus] = useState<{[chatId: string]: boolean}>({});

  // --- Initialization ---
  useEffect(() => {
    const init = async () => {
        const user = await apiClient.auth.getSession();
        if (user) {
            setUserProfile(user);
            setIsAuthenticated(true);
            const loadedChats = await apiClient.chat.getAll();
            setChats(loadedChats);
            const loadedCalls = await apiClient.chat.getCalls();
            setCalls(loadedCalls);
        }
        setIsLoading(false);
    };
    init();
  }, []);

  // --- Actions ---

  const handleLogin = async (profileData: UserProfile) => {
    setIsLoading(true);
    const user = await apiClient.auth.register(profileData);
    setUserProfile(user);
    setIsAuthenticated(true);
    const loadedChats = await apiClient.chat.getAll();
    setChats(loadedChats);
    const loadedCalls = await apiClient.chat.getCalls();
    setCalls(loadedCalls);
    setIsLoading(false);
  };

  const handleLogout = async () => {
      await apiClient.auth.logout();
      setIsAuthenticated(false);
      setUserProfile(null);
      setChats([]);
      setView('main');
  };

  const handleSelectChat = (chatId: string) => {
    if (chatId === 'saved_messages') {
        const existing = chats.find(c => c.isSavedMessages);
        if (existing) {
            setSelectedChatId(existing.id);
        } else {
             const savedChat: Chat = {
                 id: 'saved_messages',
                 userId: userProfile?.id || 'me',
                 user: { 
                     ...userProfile!, 
                     name: 'Избранное', 
                     id: userProfile?.id || 'me', 
                     isOnline: false,
                     avatar: userProfile?.avatar || ''
                 },
                 messages: [],
                 unreadCount: 0,
                 isSavedMessages: true,
                 lastMessageTime: Date.now()
             };
             setChats(prev => [savedChat, ...prev]);
             setSelectedChatId('saved_messages');
        }
    } else {
        setSelectedChatId(chatId);
        setChats(prev => prev.map(chat => 
            chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
        ));
    }
  };

  const handleAddContact = async () => {
    const names = ['Павел Дуров', 'Elon Musk', 'Steve Jobs', 'Albert Einstein', 'Sherlock Holmes', 'Tony Stark'];
    const name = prompt("Введите имя нового контакта:", names[Math.floor(Math.random() * names.length)]);
    
    if (name) {
        setIsLoading(true);
        const newChat = await apiClient.chat.create(name);
        setChats(prev => [newChat, ...prev]); 
        setSelectedChatId(newChat.id);
        setIsLoading(false);
        setView('main');
    }
  };

  const handleCreateGroup = async () => {
      const name = prompt("Название группы:");
      if (name) {
          setIsLoading(true);
          const newChat = await apiClient.chat.createGroup(name);
          setChats(prev => [newChat, ...prev]);
          setIsLoading(false);
          setView('main');
          setSelectedChatId(newChat.id);
      }
  }

  const handleDeleteChat = async (chatId: string) => {
      if (confirm("Удалить этот чат?")) {
          // If the deleted chat is open, close it
          if (selectedChatId === chatId) {
              setSelectedChatId(null);
          }
          setChats(prev => prev.filter(c => c.id !== chatId));
          await apiClient.chat.deleteChat(chatId);
      }
  };

  const handlePinChat = async (chatId: string) => {
      setChats(prev => prev.map(c => c.id === chatId ? {...c, isPinned: !c.isPinned} : c));
      await apiClient.chat.togglePin(chatId);
  }

  const handleMarkRead = (chatId: string) => {
      setChats(prev => prev.map(c => c.id === chatId ? {...c, unreadCount: 0} : c));
  }

  const handleSendCommon = async (chatId: string, text: string, type: MessageType = 'text', url?: string, duration?: number, replyTo?: Message) => {
    const optimisticId = 'temp_' + Date.now();
    
    const optimisticMessage: Message = {
        id: optimisticId,
        text,
        type,
        mediaUrl: url,
        duration,
        senderId: 'me',
        timestamp: Date.now(),
        status: 'pending',
        replyTo: replyTo ? {
            id: replyTo.id,
            text: replyTo.text || (replyTo.type === 'text' ? '' : replyTo.type || 'Media'),
            senderName: replyTo.senderId === 'me' ? 'Вы' : chats.find(c => c.id === chatId)?.user.name || 'User',
            type: replyTo.type
        } : undefined
    };

    setChats(prev => prev.map(chat => {
        if (chat.id === chatId) {
            return {
                ...chat,
                messages: [...chat.messages, optimisticMessage],
                lastMessage: text || (type === 'text' ? '' : type),
                lastMessageTime: Date.now()
            };
        }
        return chat;
    }).sort((a, b) => (b.lastMessageTime || 0) - (a.lastMessageTime || 0)));

    setTypingStatus(prev => ({ ...prev, [chatId]: true }));
    
    try {
        const { message, reply } = type === 'text' 
            ? await apiClient.chat.send(chatId, text, replyTo)
            : await apiClient.chat.sendMedia(chatId, type, url, duration, undefined, replyTo);
        
        setChats(prev => prev.map(chat => {
            if (chat.id === chatId) {
                const cleanMessages = chat.messages.filter(m => m.id !== optimisticId);
                const newMessages = [...cleanMessages, message];
                if (reply) newMessages.push(reply);

                return {
                    ...chat,
                    messages: newMessages,
                    lastMessage: reply ? reply.text : (message.text || message.type!),
                    lastMessageTime: reply ? reply.timestamp : message.timestamp
                };
            }
            return chat;
        }).sort((a, b) => (b.lastMessageTime || 0) - (a.lastMessageTime || 0)));

    } catch (error) {
        console.error("Message failed", error);
    } finally {
        setTypingStatus(prev => ({ ...prev, [chatId]: false }));
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!selectedChatId) return;

    setChats(prev => prev.map(chat => {
        if (chat.id === selectedChatId) {
            const updatedMessages = chat.messages.filter(m => m.id !== messageId);
            const lastMsg = updatedMessages.length > 0 ? updatedMessages[updatedMessages.length - 1] : null;
            return {
                ...chat,
                messages: updatedMessages,
                lastMessage: lastMsg ? (lastMsg.text || lastMsg.type!) : '',
                lastMessageTime: lastMsg ? lastMsg.timestamp : chat.lastMessageTime
            };
        }
        return chat;
    }));

    try {
        await apiClient.chat.deleteMessage(selectedChatId, messageId);
    } catch (e) {
        console.error("Delete failed", e);
    }
  };

  const handleEditMessage = async (messageId: string, newText: string) => {
      if (!selectedChatId) return;

      setChats(prev => prev.map(chat => {
          if (chat.id === selectedChatId) {
              const updatedMessages = chat.messages.map(m => 
                  m.id === messageId ? { ...m, text: newText, isEdited: true } : m
              );
              const isLast = chat.messages[chat.messages.length - 1].id === messageId;
              
              return {
                  ...chat,
                  messages: updatedMessages,
                  lastMessage: isLast ? newText : chat.lastMessage
              };
          }
          return chat;
      }));

      try {
          await apiClient.chat.editMessage(selectedChatId, messageId, newText);
      } catch (e) {
          console.error("Edit failed", e);
      }
  };

  const handleClearHistory = async (chatId: string) => {
      if (confirm("Вы уверены, что хотите очистить историю? Это действие нельзя отменить.")) {
           setChats(prev => prev.map(chat => {
              if (chat.id === chatId) {
                  return {
                      ...chat,
                      messages: [],
                      lastMessage: '',
                      lastMessageTime: chat.lastMessageTime
                  };
              }
              return chat;
           }));
           await apiClient.chat.clearHistory(chatId);
           // Do not close chat, just clear content
      }
  };

  const handleEndCall = async (duration: number) => {
      if (selectedChatId && selectedChat) {
          const newCall: Call = {
              id: Date.now().toString(),
              name: selectedChat.user.name,
              avatar: selectedChat.user.avatar,
              type: 'outgoing',
              date: 'Только что',
              missed: false,
              duration: duration
          };
          setCalls(prev => [newCall, ...prev]);
          await apiClient.chat.logCall(newCall);
      }
  };

  const selectedChat = chats.find((c) => c.id === selectedChatId);

  // Helper for sub-screens
  const ScreenHeader = ({title, onBack, rightIcon}: {title: string, onBack: () => void, rightIcon?: React.ReactNode}) => (
      <div className="flex items-center justify-between px-4 py-3 bg-[#1c1c1d] sticky top-0 z-20 shadow-sm border-b border-black">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="active:opacity-70"><ArrowLeft size={24} color="white"/></button>
            <h2 className="text-[20px] font-semibold text-white">{title}</h2>
          </div>
          {rightIcon && <button className="text-blue-400">{rightIcon}</button>}
      </div>
  );

  if (isLoading) {
      return (
          <div className="w-full h-dvh bg-[#000000] flex items-center justify-center">
              <div className="animate-scale-in">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100" height="100">
                    <defs><linearGradient id="a" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3390f7"/><stop offset="100%" stopColor="#7e34f9"/></linearGradient></defs>
                    <circle cx="256" cy="256" r="256" fill="url(#a)"/>
                    <path d="M160 380V132h50l140 190V132h50v248h-50L210 190v190h-50z" fill="#fff"/>
                 </svg>
              </div>
          </div>
      );
  }

  if (!isAuthenticated) {
      return (
          <div className="w-full h-dvh bg-black flex justify-center">
               <div className="w-full h-full max-w-md bg-[#1c1c1d] shadow-2xl overflow-hidden">
                   <AuthScreen onComplete={handleLogin} />
               </div>
          </div>
      );
  }

  return (
    <div className="w-full h-dvh bg-black flex justify-center overflow-hidden">
      <div className="w-full h-full max-w-md bg-[#1c1c1d] shadow-2xl overflow-hidden flex flex-col relative text-white">
        
        {/* CHAT SCREEN OVERLAY - z-index 50 to cover ChatList FAB */}
        {selectedChatId && selectedChat && (
          <div className="absolute inset-0 z-50 w-full h-full bg-[#0f0f0f]">
              <ChatScreen 
                chat={selectedChat} 
                settings={appSettings}
                onBack={() => setSelectedChatId(null)} 
                onSendMessage={(text, replyTo) => handleSendCommon(selectedChatId, text, 'text', undefined, undefined, replyTo)}
                onSendMedia={(type, url, duration, replyTo) => handleSendCommon(selectedChatId, '', type, url, duration, replyTo)}
                onDeleteMessage={handleDeleteMessage}
                onEditMessage={handleEditMessage}
                onClearHistory={() => handleClearHistory(selectedChatId)}
                onEndCall={handleEndCall}
                isTyping={!!typingStatus[selectedChatId]}
              />
          </div>
        )}

        {/* SETTINGS VIEW - z-index 50 */}
        {view === 'settings' && userProfile && (
             <div className="absolute inset-0 z-50 w-full h-full bg-[#1c1c1d]">
                  <SettingsScreen 
                    user={userProfile} 
                    settings={appSettings}
                    onBack={() => setView('main')} 
                    onLogout={handleLogout}
                    onUpdateUser={(updated) => setUserProfile(updated)}
                    onUpdateSettings={setAppSettings}
                  />
             </div>
        )}

        {/* SUB SCREENS - z-index 50 */}
        {view === 'contacts' && (
            <div className="absolute inset-0 z-50 w-full h-full bg-[#000] animate-slide-in-right flex flex-col">
                <ScreenHeader title="Контакты" onBack={() => setView('main')} rightIcon={<UserPlus size={22} />} />
                <div 
                    onClick={handleAddContact}
                    className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-[#1c1c1d]"
                >
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <UserPlus size={20} className="text-white" />
                    </div>
                    <span className="text-blue-400 font-medium">Пригласить друга</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="px-4 py-2 bg-[#0a0a0a] text-gray-500 text-xs font-bold uppercase sticky top-0">Сортировка по времени</div>
                    {['Anna', 'Boris', 'Clara', 'David', 'Elena', 'Grigory', 'Zendaya'].map(name => (
                         <div key={name} className="flex items-center gap-4 px-4 py-2.5 hover:bg-[#1c1c1d] cursor-pointer" onClick={() => handleAddContact()}>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-white font-bold text-lg">
                                {name[0]}
                            </div>
                            <div className="flex-1 border-b border-gray-800 pb-2.5">
                                <h3 className="text-white font-medium text-[16px]">{name}</h3>
                                <p className="text-gray-500 text-xs">был(а) недавно</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {view === 'calls' && (
             <div className="absolute inset-0 z-50 w-full h-full bg-[#000] animate-slide-in-right flex flex-col">
                <ScreenHeader title="Звонки" onBack={() => setView('main')} rightIcon={<Phone size={22} />} />
                <div className="flex-1 overflow-y-auto">
                    {calls.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <p>Нет недавних звонков</p>
                        </div>
                    ) : (
                        calls.map(call => (
                        <div key={call.id} className="flex items-center gap-3 px-4 py-3 hover:bg-[#1c1c1d]">
                             <img src={call.avatar || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'} className="w-12 h-12 rounded-full object-cover" />
                             <div className="flex-1">
                                 <h3 className={`font-medium ${call.missed ? 'text-red-500' : 'text-white'}`}>{call.name}</h3>
                                 <div className="flex items-center gap-1 text-gray-500 text-sm">
                                     {call.type === 'incoming' ? '↙' : '↗'} {call.date} {call.duration ? `(${Math.floor(call.duration/60)}:${(call.duration%60).toString().padStart(2, '0')})` : ''}
                                 </div>
                             </div>
                             <Phone size={24} className="text-green-500 p-1" />
                        </div>
                    )))}
                </div>
             </div>
        )}

        {view === 'create_group' && (
             <div className="absolute inset-0 z-50 w-full h-full bg-[#000] animate-slide-in-right flex flex-col">
                 <ScreenHeader title="Создать группу" onBack={() => setView('main')} />
                 <div className="p-4 flex flex-col items-center">
                     <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                         <Users size={40} className="text-white" />
                     </div>
                     <p className="text-center text-gray-400 mb-6 px-8 text-sm">Создайте группу для общения с друзьями, коллегами или семьей.</p>
                     <button onClick={handleCreateGroup} className="w-full py-3 bg-blue-500 rounded-lg font-bold text-white shadow-md active:scale-95 transition-transform">Назвать группу и создать</button>
                 </div>
             </div>
        )}

        {view === 'nearby' && (
             <div className="absolute inset-0 z-50 w-full h-full bg-[#000] animate-slide-in-right flex flex-col">
                 <ScreenHeader title="Люди рядом" onBack={() => setView('main')} />
                 <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-col items-center py-8 px-4 text-center border-b border-gray-800 bg-[#1c1c1d]">
                        <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 animate-pulse">
                            <MapPin size={40} className="text-blue-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Люди рядом</h3>
                        <p className="text-gray-400 text-sm mb-4">Обменивайтесь контактами с людьми поблизости.<br/>Ваш номер телефона останется скрытым.</p>
                        <button className="text-blue-400 font-medium text-sm uppercase tracking-wide">Включить геолокацию</button>
                    </div>
                    
                    <div className="px-4 py-2 bg-[#0a0a0a] text-gray-500 text-xs font-bold uppercase">Пользователи рядом</div>
                     {MOCK_NEARBY.map(u => (
                         <div key={u.id} className="flex items-center gap-3 px-4 py-3 hover:bg-[#1c1c1d] cursor-pointer">
                             {u.avatar ? <img src={u.avatar} className="w-10 h-10 rounded-full" /> : <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white"><Users size={20}/></div>}
                             <div className="flex-1 border-b border-gray-800 pb-3">
                                 <h3 className="text-white font-medium">{u.name}</h3>
                                 <p className="text-gray-500 text-xs">{u.distance}</p>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
        )}

        {view === 'invite' && (
             <div className="absolute inset-0 z-50 w-full h-full bg-[#000] animate-slide-in-right flex flex-col">
                 <ScreenHeader title="Пригласить друзей" onBack={() => setView('main')} />
                 <div className="p-4">
                     <div className="bg-[#1c1c1d] rounded-xl p-4 flex flex-col items-center text-center gap-4">
                         <Share2 size={48} className="text-blue-500" />
                         <p className="text-gray-300">Поделитесь ссылкой на NonGram с друзьями и общайтесь безопасно!</p>
                         <button className="w-full bg-[#3390f7] py-3 rounded-lg font-medium">Поделиться ссылкой</button>
                     </div>
                 </div>
                 <div className="flex-1 overflow-y-auto px-2">
                     {['Contacts', 'Are', 'Loading', 'From', 'Phonebook'].map((name, i) => (
                         <div key={i} className="flex items-center justify-between p-3 hover:bg-[#1c1c1d] rounded-lg">
                             <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold">{name[0]}</div>
                                 <span>{name}</span>
                             </div>
                             <button className="px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium">Пригласить</button>
                         </div>
                     ))}
                 </div>
             </div>
        )}

        {view === 'features' && (
             <div className="absolute inset-0 z-50 w-full h-full bg-[#000] animate-slide-in-right flex flex-col">
                 <ScreenHeader title="Возможности NonGram" onBack={() => setView('main')} />
                 <div className="flex-1 overflow-y-auto p-4 space-y-4">
                     {FEATURES.map((f, i) => (
                         <div key={i} className="bg-[#1c1c1d] p-5 rounded-2xl flex items-start gap-4 shadow-lg border border-white/5">
                             <div className="mt-1">{f.icon}</div>
                             <div>
                                 <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                                 <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
        )}

        {/* MAIN LIST */}
        <ChatList 
          chats={chats} 
          onSelectChat={handleSelectChat} 
          currentUser={userProfile!}
          onNavigate={setView}
          onLogout={handleLogout}
          onDeleteChat={handleDeleteChat}
          onClearHistory={handleClearHistory}
          onTogglePin={handlePinChat}
          onMarkRead={handleMarkRead}
        />

      </div>
    </div>
  );
}
