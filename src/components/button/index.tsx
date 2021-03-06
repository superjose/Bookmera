import { styled } from '../styles/theme';
import { memo } from 'react';

const Button = styled.button`
  background-color: ${props => props.theme.secondary.color};
  font-size: 1rem;
  height: 2.3125rem;
  width: 9.125rem;
  text-align: center;
  border: none;
  color: #fff;
  border-radius: 4px;
  text-transform: uppercase;

  &:hover {
    background-color: #00695c;
  }
  &:active {
    background-color: #004d40;
  }
`;

export default memo(Button);
