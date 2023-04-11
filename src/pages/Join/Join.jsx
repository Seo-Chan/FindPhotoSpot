import React from 'react';
import styled from 'styled-components';
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

const JoinForm = styled.form`
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

const InputDesc = styled.strong`
  display: inline-block;
  color: #767676;
  padding: 0 5px;
  margin-top: 5px;
`;

function Join() {
  return (
    <Container>
      <Title>회원가입</Title>
      <JoinForm>
        <InputFieldset>
          <Input id='email' labelText='이메일' placeholder='이메일을 입력해주세요' />
          <div>
            <Input
              type='password'
              id='password'
              labelText='비밀번호'
              placeholder='비밀번호를 입력해주세요'
            />
            <InputDesc>대소문자, 숫자, 특수문자 포함 8자 이상</InputDesc>
          </div>
          <div>
            <Input id='nickname' labelText='닉네임' placeholder='닉네임을 입력해주세요' />
            <InputDesc>2~6자 이내의 한글</InputDesc>
          </div>
          <Input id='intro' labelText='자기소개' placeholder='자기소개를 입력해주세요' />
        </InputFieldset>
        <Button size='lg' fontColor='black' txt='시작하기' />
      </JoinForm>
    </Container>
  );
}

export default Join;
