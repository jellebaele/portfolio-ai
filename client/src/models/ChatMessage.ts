import type { Role } from './role';

export default interface ChatMessage {
  id: string;
  role: Role;
  content: string;
}
