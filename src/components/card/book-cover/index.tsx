import { memo } from 'react';
import { styled } from '../../styles/theme';

const BookCover = styled.img`
  border-radius: ${props => props.theme.all.borderRadius};
  width: auto;
  max-height: 500px;
  margin-bottom: 0.125em;
  cursor: pointer;
`;

export default memo(BookCover);
