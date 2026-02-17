import ChatHeader from '@/components/ChatHeader';
import type { Message } from '@/components/ChatInput';
import WelcomeScreen from '@/components/welcome-screen';
import { useRef, useState } from 'react';

const HomePage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = (content: string) => {
    console.log(content);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className='flex h-screen flex-col bg-background'>
      <ChatHeader />

      <div
        ref={scrollRef}
        className='flex flex-1 flex-col overflow-y-auto'>
        {!hasMessages ? (
          <WelcomeScreen onSuggestionClick={handleSend} />
        ) : (
          <div className='flex flex-col py-4'>
            {/* <AnimatePresence>
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                />
              ))}
            </AnimatePresence>
            {isLoading && <TypingIndicator />} */}
          </div>
        )}
      </div>

      {/* <ChatInput
        onSend={handleSend}
        isLoading={isLoading}
      /> */}
    </div>
  );
};

export default HomePage;
