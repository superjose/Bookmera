import { range } from './utils';
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
  const { toDisplay, itemsShown, allItems, itemsNotShown } = Object.assign(
    {},
    infiniteState,
  );
  const apiTotalItems = apiResult.num_results;
  const totalItemsIndex = allItems.length + apiTotalItems;

  itemsNotShown.push(...range(allItems.length, totalItemsIndex));

  return { allItems, itemsShown, itemsNotShown };
}
