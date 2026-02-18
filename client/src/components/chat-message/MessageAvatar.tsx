import { Bot, User } from 'lucide-react';

type MessageAvatarProps = {
  isUser: boolean;
};

const MessageAvatar = ({ isUser }: MessageAvatarProps) => {
  return (
    <>
      {isUser ? (
        <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-chat-user text-muted-foreground'>
          <User className='h-4 w-4' />
        </div>
      ) : (
        <div className='flex h-8 w-8 mt-3 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary'>
          <Bot className='h-4 w-4' />
        </div>
      )}
    </>
  );
};

export default MessageAvatar;
