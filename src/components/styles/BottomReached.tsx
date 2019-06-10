import { styled } from './theme';

/**
 * This item is redundant. It can be fixed by merging it with H1Padded.
 */

export const BottomReached = styled.h1`
  text-align: center;
  color: ${props => props.theme.main.textColor};
  margin-bottom: 1rem;
`;
