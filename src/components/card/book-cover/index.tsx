import React, { memo } from 'react';
import styles from 'styled-components';

const style = require('./style.css');

type BookCoverProps = {
  src: string;
};

const BookCover = styles.img`
  border-radius: 4px;
  width:100%;
  max-height: 495px;
  margin-bottom: 0.125em;
`;

// function BookCover(props: BookCoverProps) {
//   return (
//     <BookCoverStyle src={props.src} className={style.bookCover} {...props}  />
//   );
// }

export default memo(BookCover);
