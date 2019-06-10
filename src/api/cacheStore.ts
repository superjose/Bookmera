import { NyTimesApi } from './typings';

const store = require('idb-kv-store');

/**
 * A class that is in charge of storing and retrieving the queries
 * from indexedDb for 24 hours.
 */

export class CacheStore {
  private db: any;
  constructor() {
    try {
      this.db = store('bookmera-cache-store');
    } catch (e) {
      console.error('There was a problem while initializing the db', e.message);
    }
  }

  async WriteInCache(key: string, json: NyTimesApi) {
    try {
      // Set expiration of the cache 24 hours from now.
      let expiresIn = new Date();
      expiresIn = new Date(expiresIn.setHours(expiresIn.getHours() + 24));

      const toInsert = { ...json, expiresIn };
      await this.db.set(key, toInsert);
      return true;
    } catch (e) {
      console.error('There was a problem while inserting the cache', e.message);
      return false;
    }
  }

  async WriteInDb(key: string, obj: Object) {
    try {
      await this.db.set(key, obj);
      return true;
    } catch (e) {
      console.error('There was a problem while inserting the cache', e.message);
      return false;
    }
  }

  async GetFromCacheOrDb(key: string) {
    try {
      return await this.db.get(key);
    } catch (e) {
      console.error(
        'There was a problem while reading from the cache',
        e.message,
      );
      return null;
    }
  }

  async DeleteCache(key: string) {}
}
