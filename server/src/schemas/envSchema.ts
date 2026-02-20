import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const supportedProviders = ['gemini', 'groq'] as const;
const supportedGeminiModels = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];
const supportedGroqModels = ['llama-3.3-70b-versatile'];

const FIFTEEN_MINUTES = 15 * 60 * 1000;

export const envSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['DEVELOPMENT', 'PRODUCTION']),
  RATELIMIT_WINDOW_MS: z.coerce.number().default(FIFTEEN_MINUTES),
  RATELIMIT_LIMIT: z.coerce.number().default(100),
  UPSTASH_VECTOR_REST_URL: z.string().min(1),
  UPSTASH_VECTOR_REST_TOKEN: z.string().min(1),
  UPSTASH_REDIS_REST_URL: z.string().min(1),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  LLM_API_KEY_GEMINI: z.string().min(1),
  LLM_MODEL_GEMINI: z.enum(supportedGeminiModels),
  LLM_MODEL_GEMINI_LITE: z.enum(supportedGeminiModels),
  LLM_API_KEY_GROQ: z.string().min(1),
  LLM_MODEL_GROQ: z.enum(supportedGroqModels)
});

export type EnvConfig = z.infer<typeof envSchema>;
export type SupportedProviders = (typeof supportedProviders)[number];
export type SupportedGeminiModels = (typeof supportedGeminiModels)[number];
export type SupportedGroqModels = (typeof supportedGroqModels)[number];
export type SupportedModels = SupportedGeminiModels | SupportedGroqModels;
