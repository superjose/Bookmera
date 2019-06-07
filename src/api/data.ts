import { api } from './api';
/**
 * Pulls the info from the NY Times API.
 */

type NyTimesNameApi = {
  status: string;
  copyright: string;
  num_results: number;
  results: NyTimesNameResult[];
};

type NyTimesNameResult = {
  list_name: string;
  display_name: string;
  list_name_encoded: string;
  oldest_published_date: string;
  newest_published_date: string;
  updated: string;
};

/**
 *
 * @param listName The name of the specific resource that needs to be fetched.
 */
export async function getCurrentTopBooks() {
  try {
    const result = await fetch(api.names);
    const data = (await result.json()) as NyTimesNameApi;

    console.log(data);
  } catch (e) {
    console.error(e.message);
    return 'There was a problem while fetching the resource. Please try again now.';
  }
}
export async function getCurrentTopBooksByListName(listName: string) {
  try {
    const result = await fetch(api.names);
    const data = (await result.json()) as NyTimesNameApi;

    console.log(data);
  } catch (e) {
    console.error(e.message);
    return 'There was a problem while fetching the resource. Please try again now.';
  }
}
