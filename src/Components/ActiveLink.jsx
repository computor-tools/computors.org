import { Link } from 'react-router-dom';
import styled from 'styled-components';

const getPosition = function (string, subString, index) {
  return string.split(subString, index).join(subString).length;
};

const StyledElement = styled.div`
  ${function (props) {
    if (props.active) {
      return {
        color: '#00ffe9 !important',
        background: props.element ? 'transparent' : '#222',
      };
    }
  }}
`;

const ActiveLink = function (props) {
  const Element = props.element || Link;

  const f = function () {
    let l = props.level;
    while (l > 0) {
      if (props.to.slice(0, getPosition(props.to, '/', l + 1)) === window.location.pathname) {
        return true;
      }
      l--;
    }
    return false;
  };

  return (
    <Element {...props}>
      <StyledElement
        element={props.element}
        active={props.active || window.location.pathname === props.to || (props.index && f())}
      >
        {props.children}
      </StyledElement>
    </Element>
  );
};

export default ActiveLink;
