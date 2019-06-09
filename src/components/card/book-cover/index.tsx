import { memo } from 'react';
import styles from 'styled-components';

const BookCover = styles.img`
  border-radius: 4px;
  width:100%;
  max-height: 495px;
  margin-bottom: 0.125em;
`;

export default memo(BookCover);
