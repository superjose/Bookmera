import React, { memo } from 'react';
import { RouteComponentProps } from '@reach/router';

/**
 * After the user clicks on a card, he'll be presented with the best seller
 * type he found.
 */

function BestSeller(props: RouteComponentProps) {
  return <p>Helloooo :D</p>;
}

export default memo(BestSeller);
