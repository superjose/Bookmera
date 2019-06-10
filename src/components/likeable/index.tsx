import { styled } from '../styles/theme';
import React, { memo } from 'react';
import { ButtonLink } from '../styles/buttonLink';

const Likeable = styled(ButtonLink)`
  position: absolute;
  font-size: 2rem;
  top: 0.25rem;
  right: 0.5rem;
  color: #fff;

  &:hover {
    color: #e53935;
  }
  &:pressed {
    color: #c62828;
  }
`;

export default memo(Likeable);
