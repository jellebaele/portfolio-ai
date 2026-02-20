import { vectorIndex } from '@/database/vectorDatabase';
import Vector from '@/models/vector';
import fs from 'fs/promises';
import path from 'path';

export default class IngestService {
  private dataPath = path.join(process.cwd(), 'data');

  public async ingestMarkdownFiles() {
    const files = await fs.readdir(this.dataPath);
    const mdFiles = files.filter(f => f.endsWith('.md') && !f.includes('example'));

    for (const file of mdFiles) {
      await this.deleteOldEntries(file);

      const content = await fs.readFile(path.join(this.dataPath, file), 'utf-8');
      const chunks = content.split('\n\n').filter(c => c.trim().length > 10);

      const vectors: Vector[] = chunks.map((chunk, index) => ({
        id: this.createChunkId(file, index),
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

  private createChunkId(file: string, index: number): string {
    return `${file}-${index}`;
  }

  private async deleteOldEntries(file: string) {
    const result = await vectorIndex.delete({ prefix: file });
    if (result.deleted > 0) console.log(`Cleaned old index entries for: ${file}`);
    else console.warn(`Failed cleaning old index entries for: ${file}!`);
  }
}
