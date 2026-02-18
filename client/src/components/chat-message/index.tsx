import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import type { Message } from '../ChatInput';
import MessageAvatar from './MessageAvatar';

type ChatMessageProps = {
  message: Message;
};

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className='w-full max-w-3xl mx-auto px-4'
    >
      <div className={`flex gap-3 py-4 ${isUser ? 'justify-end' : ''}`}>
        {!isUser && <MessageAvatar isUser={isUser} />}
        <div
          className={`rounded-2xl text-left px-4 py-3 text-sm leading-relaxed max-w-[85%] ${
            isUser ? 'bg-chat-user text-foreground' : 'bg-transparent text-foreground'
          }`}
        >
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <div className='prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-headings:text-foreground prose-strong:text-foreground prose-code:text-primary prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-secondary prose-pre:border prose-pre:border-border'>
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
        {isUser && <MessageAvatar isUser={isUser} />}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
