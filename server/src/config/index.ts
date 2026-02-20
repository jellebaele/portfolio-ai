import { envSchema } from '@/schemas/envSchema';
import 'dotenv/config';

const result = envSchema.safeParse(process.env);
if (!result.success) {
  console.error('Invalid environment variables:', result.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

const env = result.data;

export const config = {
  port: env.PORT,
  nodeEnv: env.NODE_ENV,
  ratelimit: {
    windowMs: env.RATELIMIT_WINDOW_MS,
    limit: env.RATELIMIT_LIMIT, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56 // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  } as const,
  database: {
    upstashVectorUrl: env.UPSTASH_VECTOR_REST_URL,
    upstashVectorToken: env.UPSTASH_VECTOR_REST_TOKEN
  },
  cache: {
    redisUrl: env.UPSTASH_REDIS_REST_URL,
    redisToken: env.UPSTASH_REDIS_REST_TOKEN
  },
  llm: {
    apiKey: env.LLM_API_KEY,
    provider: env.LLM_PROVIDER,
    primaryModel: env.LLM_PRIMARY_MODEL,
    fallbackModel: env.LLM_FALLBACK_MODEL
  }
};

export const isProduction = config.nodeEnv === 'PRODUCTION';
