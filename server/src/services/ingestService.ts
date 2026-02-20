import { vectorIndex } from '@/database/database';
import Vector from '@/models/vector';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export default class IngestService {
  private dataPath = path.join(process.cwd(), 'data');

  public async ingestMarkdownFiles() {
    const files = await fs.readdir(this.dataPath);
    const mdFiles = files.filter(f => f.endsWith('.md') && !f.includes('example'));

    for (const file of mdFiles) {
      await this.deleteOldEntries(file);

      const content = await fs.readFile(path.join(this.dataPath, file), 'utf-8');
      const chunks = content.split('\n\n').filter(c => c.trim().length > 10);

      const vectors: Vector[] = chunks.map(chunk => ({
        id: uuidv4(),
        data: chunk,
        metadata: {
          fileName: file,
          text: chunk // Twice for human readability, 'data' gets converted in vectors
        }
      }));

      await vectorIndex.upsert(vectors);
      console.log(`Indexed ${file} (${chunks.length} chunks)`);
    }
  }

  private async deleteOldEntries(file: string) {
    const isDeleted = await vectorIndex.delete({ filter: `metadata.fileName = '${file}'` });
    if (isDeleted) console.log(`Cleaned old index entries for: ${file}`);
    else console.warn(`Failed cleaning old index entries for: ${file}!`);
  }
}
