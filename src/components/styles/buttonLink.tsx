import { styled } from './theme';

export const ButtonLink = styled.button`
  background-color: transparent;
  border: none;
  color: ${props => props.theme.main.textColor};
  cursor: pointer;
  text-transform: uppercase;
  font-size: 1rem;

  &:hover {
    color: ${props => props.theme.secondary.textColor};
  }
`;
