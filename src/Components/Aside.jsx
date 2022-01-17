import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { HashLink } from 'react-router-hash-link';
import ActiveLink from './ActiveLink';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkIcon from '@material-ui/icons/Link';

const AsideContainer = styled.aside`
  padding: 0 0 20px 0;
  width: 300px;
  box-sizing: border-box;
  max-height: 100vh;
  position: sticky;
  top: 0;

  @media (max-width: 768px) {
    display: none;
  }

  a {
    font-size: 13px;
    color: #cfcfcf;
    display: block;
    transition: color 0.3s;
    line-height: 160%;
    padding: 5px 0;
    &:hover {
      text-decoration: none;
      color: #00ffe9;
    }
  }

  .H2 {
    padding-left: 10px;
  }
  .H3 {
    padding-left: 20px;
  }
  .H4 {
    padding-left: 30px;
  }
`;

const CopyLink = styled.div`
  padding: 0 10px;

  button {
    font-size: 13px;
    color: #cfcfcf;
    line-height: 160%;
    background: transparent;
    border: 0;
    cursor: pointer;
    align-items: center;
    transition: color 0.3s;
    display: flex;
    width: 100%;
    transition: background-color 0.1s;
    padding: 10px 10px;
    border-radius: 5px;

    &:hover {
      background-color: #222;
      color: #00ffe9;
    }
  }

  span {
    margin-left: 5px;
  }
`;

const Edit = styled.div`
  font-size: 13px;
  color: #cfcfcf;
  line-height: 160%;

  a {
    transition: color 0.3s;
    color: #cfcfcf;
    display: flex;
    align-items: baseline;
    transition: background-color 0.1s;
    padding: 10px 10px;
    border-radius: 5px;

    span {
      margin-left: 10px;
    }
  }

  a:hover {
    color: #00ffe9;
    background-color: #222;
  }
  padding: 0 10px;
`;

const Subnav = styled.nav`
  position: sticky;
  top: 125px;
  padding: 0 20px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  max-height: calc(100vh - 125px);
`;

const Sticky = styled.div`
  z-index: 10000;
  position: sticky;
  top: 0;
  background: #121212;
  padding: 20px 0;
`;

const isVisible = function (el) {
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.top;
};

const Aside = function ({ id, isMounted, nonEditable, path, autoScroll, autoScrollTimeout }) {
  const [navNodes, setNavNodes] = useState([]);
  const [currentLink, setCurrentLink] = useState();
  const navRef = useRef();

  useEffect(
    function () {
      let timeout;
      let onScroll;

      const f = function () {
        let nodes = document.querySelectorAll(
          `#${id} h1 a:first-of-type, #${id} h2 a:first-of-type, #${id} h3 a:first-of-type, #${id} h4 a:first-of-type`
        );
        if (nodes.length === 0) {
          timeout = setTimeout(f, 1);
          return;
        }

        let nodes2 = [];
        for (let i = 0; i < nodes.length; i++) {
          nodes2[i] = nodes[i];
        }

        const el = document.querySelector('#' + window.location.href.split('#')[1]);
        if (el) {
          el.scrollIntoView();
        }
        setNavNodes(nodes2);

        if (window.innerHeight > 768) {
          setCurrentLink('#' + nodes2[0]?.href.split('#')[1]);
          let previousOffset = 0;
          window.addEventListener(
            'scroll',
            (onScroll = function () {
              const offset = window.pageYOffset || document.documentElement.scrollTop;
              const f = function () {
                const node = nodes2
                  .map(function (node) {
                    return isVisible(node);
                  })
                  .sort(function (a, b) {
                    return a - b;
                  })
                  .map(function (top, i) {
                    return {
                      top: top,
                      node: nodes2[i],
                    };
                  })
                  .filter(function (node) {
                    return node.top !== false && node.top < window.innerHeight;
                  })[0];
                const id = node?.node.href.split('#')[1];
                if (id !== undefined && node.top < 250) {
                  setCurrentLink('#' + id);
                  const el = document.querySelector('#link-' + id);
                  const rect = el.getBoundingClientRect();
                  if (
                    rect.top < navRef.current.getBoundingClientRect().top ||
                    rect.bottom > window.innerHeight - navRef.current.getBoundingClientRect().top
                  ) {
                    navRef.current.scrollBy(0, offset > previousOffset ? 200 : -200);
                  }
                }
              };
              if (autoScroll.current === false) {
                f();
              } else {
                setTimeout(f, 1000);
              }
              previousOffset = Math.max(0, offset);
            })
          );
        }
      };
      f();
      return function () {
        if (onScroll !== undefined) {
          window.removeEventListener('scroll', onScroll);
        }
        clearTimeout(timeout);
      };
    },
    [autoScroll, id, isMounted]
  );

  return (
    <AsideContainer>
      <Sticky>
        <CopyLink>
          <button
            onClick={function () {
              navigator.clipboard.writeText(window.location);
            }}
          >
            <LinkIcon fontSize="medium" />
            <span>Copy link</span>
          </button>
        </CopyLink>

        {!nonEditable && (
          <Edit>
            <a
              href={`https://github.com/computor-tools/computors.org/edit/master/docs${path}.md`}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon fontSize="inherit" />
              <span>Edit on GitHub</span>
            </a>
          </Edit>
        )}
      </Sticky>
      <Subnav ref={navRef}>
        {navNodes &&
          navNodes.map(function (node, i) {
            return (
              <div key={i}>
                <ActiveLink
                  element={HashLink}
                  replace
                  smooth
                  to={'#' + node.href.split('#')[1]}
                  onClick={function () {
                    if (autoScrollTimeout.current !== undefined) {
                      clearTimeout(autoScrollTimeout.current);
                    }
                    autoScroll.current = true;
                    autoScrollTimeout.current = setTimeout(function () {
                      autoScroll.current = false;
                    }, 1000);
                    setCurrentLink('#' + node.href.split('#')[1]);
                  }}
                  key={i}
                  id={'link-' + node.href.split('#')[1]}
                  active={currentLink === '#' + node.href.split('#')[1] ? 1 : 0}
                  className={node.parentNode.parentNode.tagName}
                >
                  {node.parentNode.innerText.slice(
                    0,
                    node.parentNode.innerText.indexOf('⇒') === -1
                      ? node.parentNode.innerText.length
                      : node.parentNode.innerText.indexOf('⇒')
                  )}
                </ActiveLink>
              </div>
            );
          })}
      </Subnav>
    </AsideContainer>
  );
};

export default Aside;
