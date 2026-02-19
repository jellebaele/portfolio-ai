import { createApp } from './app';
import { config } from './config';
import { connectDB } from './database/database';

const startServer = async () => {
  await connectDB();
  const app = createApp();

  app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
  });
};

startServer();
