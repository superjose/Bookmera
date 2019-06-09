import names from '../__mocks__/names.json';
import { List } from 'immutable';
import { processApiResult, loadMore } from '../api/infiniteLoadingLogic';
import { NyTimesNameResult, NyTimesBestSellerResult } from '../api/typings';

const apiResults = names;

describe('Infinite Scroll Suite', () => {
  const toDisplay = 6;
  const blankInfiniteState = {
    toDisplay,
    itemsShown: [],
    allItems: List<NyTimesNameResult | NyTimesBestSellerResult>(),
    itemsNotShown: [],
  };

  it('Can Render 6 items when toDisplay is 6', () => {
    // InfiniteScrollingState inferred by shape
    const { allItems, itemsShown, itemsNotShown } = processApiResult(
      apiResults,
      blankInfiniteState,
    );

    expect(itemsShown.length).toBe(6);
    expect(allItems.size).toBe(55);
    expect(itemsNotShown.length).toBe(55 - 6);
    expect(blankInfiniteState.itemsNotShown.length).toBe(0);
  });

  it('Will load continuously all the items if loading keeps firing', () => {
    const { allItems, itemsShown, itemsNotShown } = processApiResult(
      apiResults,
      blankInfiniteState,
    );

    let infiniteState = {
      toDisplay,
      itemsShown,
      allItems,
      itemsNotShown,
    };

    // The number of times it's going to loadMore is:
    // Math.ceiling(allItems/toDisplay)
    /**
     * We keep synthesizing the fire of the infinite scroller
     * and keep checking whether it loads the items accordingly.
     */
    const top = Math.ceil(allItems.size / blankInfiniteState.toDisplay);
    for (let i = 2; i <= top; i++) {
      if (infiniteState.itemsShown.length >= 48) {
        debugger;
      }

      const result = loadMore(infiniteState);
      infiniteState = {
        ...infiniteState,
        itemsShown: result.itemsShown,
        itemsNotShown: result.itemsNotShown,
        allItems: result.allItems,
      };

      expect(result.allItems.size).toBe(allItems.size);
      if (i == top) {
        expect(result.itemsShown.length).toBe(result.allItems.size);
        expect(result.itemsNotShown.length).toBe(0);
      } else {
        expect(result.itemsShown.length).toBe(toDisplay * i);
        expect(result.itemsNotShown.length).toBe(
          result.allItems.size - toDisplay * i,
        );
      }
    }
  });
});
