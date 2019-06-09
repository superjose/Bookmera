import { api } from './config';
import { NyTimesApi } from './typings';
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
    const result = await fetch(fetchQuery);
    const data = (await result.json()) as NyTimesApi;
    console.log(data);
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
