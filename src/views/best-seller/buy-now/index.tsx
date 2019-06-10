import React, { memo } from 'react';
import { Modal, BookCover } from '../../../components';
import styled from 'styled-components';

export type BuyNowProps = {
  amazonUrl?: string;
  barnesAndNobleUrl?: string;
  localStoreUrl?: string;
  bookCoverImgUrl: string;
  title: string;
  author: string;
  description: string;
  closeFn(): void;
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-items: center;
  height: 100%;
  width: 100%;

  @media (min-width: 40rem) {
    flex-flow: row;
  }
`;

const LeftPanel = styled.div`
  align-self: center;
`;

const RightPanel = styled.div`
  padding: 1.5rem;
  box-sizing: border-box;
`;

const WhereToBuy = styled.div`
  padding-top: 1rem;
  display: flex;
  justify-content: space-evenly;
  text-align: center;

  a:visited,
  a {
    padding: 1rem;
    text-align: center;
    color: ${props => props.theme.main.textColor};
    text-decoration: none;
  }
  a:hover {
    background-color: ${props => props.theme.terciary.color};
  }
  a > span {
    font-size: 3rem;
  }
`;

function BuyNow(props: BuyNowProps) {
  const {
    amazonUrl,
    barnesAndNobleUrl,
    localStoreUrl,
    description,
    bookCoverImgUrl,
  } = props;
  return (
    <Modal closeFn={props.closeFn}>
      <Wrapper>
        <LeftPanel>
          <BookCover src={bookCoverImgUrl} />
        </LeftPanel>
        <RightPanel>
          <h1>{props.title}</h1>
          <h3>
            <strong>By:&nbsp;</strong> {props.author}
          </h3>
          <h2>Description</h2>
          <p>{description}</p>
          <h2>Where to buy</h2>
          <WhereToBuy>
            {amazonUrl && (
              <a href={amazonUrl} rel="noopener noreferrer" target="_blank">
                <span className="icon-amazon" /> <br />
                Amazon
              </a>
            )}
            {barnesAndNobleUrl && (
              <a
                href={barnesAndNobleUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="icon-library" /> <br />
                Barnes and Nobel
              </a>
            )}
            {localStoreUrl && (
              <a href={localStoreUrl} rel="noopener noreferrer" target="_blank">
                <span className="icon-books" /> <br />
                Local Store
              </a>
            )}
          </WhereToBuy>
        </RightPanel>
      </Wrapper>
    </Modal>
  );
}

export default memo(BuyNow);
