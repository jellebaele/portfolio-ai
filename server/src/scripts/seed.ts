import { connectDB } from '@/database/database';
import { ingestService } from '@/services';

async function seed() {
  await connectDB();
  await ingestService.ingestMarkdownFiles();
}

seed();
