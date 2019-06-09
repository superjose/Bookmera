import styled from 'styled-components';
import { memo } from 'react';

const Modal = styled.section`
  position: absolute;
  background-color: white;
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  top: 50%;
  right: 50%;
`;

export default memo(Modal);
