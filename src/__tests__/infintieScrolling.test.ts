import names from '../__mocks__/names.json';

import { processApiResult } from '../api/infiniteLoadingLogic';

const apiResults = names;

describe('Infinite Scroll Suite', () => {
  it('Can Render 6 items when toDisplay is 6', () => {
    // InfiniteScrollingState inferred by shape
    const infiniteState = {
      toDisplay: 6,
      itemsShown: [],
      allItems: [],
      itemsNotShown: [],
    };

    const { allItems, itemsShown, itemsNotShown } = processApiResult(
      apiResults,
      infiniteState,
    );

    expect(itemsShown.length).toBe(6);
  });
});
