import { memo } from 'react';
import { styled } from '../../styles/theme';

const BookCover = styled.img`
  border-radius: ${props => props.theme.all.borderRadius};
  width: 100%;
  filter: brightness(80%);
  transition: filter 0.5s;

  &:hover {
    filter: brightness(50%);
  }

  /* max-width: 100%; */

  @media (min-width: 40rem) {
    width: auto;
  }
  max-height: 500px;
  margin-bottom: 0.125em;
  cursor: pointer;
`;

export default memo(BookCover);
