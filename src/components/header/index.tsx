import React, { memo, useState } from 'react';
import styled, { ThemedStyledInterface } from 'styled-components';
import { Theme, lightTheme, darkTheme } from '../styles/theme';

const Nav = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 1rem;
  overflow: hidden;
  background-color: ${props => props.theme.main.color};
  color: ${props => props.theme.main.textColor};
  li {
    float: left;
    padding: 0 1em;
  }
  li a {
    display: block;
    color: white;
    text-align: center;
  }
  li a:hover {
  }
`;

type HeaderProps = {
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

function Header(props: HeaderProps) {
  function setLightTheme() {
    props.setTheme(lightTheme);
  }

  function setDarkTheme() {
    props.setTheme(darkTheme);
  }

  return (
    <Nav>
      <li>Bookmera</li>
      <li>
        <button onClick={setLightTheme}>Light </button>
      </li>
      <li>
        <button onClick={setDarkTheme}> Dark </button>
      </li>
    </Nav>
  );
}

export default memo(Header);
