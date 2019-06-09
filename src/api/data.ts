import { api } from './config';
import { NyTimesApi } from './typings';
import { CacheStore } from './cacheStore';

const store = new CacheStore();

/**
 * Pulls the info from the NY Times API.
 */

/**
 *
 * @param listName The name of the specific resource that needs to be fetched.
 */
export async function getCurrentTopBooks() {
  return await executeQuery(api.names);
}
export async function getCurrentTopBooksByListName(listNameEncoded: string) {
  return await executeQuery(api.bestSeller(listNameEncoded));
}

async function executeQuery(fetchQuery: string) {
  try {
    // Read from cache first:
    const cache = await loadFromCache(fetchQuery);
    if (!!cache) {
      return cache;
    }
    const result = await fetch(fetchQuery);
    const data = (await result.json()) as NyTimesApi;

    await insertIntoCache(fetchQuery, data);

    return data;
  } catch (e) {
    console.error(e.message);
    return {
      error: {
        msg:
          'There was a problem while fetching the resource. Please try again now.',
      },
    };
  }
}

/**
 * The below 2 functions will read and write into the
 * indexedDb the queries that have been performed, and will maintain them
 * for about 24 hours.
 *
 * This is OK since the data doesn't change that often.
 */
async function insertIntoCache(fetchQuery: string, data: NyTimesApi) {
  return await store.WriteInCache(fetchQuery, data);
}

async function loadFromCache(fetchQuery: string) {
  const cache = await store.GetFromCache(fetchQuery);

  if (!cache || cache.expiresIn.getTime() <= new Date()) {
    // Invalidate cache.
    store.DeleteCache(fetchQuery);
    return null;
  }
  console.log('Read from cache');

  return cache;
}
