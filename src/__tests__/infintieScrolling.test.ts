import names from '../__mocks__/names.json';
import { List } from 'immutable';
import { processApiResult } from '../api/infiniteLoadingLogic';
import { NyTimesNameResult, NyTimesHardCoverResult } from '../api/typings';
import { range } from '../api/utils';

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
    expect(itemsNotShown.length).toBe(55 - 6);
    expect(infiniteState.itemsNotShown.length).toBe(0);
  });

  it('Will load the next 6 items if loading has been fired', () => {
    const infiniteState = {
      toDisplay: 6,
      itemsShown: [0, 1, 2, 3, 4, 5],
      allItems: List<NyTimesNameResult | NyTimesHardCoverResult>(),
      itemsNotShown: range(6, 55),
    };

    const { allItems, itemsShown, itemsNotShown } = processApiResult(
      apiResults,
      infiniteState,
    );

    expect(itemsShown.length).toBe(12);
    // expect(itemsNotShown.length).toBe
  });
});
