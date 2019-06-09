import names from '../__mocks__/names.json';
import { List } from 'immutable';
import { processApiResult } from '../api/infiniteLoadingLogic';
import { NyTimesNameResult, NyTimesHardCoverResult } from '../api/typings';

const apiResults = names;

describe('Infinite Scroll Suite', () => {
  it('Can Render 6 items when toDisplay is 6', () => {
    // InfiniteScrollingState inferred by shape
    const infiniteState = {
      toDisplay: 6,
      itemsShown: [],
      allItems: List<NyTimesNameResult | NyTimesHardCoverResult>(),
      itemsNotShown: [],
    };

    const { allItems, itemsShown, itemsNotShown } = processApiResult(
      apiResults,
      infiniteState,
    );

    expect(itemsShown.length).toBe(6);
    expect(allItems.size).toBe(55);
    expect(infiniteState.itemsNotShown.length).toBe(0);
  });
});
