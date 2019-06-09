import React, { memo } from 'react';
import { Modal } from 'react-native';

export type BuyNowProps = {
  amazonUrl?: string;
  barnesAndNobleUrl?: string;
  localStoreUrl?: string;
  bookCoverImgUrl: string;
  description: string;
};

function BuyNow(props: BuyNowProps) {
  const { amazonUrl, barnesAndNobleUrl, localStoreUrl, description } = props;
  return (
    <Modal>
      <p>{description}</p>
      {localStoreUrl && (
        <a href={localStoreUrl} rel="noopener" target="_blank">
          Local Store
        </a>
      )}
      <br />
      {barnesAndNobleUrl && (
        <a href={barnesAndNobleUrl} rel="noopener" target="_blank">
          Barnes and Nobel
        </a>
      )}
      <br />
      {amazonUrl && (
        <a href={amazonUrl} rel="noopener" target="_blank">
          Amazon
        </a>
      )}
    </Modal>
  );
}

export default memo(BuyNow);
