import React, { memo, useState } from 'react';
import styled, { ThemedStyledInterface } from 'styled-components';
import { Theme, lightTheme, darkTheme } from '../styles/theme';
import { Link } from '@reach/router';

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
`;

const Contents = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 1rem;
  overflow: hidden;
  background-color: ${props => props.theme.main.color};
  li {
    float: left;
    padding: 0 1em;
  }
  li a {
    display: block;
    text-align: center;
    text-decoration: none;
    color: ${props => props.theme.main.textColor};
  }
  .pull-right {
    float: right;
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
      <Contents>
        <li>
          <Link to="/"> Bookmera </Link>
        </li>
        <li className="pull-right">
          <button onClick={setLightTheme}>Light </button>
        </li>
        <li className="pull-right">
          <button onClick={setDarkTheme}> Dark </button>
        </li>
      </Contents>
    </Nav>
  );
}

export default memo(Header);
