import { memo } from 'react';
import styles from 'styled-components';

const BookCover = styles.img`
  border-radius: 4px;
  width:auto;
  max-height: 495px;
  margin-bottom: 0.125em;
  cursor: pointer;
`;

export default memo(BookCover);
