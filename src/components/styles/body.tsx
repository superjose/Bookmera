import { styled } from './theme';
import { memo } from 'react';

const Body = styled.div`
  background-color: ${props => props.theme.main.bodyColor};
`;

export default memo(Body);
