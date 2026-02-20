import 'dotenv/config';

const FIFTEEN_MINUTES = 15 * 60 * 1000;
type NodeEnv = 'DEVELOPMENT' | 'PRODUCTION';

export const config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: (process.env.NODE_ENV as NodeEnv) || 'DEVELOPMENT',
  ratelimit: {
    windowMs: Number(process.env.RATELIMIT_WINDOW_MS) || FIFTEEN_MINUTES,
    limit: Number(process.env.RATELIMIT_LIMIT) || 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56 // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  } as const,
  database: {
    upstashVectorUrl: process.env.UPSTASH_VECTOR_REST_URL,
    upstashVectorToken: process.env.UPSTASH_VECTOR_REST_TOKEN
  },
  llm: {
    geminiApiKey: process.env.GEMINI_API_KEY
  }
};

export const isProduction = config.nodeEnv === 'PRODUCTION';
