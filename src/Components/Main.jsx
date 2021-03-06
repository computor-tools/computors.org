import React, { lazy, useEffect, useRef, useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import Aside from './Aside';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import LinkIcon from '@material-ui/icons/Link';
import LaunchIcon from '@material-ui/icons/Launch';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    width: calc(100vw - 28px);
  }
`;

const MainContent = styled.div`
  width: calc(100vw - 550px - 4vw);
  padding: 0 2vw;
  min-height: calc(100vh - 58px - 60px);
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: calc(100vw - 28px);
    padding: 0;
    margin-bottom: 20px;
  }

  a svg {
    position: relative;
    top: 5px;
    margin-left: 2px;
  }
`;

const MainFooter = styled.div`
  padding: 40px 0 0 0;
  display: flex;
`;

const MainFooterLinkContainer = styled.div`
  flex: 0.5;
  display: flex;
`;

const MainFooterLink = styled(Link)`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 15px 30px;
  border-radius: 5px;
  border: 1px solid #444;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  line-height: 160%;

  @media (max-width: 768px) {
    padding: 10px;
  }

  &:hover {
    color: #00ffe9;
    border-color: #00ffe9;
    text-decoration: none;
  }

  div {
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  svg {
    @media (max-width: 768px) {
      transform: scale(0.8);
    }
  }
`;

const Previous = styled(MainFooterLink)`
  margin-right: 20px;
  align-self: flex-start;

  div {
    margin-left: 20px;
    @media (max-width: 768px) {
      margin-left: 5px;
    }
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  div div {
    margin: 0;
  }
`;

const Next = styled(MainFooterLink)`
  align-self: flex-end;
  justify-content: flex-end;
  div {
    margin-right: 20px;
    @media (max-width: 768px) {
      margin-right: 5px;
    }
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  div div {
    margin: 0;
  }
`;

const MainFooterLinkCategory = styled.div`
  color: #999;
  font-size: 13px;
  text-decoration: none;
  font-weight: normal;

  @media (max-width: 768px) {
    font-size: 9px !important;
  }
`;

const CopyCode = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  color: #777;
  transition: color 0.4s;
  background: transparent;
  border: 0;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

const getInnerText = function (obj) {
  var buf = '';
  if (obj) {
    var type = typeof obj;
    if (type === 'string' || type === 'number') {
      buf += obj;
    } else if (type === 'object') {
      var children = null;
      if (Array.isArray(obj)) {
        children = obj;
      } else {
        var props = obj.props;
        if (props) {
          children = props.children;
        }
      }
      if (children) {
        if (Array.isArray(children)) {
          children.forEach(function (o) {
            buf += getInnerText(o);
          });
        } else {
          buf += getInnerText(children);
        }
      }
    }
  }
  return buf;
};

const Main = function ({ category, file, url, ext, i, nonEditable, prevRoute, nextRoute }) {
  i.current++;
  const Element = lazy(function () {
    const parts = url.split('/');
    switch (parts.length) {
      case 1:
        return import(`../../docs${parts[0]}.${ext}`);
      case 2:
        return import(`../../docs${parts[0]}/${parts[1]}.${ext}`);
      case 3:
        return import(`../../docs${parts[0]}/${parts[1]}/${parts[2]}.${ext}`);
      case 4:
        return import(`../../docs${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}.${ext}`);
      case 5:
        return import(
          `../../docs${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}/${parts[4]}.${ext}`
        );
      case 6:
        return import(
          `../../docs${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}/${parts[4]}/${parts[5]}.${ext}`
        );
      case 7:
        return import(
          `../../docs${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}/${parts[4]}/${parts[5]}/${parts[6]}.${ext}`
        );
      case 8:
        return import(
          `../../docs${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}/${parts[4]}/${parts[5]}/${parts[6]}/${parts[7]}.${ext}`
        );
      case 9:
        return import(
          `../../docs${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}/${parts[4]}/${parts[5]}/${parts[6]}/${parts[7]}/${parts[8]}.${ext}`
        );
      case 10:
        return import(
          `../../docs${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}/${parts[4]}/${parts[5]}/${parts[6]}/${parts[7]}/${parts[8]}/${parts[9]}.${ext}`
        );
    }
  });

  const autoScroll = useRef(false);
  const autoScrollTimeout = useRef();

  const components = {
    img: function Img(props) {
      const [src, setSrc] = useState();
      useEffect(
        function () {
          const parts = props.src.slice('/docs'.length, props.src.lastIndexOf('.')).split('/');
          const ext2 = props.src.slice(props.src.lastIndexOf('.') + 1);

          const load = function () {
            switch (parts.length) {
              case 1:
                return import(`../../docs${parts[0]}.${ext2}`);
              case 2:
                return import(`../../docs${parts[0]}/${parts[1]}.${ext2}`);
              case 3:
                return import(`../../docs${parts[0]}/${parts[1]}/${parts[2]}.${ext2}`);
              case 4:
                return import(`../../docs${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}.${ext2}`);
              case 5:
                return import(
                  `../../docs${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}/${parts[4]}.${ext2}`
                );
              case 6:
                return import(
                  `../../docs${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}/${parts[4]}/${parts[5]}.${ext2}`
                );
              case 7:
                return import(
                  `../../docs${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}/${parts[4]}/${parts[5]}/${parts[6]}.${ext2}`
                );
              case 8:
                return import(
                  `../../docs${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}/${parts[4]}/${parts[5]}/${parts[6]}/${parts[7]}.${ext2}`
                );
              case 9:
                return import(
                  `../../docs${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}/${parts[4]}/${parts[5]}/${parts[6]}/${parts[7]}/${parts[8]}.${ext2}`
                );
              case 10:
                return import(
                  `../../docs${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}/${parts[4]}/${parts[5]}/${parts[6]}/${parts[7]}/${parts[8]}/${parts[9]}.${ext2}`
                );
            }
          };

          load().then(function (image) {
            setSrc(image.default);
          });
        },
        [props.src]
      );
      return <img {...props} src={src} />;
    },
    a: function (props) {
      let hostname;
      try {
        hostname = new URL(props.href);
      } catch {
        hostname = undefined;
      }
      const external = hostname !== undefined && window.location.hostname !== hostname;

      return props.href?.charAt(0) === '#' && !props.name ? (
        <HashLink
          replace
          smooth
          to={'#' + props.href.split('#')[1]}
          onClick={function () {
            if (autoScrollTimeout.current !== undefined) {
              clearTimeout(autoScrollTimeout.current);
            }
            autoScroll.current = true;
            autoScrollTimeout.current = setTimeout(function () {
              autoScroll.current = false;
            }, 1000);
          }}
        >
          {props.children}
        </HashLink>
      ) : (
        <a {...props} id={props.name} {...(external ? { target: '_blank' } : {})}>
          {props.children}
          {external && <LaunchIcon fontSize="small" />}
        </a>
      );
    },
    pre: function (props) {
      return (
        <pre {...props}>
          <CopyCode
            title="Copy code"
            onClick={function () {
              navigator.clipboard.writeText(getInnerText(props.children));
            }}
          >
            <FileCopyIcon />
          </CopyCode>
          {props.children}
        </pre>
      );
    },
    h1: function (props) {
      return (
        <h1 {...props}>
          <button
            onClick={function () {
              navigator.clipboard.writeText(window.location.href.split('#')[0] + '#' + props.id);
            }}
          >
            <LinkIcon />
          </button>
          <span>{props.children}</span>
        </h1>
      );
    },
    h2: function (props) {
      return (
        <h2 {...props}>
          <button
            onClick={function () {
              navigator.clipboard.writeText(window.location.href.split('#')[0] + '#' + props.id);
            }}
          >
            <LinkIcon />
          </button>
          <span>{props.children}</span>
        </h2>
      );
    },
    h3: function (props) {
      return (
        <h3 {...props}>
          <button
            onClick={function () {
              navigator.clipboard.writeText(window.location.href.split('#')[0] + '#' + props.id);
            }}
          >
            <LinkIcon />
          </button>
          <span>{props.children}</span>
        </h3>
      );
    },
    h4: function (props) {
      return (
        <h4 {...props}>
          <button
            onClick={function () {
              navigator.clipboard.writeText(window.location.href.split('#')[0] + '#' + props.id);
            }}
          >
            <LinkIcon />
          </button>
          <span>{props.children}</span>
        </h4>
      );
    },
  };

  return (
    <React.Suspense
      fallback={
        <MainContent>
          <h1>Loading...</h1>
        </MainContent>
      }
    >
      <MainContainer>
        <MainContent id={`main${i.current}`}>
          <MDXProvider components={components}>
            <Element />
          </MDXProvider>
          <MainFooter>
            <MainFooterLinkContainer>
              {prevRoute !== undefined && (
                <Previous to={prevRoute.file.toLowerCase()}>
                  <ArrowBackIcon />
                  <div>
                    <MainFooterLinkCategory>{prevRoute.category} - Previous</MainFooterLinkCategory>
                    {prevRoute.name}
                  </div>
                </Previous>
              )}
            </MainFooterLinkContainer>
            <MainFooterLinkContainer>
              {nextRoute !== undefined && (
                <Next to={nextRoute.file.toLowerCase()}>
                  <div>
                    <MainFooterLinkCategory>Next - {nextRoute.category}</MainFooterLinkCategory>
                    {nextRoute.name}
                  </div>
                  <ArrowForwardIcon />
                </Next>
              )}
            </MainFooterLinkContainer>
          </MainFooter>
        </MainContent>
        <Aside
          id={`main${i.current}`}
          nonEditable={nonEditable}
          category={category}
          path={file}
          autoScroll={autoScroll}
          autoScrollTimeout={autoScrollTimeout}
        />
      </MainContainer>
    </React.Suspense>
  );
};

export default Main;
