import ChatMessageItem from '@/components/chat-message';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import TypingIndicator from '@/components/TypingIndicator';
import WelcomeScreen from '@/components/welcome-screen';
import { useSendChatMessage } from '@/hooks/useSendChatMessage';
import type ChatMessage from '@/models/chatMessage';
import { AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const HomePage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { mutate, isPending } = useSendChatMessage(aiMsg => {
    console.log(aiMsg);
    setMessages(prev => [...prev, aiMsg]);
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isPending]);

  const handleSend = async (content: string) => {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content
    };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    console.log(updatedHistory);

    mutate(updatedHistory);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className='flex h-screen flex-col bg-background'>
      <ChatHeader />
      <div ref={scrollRef} className='flex flex-1 flex-col overflow-y-auto'>
        {!hasMessages ? (
          <WelcomeScreen onSuggestionClick={handleSend} />
        ) : (
          <div className='flex flex-col py-4'>
            <AnimatePresence>
              {messages.map(msg => (
                <ChatMessageItem key={msg.id} message={msg} />
              ))}
            </AnimatePresence>
            {isPending && <TypingIndicator />}
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} isLoading={isPending} />
    </div>
  );
};

export default HomePage;
