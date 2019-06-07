import React, { memo } from 'react';

type ErrorProps = {
  msg: string;
};

function Error(props: ErrorProps) {
  return <p>{props.msg}</p>;
}

export default memo(Error);
