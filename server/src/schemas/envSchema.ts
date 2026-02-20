import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['DEVELOPMENT', 'PRODUCTION']),
  RATELIMIT_WINDOW_MS: z.coerce.number(),
  RATELIMIT_LIMIT: z.coerce.number(),
  UPSTASH_VECTOR_REST_URL: z.string().min(1),
  UPSTASH_VECTOR_REST_TOKEN: z.string().min(1),
  LLM_PROVIDER: z.enum(['gemini']),
  LLM_API_KEY: z.string().min(1)
});

export type EnvConfig = z.infer<typeof envSchema>;
