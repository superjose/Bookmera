import React, { memo, useState } from 'react';
import { styled } from '../styles/theme';
import { render } from 'react-dom';

const DropDownForHeader = styled.div``;

/**
 * All the favorites in here.
 */
function Favorites() {
  const [isOpen, setOpen] = useState(false);

  return <p> Hello</p>;
}

export default memo(Favorites);
