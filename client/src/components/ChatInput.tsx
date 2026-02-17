export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type ChatInputProps = {
  onSend: (message: string) => void;
  isLoading: boolean;
};
const ChatInput = ({}: ChatInputProps) => {
  return <div>ChatInput</div>;
};

export default ChatInput;
