import { createContext, useContext, useEffect, useState } from 'react';

interface ChatContextType {
  model: string;
  setModel: (model: string) => void;
  isSystemError: boolean;
  setIsSystemError: (isError: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [model, setModel] = useState<string>('Initializing...');
  const [isSystemError, setIsSystemError] = useState<boolean>(false);

  useEffect(() => {
    // Fetch model
    setModel('gemini');
  }, []);

  return (
    <ChatContext.Provider value={{ model, setModel, isSystemError, setIsSystemError }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within ChatProvider');
  return context;
};
