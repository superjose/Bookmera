import React, { memo } from 'react';
import { Modal } from '../../../components';

export type BuyNowProps = {
  amazonUrl?: string;
  barnesAndNobleUrl?: string;
  localStoreUrl?: string;
  bookCoverImgUrl: string;
  description: string;
  closeFn(): void;
};

function BuyNow(props: BuyNowProps) {
  const { amazonUrl, barnesAndNobleUrl, localStoreUrl, description } = props;
  return (
    <Modal closeFn={props.closeFn}>
      <p>{description}</p>
      {localStoreUrl && (
        <a href={localStoreUrl} rel="noopener noreferrer" target="_blank">
          Local Store
        </a>
      )}
      <br />
      {barnesAndNobleUrl && (
        <a href={barnesAndNobleUrl} rel="noopener noreferrer" target="_blank">
          Barnes and Nobel
        </a>
      )}
      <br />
      {amazonUrl && (
        <a href={amazonUrl} rel="noopener noreferrer" target="_blank">
          Amazon
        </a>
      )}
    </Modal>
  );
}

export default memo(BuyNow);
