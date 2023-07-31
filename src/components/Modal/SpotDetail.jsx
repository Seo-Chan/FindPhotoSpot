import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CommonButton from '../common/Button/CommonButton';
import HeartImg from '../../assets/icon/icon-heart.png';
import EmptyHeartImg from '../../assets/icon/icon-emptyHeart.png';
import ImageSlider from '../ImageSlider';
import { getSpotData, getSpotReviewData, heartData, unheartData } from '../../api/api';

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

const UserName = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
  color: black;
`;

const SpotReview = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  padding-bottom: 4px;
  border-bottom: 1px solid #ffffff;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Review = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SpotIntro = styled.p`
  font-size: 1.2rem;
  line-height: 1.2;
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
  const [spotReview, setSpotReview] = useState([]);

  useEffect(() => {
    const getSpotDetail = async () => {
      try {
        getSpotData({
          spot: {
            spotId: spotID,
          },
        }).then((data) => {
          const spotData = JSON.parse(data.spot);
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
        });
      } catch (error) {
        console.log(error);
      }
    };

    const getSpotReview = async () => {
      try {
        getSpotReviewData({
          user: {
            spotId: spotID,
            email: 'test2@test.com',
          },
        }).then((data) => {
          const spotReviewData = JSON.parse(data.user);
          setSpotReview(spotReviewData);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getSpotDetail();
    getSpotReview();
  }, [spotID]);

  const closeModal = () => {
    handleCloseClick();
  };

  const handleHeartClick = async () => {
    try {
      heartData({
        spotLike: {
          spotId: spotID,
          email: 'test@test.com',
        },
      }).then((data) => {
        setSpotValue((prev) => ({
          ...prev,
          hearted: true,
          likeCount: data.likeCount,
        }));
        // dispatch(FETCH_POST_DATA({ id: postId, token }));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnHeartClick = async () => {
    try {
      unheartData({
        spotLike: {
          spotId: spotID,
          email: 'test@test.com',
        },
      }).then((data) => {
        setSpotValue((prev) => ({
          ...prev,
          hearted: false,
          likeCount: data.likeCount,
        }));
        // dispatch(FETCH_POST_DATA({ id: postId, token }));
      });
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
              {!!spotReview.length &&
                spotReview.map((review, index) => (
                  <SpotReview key={index}>
                    <img
                      src={`http://49.50.172.178:8080/findPhotoSpot-0.0.1-SNAPSHOT/image/${review.profile_img}`}
                    />
                    <Review>
                      <UserName>{review.nickname}</UserName>
                      <SpotIntro>{review.intro}</SpotIntro>
                    </Review>
                  </SpotReview>
                ))}
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
