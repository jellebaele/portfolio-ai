import { config } from '@/config';
import { Index } from '@upstash/vector';

export const vectorIndex = new Index({
  url: config.database.upstashVectorUrl,
  token: config.database.upstashVectorToken
});

export const connectVectorDatabase = async () => {
  try {
    await vectorIndex.info();
    console.log('Vector database connected succesfully');
  } catch (error) {
    console.error('Vector database connection failed: ', error);
    process.exit(1);
  }
};
