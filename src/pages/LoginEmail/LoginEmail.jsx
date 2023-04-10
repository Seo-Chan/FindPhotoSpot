import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';

const Container = styled.main`
  background-color: var(--ivory);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 34px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Title = styled.h1`
  margin-bottom: 40px;
  text-align: center;
  font-size: 2.8rem;
  font-weight: 500;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 322px;
  margin: 50px 0 20px;
`;

const InputFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  margin-bottom: 50px;
`;

function LoginEmail() {
  return (
    <Container>
      <Title>로그인</Title>
      <LoginForm>
        <InputFieldset>
          <Input id='email' labelText='이메일' />
          <Input type='password' id='password' labelText='비밀번호' />
        </InputFieldset>
        <Button size='lg' fontColor='black' txt='확인' />
      </LoginForm>
      <Link to='/join'>이메일로 회원가입</Link>
    </Container>
  );
}

export default LoginEmail;
