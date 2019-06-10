import React, { memo, FunctionComponent } from 'react';
import { styled } from './theme';
import { Link } from '@reach/router';

const DecorateArrow = styled.span`
  display: block;
  margin-top: 1em;
  margin-left: 1em;
  font-size: 2em;
  color: ${props => props.theme.main.textColor};
  a,
  a:visited {
    text-decoration: none;
    color: ${props => props.theme.main.textColor};
  }
`;

type BackArrowProps = {
  to?: string;
};

const BackArrow: FunctionComponent<BackArrowProps> = props => (
  <DecorateArrow>
    <Link to={props.to}>
      <span className="icon-arrow-left2" />
    </Link>
  </DecorateArrow>
);

export default memo(BackArrow);
