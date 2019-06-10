import React, { memo, useState } from 'react';
import styled from 'styled-components';
import { Theme, lightTheme, darkTheme } from '../styles/theme';
import { Link } from '@reach/router';
import Contrast from '../styles/contrast';
import BookIcon from '../styles/bookicon';

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  box-shadow: 2px 2px 10px -5px rgba(0, 0, 0, 0.45);
`;

const Contents = styled.ul`
  list-style-type: none;
  height: 100%;
  margin: 0;
  overflow: hidden;
  background-color: ${props => props.theme.main.color};
  li {
    float: left;
    padding: 1rem;
    height: 100%;
    color: ${props => props.theme.main.textColor};
  }
  li a,
  li a:visited,
  li:hover {
    display: block;
    text-align: center;
    text-decoration: none;
    color: ${props => props.theme.main.textColor};
  }
  li:hover {
    background-color: ${props => props.theme.secondary.color};
  }
  .pull-right {
    float: right;
    cursor: pointer;
  }
`;

type HeaderProps = {
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

enum CurrentTheme {
  'Light',
  'Dark',
}

function Header(props: HeaderProps) {
  const [currentTheme, setCurrentTheme] = useState(CurrentTheme.Light);

  function setTheme() {
    const isLightTheme = currentTheme === CurrentTheme.Light;
    const otherTheme = isLightTheme ? CurrentTheme.Dark : CurrentTheme.Light;
    setCurrentTheme(otherTheme);
    props.setTheme(isLightTheme ? darkTheme : lightTheme);
  }

  return (
    <Nav>
      <Contents>
        <Link to="/">
          <li>
            <BookIcon /> Bookmera
          </li>
        </Link>
        <li className="pull-right" onClick={setTheme}>
          <Contrast />
          {currentTheme === CurrentTheme.Light ? (
            <span>Light Theme On</span>
          ) : (
            <span>Dark Theme On</span>
          )}
        </li>
      </Contents>
    </Nav>
  );
}

export default memo(Header);
