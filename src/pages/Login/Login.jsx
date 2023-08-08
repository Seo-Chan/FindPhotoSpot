import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LogoImg from '../../assets/images/logo.png';
import Input from '../../components/common/Input/Input';
import CommonButton from '../../components/common/Button/CommonButton';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/User';

const Container = styled.main`
  background-color: var(--ivory);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
const Logo = styled.img`
  width: 400px;
  position: fixed;
  top: 20%;
`;
const LoginContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 30px 0;
`;
const LinkContainer = styled.div`
  color: #767676;
  font-size: 1.2rem;
`;

const LoginForm = styled.form`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 50px 0 10px;
`;

const InputFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 16px;
  margin-bottom: 20px;
  padding: 40px 20px;
  border-radius: 20px;
  background-color: #ffffff;
`;

function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (email && password) {
      return setDisable(false);
    }
    setDisable(true);
  }, [email && password]);

  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  async function submitHandler(e) {
    e.preventDefault();
    let userData = {
      email: email,
      password: password,
    };
    dispatch(loginUser(userData));
  }
  return (
    <Container>
      <h1 className='ir-hidden'>로그인 페이지</h1>
      <Logo src={LogoImg} alt='로고' />
      <LoginContainer>
        <LoginForm onSubmit={submitHandler}>
          <InputFieldset>
            <Input
              id='email'
              labelText='이메일'
              placeholder='이메일을 입력해주세요'
              onChange={onEmailHandler}
              required={true}
            />
            <Input
              type='password'
              id='password'
              labelText='비밀번호'
              placeholder='비밀번호를 입력해주세요'
              onChange={onPasswordHandler}
              required={true}
            />
          </InputFieldset>
          <CommonButton
            size='lg'
            fontColor='black'
            txt='확인'
            bgColor={disable ? 'light' : 'vivid'}
            disabled={disable}
          />
        </LoginForm>
        <LinkContainer>
          <h2 className='ir-hidden'>회원가입 버튼</h2>
          <Link to='/join'>회원가입</Link>
        </LinkContainer>
      </LoginContainer>
    </Container>
  );
}

export default login;
