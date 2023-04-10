import React from 'react';
import styled from 'styled-components';

/**
 * @param {{size: "lg"|"md"|"ms"|"sm" ; fontColor: "selectColor" ; bgColor: "vivid"|"pink"|"light"|"ivory";  onClick: "eventprops" ; disabled: "false"|"true" ; txt: "buttonText"}}
 */

const Btn = styled.button`
  width: ${(props) => {
    switch (props.size) {
      case 'lg':
        return '322px';
      case 'md':
        return '120px';
      case 'ms':
        return '90px';
      case 'sm':
        return '56px';
      default:
        return '120px';
    }
  }};
  height: ${(props) => {
    switch (props.size) {
      case 'lg':
        return '50px';
      case 'md':
        return '40px';
      case 'ms':
        return '38px';
      case 'sm':
        return '34px';
      default:
        return '38px';
    }
  }};
  padding: ${(props) => {
    switch (props.size) {
      case 'lg':
        return '13px 0';
      case 'md':
        return '8px 0;';
      case 'ms':
        return '7px 0;';
      case 'sm':
        return '7px 0';
      default:
        return '8px';
    }
  }};
  border-radius: ${(props) => {
    switch (props.size) {
      case 'lg':
        return '44px';
      case 'md':
        return '30px';
      case 'ms':
        return '32px';
      case 'sm':
        return '26px';
      default:
        return '30px';
    }
  }};
  border: ${(props) => (props.bgColor === 'white' ? '1px solid #dbdbdb' : 'none')};
  font-family: inherit;
  font-weight: ${(props) => (props.size === 'sm' ? '400' : '500')};

  font-size: ${(props) => (props.size === 'sm' ? '1.3rem' : '1.5rem')};

  color: ${(props) => (props.fontColor ? props.fontColor : 'white')};
  background-color: ${(props) => {
    switch (props.bgColor) {
      case 'vivid':
        return 'var(--vividPink)';
      case 'pink':
        return 'var(--pink) ';
      case 'light':
        return 'var(--lightPink)';
      case 'ivory':
        return 'var(--ivory)';
      default:
        return 'var(--pink)';
    }
  }};
  cursor: pointer;
  line-height: ${(props) => (props.size === 'sm' ? '15px' : '20px')};
  flex-shrink: 0;
`;

function Button({ size, fontColor, bgColor, onClick, disabled, txt }) {
  return (
    <Btn size={size} fontColor={fontColor} bgColor={bgColor} onClick={onClick} disabled={disabled}>
      {txt}
    </Btn>
  );
}

export default Button;
