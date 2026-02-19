import { setupServer } from './api/config/server';

const app = setupServer();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
