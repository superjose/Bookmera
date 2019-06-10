import React, { memo, FunctionComponent } from 'react';
import { styled } from './theme';

const DecorateContrast = styled.span`
  margin-right: 1rem;

  font-size: 1.2rem;
  color: ${props => props.theme.main.textColor};
  a {
    text-decoration: none;
  }
`;

const Contrast: FunctionComponent = props => (
  <DecorateContrast>
    <span className="icon-contrast" />
  </DecorateContrast>
);

export default memo(Contrast);
