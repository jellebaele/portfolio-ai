import type ChatMessage from '@/models/ChatMessage';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import MessageAvatar from './MessageAvatar';

type ChatMessageProps = {
  message: ChatMessage;
};

const ChatMessageItem = ({ message }: ChatMessageProps) => {
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
            <div className='prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-code:text-primary prose-code:bg-secondary prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-th:text-foreground prose-td:text-muted-foreground prose-li:text-muted-foreground prose-hr:border-border prose-table:border-border prose-th:border-border prose-td:border-border prose-thead:border-border prose-tr:border-border'>
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
        {isUser && <MessageAvatar isUser={isUser} />}
      </div>
    </motion.div>
  );
};

export default ChatMessageItem;
