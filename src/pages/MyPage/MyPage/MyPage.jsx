import React from 'react';
import styled from 'styled-components';
import NavBar from '../../../components/common/NavBar/NavBar';
import UploadProfileImg from '../../../assets/images/uploadProfileImg.png';
import { Link } from 'react-router-dom';

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 1.1rem;
`;

const Title = styled.h1`
  margin-top: 60px;
  text-align: center;
  font-size: 2.8rem;
  font-weight: 500;
`;

const ProfileContainer = styled.main`
  display: flex;
  flex-direction: row;
  gap: 70px;
  justify-content: center;
  width: 1000px;
  margin: 30px auto 0;
  padding: 50px;
  font-size: 1.3rem;
  font-weight: 500;
  border-radius: 30px;
`;

const ProfileImg = styled.img`
  width: 220px;
  border-radius: 50%;
  border: 2px solid var(--pink);
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const LikeSpotContainer = styled.div`
  margin: 20px 0;
`;

const LikeSpot = styled.h3`
  width: 35vw;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 8px;
  border-bottom: 1px solid var(--pink);
`;

const Nickname = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

function MyPage() {
  return (
    <Container>
      <header>
        <NavBar />
      </header>
      <Title>마이페이지</Title>
      <ProfileContainer>
        <UserProfile>
          <h2 className='ir-hidden'>나의 프로필</h2>
          <ProfileImg src={UploadProfileImg} alt='' />
          <Nickname>[ 닉네임 ]</Nickname>
          <Link to={'/login'}>
            <p>회원정보 수정하기</p>
          </Link>
        </UserProfile>
        <LikeSpotContainer>
          <LikeSpot>나의 관심 스팟</LikeSpot>
          <ul></ul>
        </LikeSpotContainer>
      </ProfileContainer>
    </Container>
  );
}

export default MyPage;
