import csvParser from 'csv-parser';
import { Readable } from 'node:stream';
import { readFile } from 'node:fs/promises';

export async function readDatabase(databasePath) {
  const csvToObj = buffer => {
    const stream = Readable.from(buffer.toString());
    const results = [];

    return new Promise((resolve, reject) => {
      stream
        .pipe(csvParser())
        .on('data', data => results.push(data))
        .on('end', () => resolve(results))
        .on('error', reject);
    });
  };

  try {
    const buffer = await readFile(databasePath);

    return csvToObj(buffer);
  } catch (e) {
    return [];
  }
}
