import { writeFile } from 'node:fs/promises';
import { stringify } from 'csv';
import { readDatabase } from './databaseReader.js';

const databasePath = new URL('./db.csv', import.meta.url);

export class Database {
  #database = [];

  #persist() {
    const csvData = stringify(this.#database, { header: true });

    writeFile(databasePath, csvData, error => {
      console.log(error);
    });
  }

  select(table) {
    const data = this.#database;
    console.log(data);
  }

  async insert(data) {
    this.#database = await readDatabase(databasePath);

    this.#database.push(data);

    this.#persist();

    return data;
  }
}
