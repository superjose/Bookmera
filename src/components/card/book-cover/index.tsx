import React from 'react';

import 'style.css';

type BookCoverProps = {
  src: string;
};

type BookCoverStyles = {};

function BookCover(props: BookCoverProps) {
  return <img src={props.src} />;
}
