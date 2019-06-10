import React, { memo } from 'react';
import { styled } from '../styles/theme';

import BookCover from './book-cover';
import { ButtonLink } from '../styles/buttonLink';
import { Likeable } from '..';

type CardProps = {
  title: string;
  imgSrc: string;
  author?: string;
  rank?: number;
  liked?: boolean;
  onClick?(): void;
  isLikeable?: boolean;
  buttonLabel: string;
};

const StyledCard = styled.div`
  position: relative;
  height: 620px;
  margin: 3em 0;
  width: 20em;
  box-shadow: 2px 2px 10px -5px rgba(0, 0, 0, 0.45);
  border-radius: 10px;
  overflow-x: hidden;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 2px 2px 20px -5px rgba(0, 0, 0, 0.45);
  }

  h1,
  h3 {
    padding-left: 1rem;
    color: ${props => props.theme.main.textColor};
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
  text-align: center;
  float: right;
  font-size: 2rem;
  font-weight: bold;
`;

const CardFooter = styled.div`
  width: 100%;
  padding: 1rem;
  button {
    position: absolute;
    bottom: 1rem;
    right: 0.5rem;
  }
`;

function Card({ liked = false, isLikeable = false, ...props }: CardProps) {
  return (
    <StyledCard>
      <BookCover className="cover" src={props.imgSrc} onClick={props.onClick} />
      <AuthorInfo>
        <h1>{props.title}</h1>
        <h3>{props.author}</h3>
      </AuthorInfo>
      <RankNumber>{props.rank}</RankNumber>
      {isLikeable && <Likeable>❤</Likeable>}
      <CardFooter>
        <ButtonLink onClick={props.onClick}>See details</ButtonLink>
      </CardFooter>
    </StyledCard>
  );
}

export default memo(Card);
