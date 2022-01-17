import { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ActiveLink from './ActiveLink';
import styled, { createGlobalStyle } from 'styled-components';
import routes from '../routes.js';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: #222;
    color: #fff;
    font-family: sans-serif;
    line-height: 200%;
  }
  h1, h2, h3, h4 {
    padding: 20px 0;
    margin: 0;
    display: flex;
    align-items: center;
    position: relative;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
    }
  }
  h1 button, h2 button, h3 button, h4 button {
    position: absolute;
    left: -30px;
    background: transparent;
    border: 0;
    padding: 0;
    color: #999;
    cursor: pointer;
    transition: color 0.3s;
    @media (max-width: 768px) {
      position: static !important;
      margin-left: 10px;
    }
  }
  h1 button:hover, h2 button:hover, h3 button:hover, h4 button:hover {
    color: #fff;
  }
  blockquote {
    margin-left: 0;
    margin-right: 0;
    padding: 20px 20px;
    border-left: 5px solid #444;
    background: #222;
    border-radius: 5px;
  }
  blockquote p {
    margin: 0;
  }
  blockquote table {
    margin-top: 20px;
    border-color: #777;
    overflow-x: auto;
    max-width: 100%;
    display: block;
    width: max-content;

    @media (max-width: 768px) {
      width: calc(100vw - 28px - 40px);
      overflow-x: auto;
      display: block;
    }
  }
  blockquote th, blockquote td {
    border-color: #777;
  }
  pre {
    position: relative;
    font-family: 'Inconsolata', monospace;
    background: #333;
    border-radius: 5px;
    display: block;
    overflow: auto;
  }
  pre:hover button {
    color: #fff;
  }
  code {
    font-family: 'Inconsolata', monospace;
    background: #333;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 2px 3px rgba(0,0,0,0.5);
  }
  pre code {
    padding: 1em;
    display: block;
    background: #222;
  }
  .hljs {
    background: #222;
  }
  a {
    color: #00ffe9;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }

  table {
    border-spacing: 0;
    border-radius: 5px;
    border: 1px solid #444;
    overflow-x: auto;
    max-width: 100%;
    display: block;
    width: max-content;

    @media (max-width: 768px) {
      width: calc(100vw - 28px);
      overflow-x: auto;
      display: block;
    }
  }

  th {
    background: #222;
    text-align: left;
    font-weight: normal;
    padding: 5px 25px;
    border-left: 1px solid #444;
    border-bottom: 1px solid #444;
  }

  tr:nth-child(2n) {
    background: #222;
  }

  blockquote tr:nth-child(2n), blockquote th {
    background: #444;
  }

  td {
    padding: 5px 25px;
    border-left: 1px solid #444;
    border-bottom: 1px solid #444;
  }

  td:first-of-type, th:first-of-type {
    border-left: 0;
  }

  tr:last-of-type td {
    border-bottom: 0;
  }

  hr {
    border: 2px solid #444;
    border-radius: 4px;
  }

  .category .category {
    margin-left: 5px;
    font-size: 14px;
  }

  .category a {
    font-size: 14px;
    font-family: sans-serif;
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const GlobalStyle2 = createGlobalStyle`
  h1 {
    padding: 20px 0;
    margin: 0;
  }
  body {
    background: #121212;
    color: #fff;
    font-family: sans-serif;
    margin: 0;
  }

  a {
    text-decoration: none;
  }
`;

const Header = styled.header`
  width: 100vw;

  @media (max-width: 768px) {
    width: calc(100vw - 28px);
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 0 2vw ${function (props) {
      return props.paddingBottom || '60px';
    }} 2vw;
  box-sizing: border-box;
  display: flex;
  background: #121212;

  @media (max-width: 768px) {
    padding: 0 14px;
    box-sizing: content-box;
    width: calc(100vw - 28px);
    flex-direction: column;
  }
`;

const VerticalHeader = styled.header`
  font-family: 'Inconsolata', monospace;
  width: calc(250px - 2vw);
  margin-right: 2vw;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  z-index: 10000;
  overflow-y: scroll;
  background: #121212;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    height: 60px;
    width: calc(100vw - 28px);
    margin: 0;
    overflow-y: hidden;
  }
`;

const MenuButton = styled.button`
  background: transparent;
  border: 0;
  margin-right: 14px;
  display: none;
  color: #fff;
  @media (max-width: 768px) {
    display: block;
  }
  ${function (props) {
    if (props.close) {
      return {
        marginRight: 0,
        position: 'absolute',
        right: '0px',
        top: '10px',
        zIndex: 100000,
      };
    }
  }}
`;

const Nav = styled.nav`
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100vw - 28px);
    padding: 10px 14px 0 14px;
    height: calc(100vh);
    background: #121212;
    overflow: scroll;
    ${function (props) {
      return {
        display: props.visible ? 'block' : 'none',
      };
    }}
  }

  a {
    display: flex;
    margin-top: 3px;
    box-sizing: border-box;
    color: #fff;

    div {
      transition: background-color 0.1s, color 0.1s;
      border-radius: 5px;
      flex: 1;
      padding: 0px 10px;

      &:hover {
        background-color: #222;
        color: #00ffe9;
      }
    }

    &:hover {
      text-decoration: none;
    }

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

const Category = styled.div`
  color: #999;
  display: flex;
  flex-direction: column;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  h4 {
    margin: 0;
    padding: 0;
  }
`;

const Logo = styled.h1`
  font-size: 20px;
  font-weight: normal;
  position: sticky;
  top: 0;
  background: #121212;
  font-family: 'Inconsolata', monospace;

  a {
    color: #fff;
  }

  a:hover {
    text-decoration: none;
  }
  a:hover span {
    text-decoration: underline;
  }
`;

const Footer = styled.footer`
  background: #222;
  padding: 20px 2vw;
`;

const Layout = function () {
  const location = useLocation();
  const [navVisible, setNavVisible] = useState(false);

  const f = function (r, l = 1) {
    return Object.values(r).map(function (category, i) {
      return (
        <div key={i} className="category">
          <Category>
            <h4>{category.name}</h4>
          </Category>
          {category.routes.map(function (route, j) {
            return (
              <div key={j}>
                {route.file && route.index === false && (
                  <ActiveLink
                    onClick={function () {
                      setNavVisible(function (visible) {
                        return !visible;
                      });
                    }}
                    to={route.file.toLowerCase()}
                    index={category.routes.find(function (route2) {
                      return route2.index && route2.file === route.file;
                    })}
                    level={l}
                  >
                    {route.name}
                  </ActiveLink>
                )}
              </div>
            );
          })}
          {Object.keys(category.categories).length > 0 && f(category.categories, (l += 1))}
        </div>
      );
    });
  };

  return (
    <>
      {location.pathname === '/' && (
        <>
          <GlobalStyle2 />
          <Container paddingBottom="0px">
            <Header>
              <Logo>
                <Link to="/">
                  🧮 <span>Computors.org</span>
                </Link>
              </Logo>
            </Header>
          </Container>
          <Outlet />
        </>
      )}
      {location.pathname !== '/' && (
        <>
          <GlobalStyle />
          <Container>
            <VerticalHeader>
              <MenuButton
                onClick={function () {
                  setNavVisible(function (visible) {
                    return !visible;
                  });
                }}
              >
                <MenuIcon />
              </MenuButton>
              <Logo>
                <Link to="/">
                  🧮 <span>Computors.org</span>
                </Link>
              </Logo>
              <Nav visible={navVisible}>
                <>
                  <MenuButton
                    close
                    onClick={function () {
                      setNavVisible(function (visible) {
                        return !visible;
                      });
                    }}
                  >
                    <CloseIcon />
                  </MenuButton>
                  {f(routes.categories)}
                </>
              </Nav>
            </VerticalHeader>
            <Outlet />
          </Container>
          <Footer>&copy; Computors.org Contributors</Footer>
        </>
      )}
    </>
  );
};

export default Layout;
