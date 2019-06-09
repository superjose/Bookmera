import { styled } from './theme';
import { memo } from 'react';

const Body = styled.div`
  background-color: ${props => props.theme.main.bodyColor};
  margin-top: 1.5rem;
  padding-top: 2rem;
`;

export default memo(Body);
