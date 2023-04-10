import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const InputLabel = styled.label`
  font-size: 1.3rem;
  font-weight: 500;
`;

const InputText = styled.input`
  border: none;
  border-bottom: 1px solid var(--pink);
  padding: 10px 5px 8px;
  font-family: inherit;
  font-size: 1.4rem;
  &::placeholder {
    color: #dbdbdb;
  }
  outline: none;
  font-weight: 400;
`;

function Input({ type = 'text', ...props }) {
  return (
    <InputContainer>
      <InputLabel htmlFor={props.id}>{props.labelText}</InputLabel>
      <InputText type={type} {...props} />
    </InputContainer>
  );
}

export default Input;
