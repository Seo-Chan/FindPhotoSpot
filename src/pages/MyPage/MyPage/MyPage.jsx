import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavBar from '../../../components/common/NavBar/NavBar';
import UploadProfileImg from '../../../assets/images/uploadProfileImg.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SpotList from '../../../components/spot/SpotList';

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

const UserImg = styled.img`
  object-fit: cover;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  border: ${(props) => (props.user.profileImage ? 'none' : '2px solid var(--pink)')};
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
`;

const SpotPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Nickname = styled.p`
  font-size: 2rem;
  font-weight: 600;
`;

function MyPage() {
  const { user } = useSelector((state) => state);
  const [regSpotList, setRegSpotList] = useState([]);
  const [likedSpotList, setLikedSpotList] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(
          'http://49.50.172.178:8080/findPhotoSpot-0.0.1-SNAPSHOT/user/findUserByEmail',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user: {
                email: 'test@test.com',
              },
            }),
          },
        );
        const test = await response.json();
        const regSpotData = JSON.parse(test.spot);
        const likedSpotData = JSON.parse(test.likeSpot);
        setRegSpotList(regSpotData);
        setLikedSpotList(likedSpotData);

        // setSpotValue({
        //   ...spotValue,
        //   email: spotData.email,
        //   address: spotData.address,
        //   spotName: spotData.spotName,
        //   intro: spotData.intro,
        //   imageList: spotData.imageList,
        //   hearted: spotData.hearted,
        //   likeCount: spotData.likeCount,
        // });
      } catch (error) {
        console.log('error');
      }
    };
    getUserData();
  }, []);

  return (
    <Container>
      <header>
        <NavBar />
      </header>
      <Title>마이페이지</Title>
      <ProfileContainer>
        <UserProfile>
          <h2 className='ir-hidden'>나의 프로필</h2>
          <UserImg
            src={user.profileImage ? user.profileImage : UploadProfileImg}
            user={user}
          ></UserImg>
          <Nickname>{user.nickname}</Nickname>
          <Link to={'/mypage/editprofile'}>
            <p>회원정보 수정하기</p>
          </Link>
        </UserProfile>
        <SpotPostContainer>
          <SpotList title='좋아요 누른 스팟' spotList={likedSpotList} />
          <SpotList title='내가 추천한 스팟' spotList={regSpotList} />
        </SpotPostContainer>
      </ProfileContainer>
    </Container>
  );
}

export default MyPage;
