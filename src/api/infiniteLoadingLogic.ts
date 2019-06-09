import { range } from './utils';
import { NyTimesApi, InfiniteScrollingState } from './typings';

/**
 * This file handles all the logic to display the needed items.
 * Why does this seem to be overly complex?
 *
 * Well, NY Times API doesn't let me get the number of items as desired. It only gives
 * it to me in base of 20. I just can't send all of the 20 items over the wire, as it
 *
 * Note: I try to keep objects as immutable as possible.
 *
 * Unfortunately I believe that allItems is a very expensive object. Therefore
 * I'm not planning on
 *
 */

export function loadMore(infiniteState: InfiniteScrollingState) {
  const { toDisplay, itemsShown, itemsNotShown, allItems } = infiniteState;
  itemsShownWithNewData(toDisplay, itemsShown, itemsNotShown);
  return { allItems, itemsShown, itemsNotShown };
}

/**
 * Returns the items that are going to be loaded in the DOM, the ones that
 * remain to be rendered, and the ones that have been loaded.
 * @param apiResult
 * @param allItems
 * @param itemsShown Holds the indices of @param allItems that have already been shown.
 * @param itemsNotShown Holds the indices of @param allItems that aren't displayed.
 */
export function processApiResult(
  apiResult: NyTimesApi,
  infiniteState: InfiniteScrollingState,
) {
  // Destruct into individual variables.
  const { toDisplay } = infiniteState;
  let { allItems } = infiniteState;
  const itemsShown = [...infiniteState.itemsShown];
  const itemsNotShown = [...infiniteState.itemsNotShown];

  const apiTotalItems = apiResult.num_results;
  const totalItemsIndex = allItems.size + apiTotalItems;

  // These are the indexes that
  itemsNotShown.push(...range(allItems.size, totalItemsIndex - 1));

  // Add to all items.
  allItems = allItems.push(...apiResult.results);

  itemsShownWithNewData(toDisplay, itemsShown, itemsNotShown);

  return { allItems, itemsShown, itemsNotShown };
}

function itemsShownWithNewData(
  toDisplay: number,
  itemsShown: number[],
  itemsNotShown: number[],
) {
  for (let i = 0; i < Math.min(toDisplay, itemsNotShown.length); i++) {
    itemsShown.push(itemsNotShown.shift()!);
  }
}
