import { memo } from 'react';
import styled from 'styled-components';

const Grid = styled.section`
  display: grid;
  max-width: 70rem;
  width: 100%;
  margin: 0 auto;
  grid-gap: 1.5rem;

  grid-template-columns: minmax(320px, 1fr);
  /* grid-auto-flow: column; */

  @media screen and (min-width: 850px) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
`;

export default memo(Grid);
