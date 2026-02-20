import type { Role } from './role';

export interface ChatResponseDto {
  status: 'success' | 'error';
  id: string;
  data: string;
  role: Role;
  metadata?: {
    tokensUsed?: number;
    modelUsed?: string;
  };
}
