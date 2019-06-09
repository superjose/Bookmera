import React, { memo } from 'react';
import { Modal, BookCover } from '../../../components';
import styled from 'styled-components';

export type BuyNowProps = {
  amazonUrl?: string;
  barnesAndNobleUrl?: string;
  localStoreUrl?: string;
  bookCoverImgUrl: string;
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
          <p>{description}</p>
          {localStoreUrl && (
            <a href={localStoreUrl} rel="noopener noreferrer" target="_blank">
              Local Store
            </a>
          )}
          <br />
          {barnesAndNobleUrl && (
            <a
              href={barnesAndNobleUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Barnes and Nobel
            </a>
          )}
          <br />
          {amazonUrl && (
            <a href={amazonUrl} rel="noopener noreferrer" target="_blank">
              Amazon
            </a>
          )}
        </RightPanel>
      </Wrapper>
    </Modal>
  );
}

export default memo(BuyNow);
