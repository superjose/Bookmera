import React from 'react';
import { styled } from '../styles/theme';

const BookIconWrapper = styled.div`
  float: left;
  margin-right: 0.35rem;
`;

const BookIcon = () => (
  <BookIconWrapper>
    <span className="icon-books" />
  </BookIconWrapper>
);

export default BookIcon;
