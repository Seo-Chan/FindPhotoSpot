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
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 50px 0 20px;
`;

const InputFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  margin-bottom: 50px;
  border: 1px solid var(--pink);
  padding: 40px;
  border-radius: 20px;
  background-color: #ffffff;
`;

function LoginEmail() {
  return (
    <Container>
      <Title>로그인</Title>
      <LoginForm>
        <InputFieldset>
          <Input id='email' labelText='이메일' placeholder='이메일을 입력해주세요' />
          <Input
            type='password'
            id='password'
            labelText='비밀번호'
            placeholder='비밀번호를 입력해주세요'
          />
        </InputFieldset>
        <Button size='lg' fontColor='black' txt='확인' bgColor='light' />
      </LoginForm>
      <Link to='/join'>이메일로 회원가입</Link>
    </Container>
  );
}

export default LoginEmail;
