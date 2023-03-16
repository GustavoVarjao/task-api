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

  async select(search) {
    this.#database = await readDatabase(databasePath);

    let data = this.#database;

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    return JSON.stringify(data);
  }

  async validator(id) {
    this.#database = await readDatabase(databasePath);

    const rowIndex = this.#database.findIndex(row => row.id === id);

    return rowIndex === -1;
  }

  async insert(data) {
    this.#database = await readDatabase(databasePath);

    this.#database.push(data);

    this.#persist();

    return data;
  }

  async delete(id) {
    this.#database = await readDatabase(databasePath);

    const rowIndex = this.#database.findIndex(row => row.id === id);

    if (rowIndex > -1) {
      this.#database.splice(rowIndex, 1);
      this.#persist();
    }
  }

  async update(id, data) {
    this.#database = await readDatabase(databasePath);

    const rowIndex = this.#database.findIndex(row => row.id === id);

    if (rowIndex > -1) {
      this.#database[rowIndex] = Object.assign(
        {},
        this.#database[rowIndex],
        data
      );

      this.#persist();
    }
  }

  async complete(id, data) {
    this.#database = await readDatabase(databasePath);

    const rowIndex = this.#database.findIndex(row => row.id === id);

    if (rowIndex > -1) {
      if (this.#database[rowIndex].completedAt) {
        this.#database[rowIndex].completedAt = null;
      } else {
        this.#database[rowIndex].completedAt = data;
      }

      this.#persist();
    }
  }
}
