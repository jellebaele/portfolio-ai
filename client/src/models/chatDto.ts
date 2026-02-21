import type { Role } from './role';

export interface ChatResponseDto {
  id: string;
  role: Role;
  data: string;
  status: 'success' | 'error';
  meta: {
    llmModel: string;
    provider: string;
  };
}

export interface GetActiveModelResponseDto {
  status: 'success' | 'error';
  llmModel: string;
}
