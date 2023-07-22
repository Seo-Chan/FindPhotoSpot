import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LogoImg from '../../assets/images/logo.png';
import MessageCircle from '../../assets/icon/icon-message-circle.png';
import GoogleIcon from '../../assets/icon/icon-google.png';

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
  position: absolute;
  top: 30%;
`;
const LoginContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 6vh 34px 10vh 34px;
`;
const BtnContainer = styled.section`
  margin-bottom: 10px;
  // 버튼 공통 스타일
  & > button {
    background-color: #ffffff;
    display: flex;
    margin-bottom: 10px;
    width: 500px;
    padding: 10px 14px;
    border-radius: 44px;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;
const BtnText = styled.p`
  display: inline-block;
  margin: auto;
  color: #767676;
`;
const BtnKakao = styled.button`
  border: 1px solid #f2c94c;
`;
const BtnGoogle = styled.button`
  border: 1px solid #767676;
`;
const SNSLogo = styled.img`
  width: 24px;
  height: 24px;
`;
const LinkContainer = styled.section`
  color: #767676;
  font-size: 1.2rem;
`;
const LoginLink = styled(Link)`
  position: relative;
  margin-right: 18px;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    height: 15px;
    margin: 0 9px;
    background-color: #767676;
  }
`;

function login() {
  return (
    <Container>
      <h1 className='ir-hidden'>로그인 페이지</h1>
      <Logo src={LogoImg} alt='로고' />
      <LoginContainer>
        <BtnContainer>
          <h2 className='ir-hidden'>소셜 로그인 버튼</h2>
          <BtnKakao>
            <SNSLogo src={MessageCircle} alt='카카오 메세지 아이콘' />
            <BtnText>카카오톡 계정으로 로그인</BtnText>
          </BtnKakao>
          <BtnGoogle>
            <SNSLogo src={GoogleIcon} alt='구글 아이콘' />
            <BtnText>구글 계정으로 로그인</BtnText>
          </BtnGoogle>
        </BtnContainer>
        <LinkContainer>
          <h2 className='ir-hidden'>로그인 및 회원가입 버튼</h2>
          <LoginLink to='/login/loginEmail'>이메일로 로그인</LoginLink>
          <Link to='/join'>회원가입</Link>
        </LinkContainer>
      </LoginContainer>
    </Container>
  );
}

export default login;
