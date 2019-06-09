import React, { memo } from 'react';
import styled from 'styled-components';

import BookCover from './book-cover';
import Button from '../button';

type CardProps = {
  title: string;
  imgSrc: string;
  author?: string;
  rank?: number;
  liked?: boolean;
  onClick?(): void;
};

const StyledCard = styled.div`
  height: 620px;
  margin: 3em 0;
  width: 20em;
  box-shadow: 2px 2px 10px -5px rgba(0, 0, 0, 0.45);
  border-radius: 10px;
  overflow-x: hidden;

  h1,
  h3 {
    padding-left: 1rem;
  }

  .favorite {
    display: block;
    float: left;
  }

  .buy-now {
    display: block;
    float: right;
  }
`;

const AuthorInfo = styled.div`
  display: block;
  float: left;
  width: 75%;
`;

const RankNumber = styled.div`
  display: block;
  width: 25%;
  float: right;
`;

const CardFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

function Card({ liked = false, ...props }: CardProps) {
  return (
    <StyledCard>
      <BookCover className="cover" src={props.imgSrc} onClick={props.onClick} />
      <AuthorInfo>
        <h1>{props.title}</h1>
        <h3>{props.author}</h3>
      </AuthorInfo>
      <RankNumber>#1</RankNumber>
      <CardFooter>
        <button>❤</button>
        <Button onClick={props.onClick}>View</Button>
      </CardFooter>
    </StyledCard>
  );
}

export default memo(Card);
