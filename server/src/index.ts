import { createApp } from './app';
import { config } from './config';
import { connectRedis } from './database/redis';
import { connectVectorDatabase } from './database/vectorDatabase';

const startServer = async () => {
  await connectVectorDatabase();
  await connectRedis();
  const app = createApp();

  app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
  });
};

startServer();
