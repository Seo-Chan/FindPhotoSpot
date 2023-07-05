import React, { useState, useRef } from 'react';
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
  padding: 40px;
  font-size: 1.3rem;
  font-weight: 500;
`;

const ImgUpload = styled.input`
  display: none;
`;

const UploadImgDiv = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  border: 2px solid var(--pink);
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const SpotPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SpotList = styled.ul`
  width: 40vw;
  height: 200px;
  background-color: var(--lightPink);
  border-radius: 15px;
`;

const SpotListContainer = styled.div``;

const SpotPost = styled.h3`
  width: 35vw;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 8px;
`;

const Nickname = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

function MyPage() {
  const [profileImgFile, setProfileImgFile] = useState(UploadProfileImg);
  const imgRef = useRef();

  const saveProfileImgFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      setProfileImgFile(reader.result);
    };
  };

  return (
    <Container>
      <header>
        <NavBar />
      </header>
      <Title>마이페이지</Title>
      <ProfileContainer>
        <UserProfile>
          <h2 className='ir-hidden'>나의 프로필</h2>
          <label htmlFor='mainImg'>
            <UploadImgDiv image={profileImgFile} ref={imgRef}></UploadImgDiv>
          </label>
          <ImgUpload
            type='file'
            accept='image/*'
            id='mainImg'
            onChange={(e) => saveProfileImgFile(e)}
          />
          <Nickname>[ 닉네임 ]</Nickname>
          <Link to={'/login'}>
            <p>회원정보 수정하기</p>
          </Link>
        </UserProfile>
        <SpotPostContainer>
          <SpotListContainer>
            <SpotPost>좋아요 누른 스팟</SpotPost>
            <SpotList></SpotList>
          </SpotListContainer>
          <SpotListContainer>
            <SpotPost>추천한 스팟</SpotPost>
            <SpotList></SpotList>
          </SpotListContainer>
        </SpotPostContainer>
      </ProfileContainer>
    </Container>
  );
}

export default MyPage;
