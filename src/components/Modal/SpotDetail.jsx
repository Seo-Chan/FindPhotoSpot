import React from 'react';
import styled from 'styled-components';
// import UploadImg from '../../assets/images/uploadImg.png';
import Img from '../../assets/images/spotImg.JPG';
import ProfileImg from '../../assets/images/profileImg.png';

const Container = styled.section`
  width: 700px;
  height: 400px;
  background-color: #ffffff;
  padding: 15px;
  margin: 13vh auto;
  position: relative;
  z-index: 2;
  border-radius: 15px;
  border: 2px solid var(--vividPink);
`;

const SpotInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 20px;
`;

const ImgContainer = styled.div``;

const ImgFile = styled.img`
  width: 220px;
`;

const SpotDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const Title = styled.h3`
  font-size: 2.8rem;
  font-weight: 500;
`;

const SpotAdd = styled.p`
  font-size: 1.5rem;
`;

const SpotWriter = styled.p`
  font-size: 2rem;
  margin: 10px 0;
`;

const UserList = styled.ul`
  border-top: 2px solid var(--pink);
  height: 200px;
  padding: 10px 0;
  overflow: auto;
`;

const UserContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  & + & {
    margin-top: 10px;
  }
`;

const ProfileImage = styled.img`
  width: 50px;
  border-radius: 50%;
`;

const UserName = styled.p`
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 1.1rem;
  color: black;
`;

function SpotDetail() {
  return (
    <Container>
      <SpotInfo>
        <h2 className='ir-hidden'>스팟 정보</h2>
        <ImgContainer>
          <ImgFile src={Img} />
        </ImgContainer>
        <SpotDesc>
          <Title>국립세종수목원</Title>
          <SpotAdd>세종 수목원로 136</SpotAdd>
          <div>
            <SpotWriter>Spot Review</SpotWriter>
            <UserList>
              <UserContainer>
                <ProfileImage src={ProfileImg} alt='프로필이미지' />
                <div>
                  <UserName>모모바라기</UserName>
                  <p>
                    실내 수목원이 있어서 요즘 같이 비오는 날씨에도 쾌적하게 둘러볼 수 있어요!
                    사진스팟도 많아서 너무 좋아요
                  </p>
                </div>
              </UserContainer>
              <UserContainer>
                <ProfileImage src={ProfileImg} alt='프로필이미지' />
                <div>
                  <UserName>모모바라기</UserName>
                  <p>
                    실내 수목원이 있어서 요즘 같이 비오는 날씨에도 쾌적하게 둘러볼 수 있어요!
                    사진스팟도 많아서 너무 좋아요
                  </p>
                </div>
              </UserContainer>
              <UserContainer>
                <ProfileImage src={ProfileImg} alt='프로필이미지' />
                <div>
                  <UserName>모모바라기</UserName>
                  <p>
                    실내 수목원이 있어서 요즘 같이 비오는 날씨에도 쾌적하게 둘러볼 수 있어요!
                    사진스팟도 많아서 너무 좋아요
                  </p>
                </div>
              </UserContainer>
              <UserContainer>
                <ProfileImage src={ProfileImg} alt='프로필이미지' />
                <div>
                  <UserName>모모바라기</UserName>
                  <p>
                    실내 수목원이 있어서 요즘 같이 비오는 날씨에도 쾌적하게 둘러볼 수 있어요!
                    사진스팟도 많아서 너무 좋아요
                  </p>
                </div>
              </UserContainer>
            </UserList>
          </div>
        </SpotDesc>
      </SpotInfo>
    </Container>
  );
}

export default SpotDetail;
