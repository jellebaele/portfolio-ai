import ChatMessage from '@/components/chat-message';
import ChatHeader from '@/components/ChatHeader';
import type { Message } from '@/components/ChatInput';
import ChatInput from '@/components/ChatInput';
import TypingIndicator from '@/components/TypingIndicator';
import WelcomeScreen from '@/components/welcome-screen';
import { AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const getMockResponse = async (question: string): Promise<string> => {
  await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
  return `Thanks for asking! This is a placeholder response. Connect your own LLM backend to provide real answers about your experience, skills, and projects.\n\nYou asked: "${question}"\n\nTo set this up, replace the \`getMockResponse\` function in \`src/pages/Index.tsx\` with your actual API call.`;
};

const HomePage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  }, [messages, isLoading]);

  const handleSend = async (content: string) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await getMockResponse(content);
      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Failed to get response:', err);
    } finally {
      setIsLoading(false);
    }
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
                <ChatMessage key={msg.id} message={msg} />
              ))}
            </AnimatePresence>
            {isLoading && <TypingIndicator />}
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
};

export default HomePage;
