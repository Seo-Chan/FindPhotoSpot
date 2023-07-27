import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CommonButton from '../common/Button/CommonButton';
import HeartImg from '../../assets/icon/icon-heart.png';
import EmptyHeartImg from '../../assets/icon/icon-emptyHeart.png';
import ProfileImg from '../../assets/images/profileImg.png';
import ImageSlider from '../ImageSlider';

const Container = styled.section`
  width: 700px;
  height: 400px;
  overflow: hidden;
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

// const ImgFile = styled.img`
//   width: 220px;
// `;

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

const HeartBtnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: absolute;
  right: 20px;
  font-size: 1.3rem;
`;

const HeartBtn = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    transform: scale(1.2);
  }
`;

const CloseBtnContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 15px;
`;

function SpotDetail({ handleCloseClick, spotID }) {
  const [spotValue, setSpotValue] = useState({
    email: '',
    spotName: '',
    address: '',
    intro: '',
    imageList: [],
    hearted: false,
    likeCount: 0,
  });

  useEffect(() => {
    const getSpotDetail = async () => {
      try {
        const response = await fetch(
          'http://49.50.172.178:8080/findPhotoSpot-0.0.1-SNAPSHOT/spot/findSpotById',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              spot: {
                spotId: spotID,
              },
            }),
          },
        );
        const test = await response.json();
        const spotData = JSON.parse(test.spot);
        setSpotValue({
          ...spotValue,
          email: spotData.email,
          address: spotData.address,
          spotName: spotData.spotName,
          intro: spotData.intro,
          imageList: spotData.imageList,
          hearted: spotData.hearted,
          likeCount: spotData.likeCount,
        });
      } catch (error) {
        console.log('error');
      }
    };
    getSpotDetail();
  }, [spotID]);

  const closeModal = () => {
    handleCloseClick();
  };

  const handleHeartClick = async () => {
    try {
      const response = await fetch(
        'http://49.50.172.178:8080/findPhotoSpot-0.0.1-SNAPSHOT/spotLike/like',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            spotLike: {
              spotId: spotID,
              email: 'test2@test.com',
            },
          }),
        },
      );
      const test = await response.json();
      console.log(test);
      setSpotValue((prev) => ({
        ...prev,
        hearted: true,
        likeCount: test.likeCount,
      }));
      // dispatch(FETCH_POST_DATA({ id: postId, token }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnHeartClick = async () => {
    try {
      const response = await fetch(
        'http://49.50.172.178:8080/findPhotoSpot-0.0.1-SNAPSHOT/spotLike/unLike',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            spotLike: {
              spotId: spotID,
              email: 'test2@test.com',
            },
          }),
        },
      );
      const test = await response.json();
      console.log(test);
      setSpotValue((prev) => ({
        ...prev,
        hearted: false,
        likeCount: test.likeCount,
      }));
      // dispatch(FETCH_POST_DATA({ id: postId, token }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <HeartBtnContainer>
        <p>{spotValue.likeCount}</p>
        <HeartBtn
          src={spotValue.hearted ? HeartImg : EmptyHeartImg}
          onClick={spotValue.hearted ? handleUnHeartClick : handleHeartClick}
        />
      </HeartBtnContainer>
      <SpotInfo>
        <h2 className='ir-hidden'>스팟 정보</h2>
        <ImgContainer>
          {!!spotValue.imageList && <ImageSlider image={spotValue.imageList} />}
        </ImgContainer>
        <SpotDesc>
          <Title>{spotValue.spotName}</Title>
          <SpotAdd>{spotValue.address}</SpotAdd>
          <div>
            <SpotWriter>Spot Review</SpotWriter>
            <UserList>
              <UserContainer>
                <ProfileImage src={ProfileImg} alt='프로필이미지' />
                <div>
                  <UserName>{spotValue.email}</UserName>
                  <p>{spotValue.intro}</p>
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
      <CloseBtnContainer>
        <CommonButton size='sm' type='button' bgColor='light' txt='닫기' onClick={closeModal} />
      </CloseBtnContainer>
    </Container>
  );
}

export default SpotDetail;
