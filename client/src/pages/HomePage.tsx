import ChatHeader from '@/components/chat-header/ChatHeader';
import ChatMessageItem from '@/components/chat-message/ChatMessageItem';
import ChatInput from '@/components/ChatInput';
import TypingIndicator from '@/components/TypingIndicator';
import WelcomeScreen from '@/components/welcome-screen/WelcomeScreen';
import { useChat } from '@/context/ChatContext';
import { useChatAutoScroll } from '@/hooks/useChatAutoScroll';
import { useSendChatMessage } from '@/hooks/useSendChatMessage';
import type ChatMessage from '@/models/ChatMessage';
import { AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const HomePage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { setModel } = useChat();
  const { mutate, isPending, isError } = useSendChatMessage(aiMsg => {
    setMessages(prev => [...prev, aiMsg]);
    setModel(aiMsg.meta?.llmModel || 'No model');
  });
  // useViewportHeight(scrollToBottom);
  useChatAutoScroll(scrollToBottom);

  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  useEffect(() => {
    if (messages.length > 0 || isPending) requestAnimationFrame(scrollToBottom);
  }, [messages, isPending]);

  const handleSend = async (content: string) => {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content
    };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);

    mutate(updatedHistory);
  };

  const clearMessage = () => setMessages([]);

  const hasMessages = messages.length > 0;

  return (
    <div className='flex h-dvh flex-col bg-background'>
      <ChatHeader isSystemError={isError} onIconClick={clearMessage} />
      <div ref={scrollRef} className='flex flex-1 flex-col overflow-y-auto overscroll-contain mt-3'>
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

      <div className='sticky bottom-0 bg-background pb-[env(safe-area-inset-bottom)]'>
        <ChatInput
          onSend={handleSend}
          lastUserMessage={messages[messages.length - 2]?.content ?? ''}
          isLoading={isPending}
          isError={isError}
        />
      </div>
    </div>
  );
};

export default HomePage;
