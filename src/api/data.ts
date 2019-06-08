import { api } from './config';
/**
 * Pulls the info from the NY Times API.
 */

/**
 *
 * @param listName The name of the specific resource that needs to be fetched.
 */
export async function getCurrentTopBooks() {
  try {
    const result = await fetch(api.names);
    const data = (await result.json()) as NyTimesNameApi;
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
export async function getCurrentTopBooksByListName(listName: string) {
  try {
    const result = await fetch(api.names);
    const data = (await result.json()) as NyTimesNameApi;

    console.log(data);
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
