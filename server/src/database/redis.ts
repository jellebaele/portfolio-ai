import { config } from '@/config';
import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: config.cache.redisUrl,
  token: config.cache.redisToken
});

export const connectRedis = async () => {
  try {
    await redis.get('check');
    console.log('Redis cache connected succesfully');
  } catch (error) {
    console.error('Redis cache connection failed: ', error);
    process.exit(1);
  }
};
