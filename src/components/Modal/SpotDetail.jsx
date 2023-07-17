import React from 'react';
import styled from 'styled-components';
import UploadImg from '../../assets/images/uploadImg.png';
import CommonButton from '../common/Button/CommonButton';

const Container = styled.section`
  width: 700px;
  background-color: #ffffff;
  display: flex;
  gap: 50px;
  padding: 40px;
  position: relative;
  z-index: 2;
  margin: 20vh auto;
  border-radius: 15px;
  border: 2px solid var(--vividPink);
`;

const ImgContainer = styled.div`
  border: 2px solid var(--pink);
`;

const SpotDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
`;

function SpotDetail({ handleCloseClick }) {
  const closeModal = () => {
    handleCloseClick();
  };

  return (
    <Container>
      <h2 className='ir-hidden'>스팟 정보</h2>
      <ImgContainer>
        <img src={UploadImg} />
      </ImgContainer>
      <SpotDesc>
        <Title>스팟 이름</Title>
        <SpotAdd>스팟 주소</SpotAdd>
        <div>
          <SpotWriter>스팟 추천인</SpotWriter>
          <ul></ul>
        </div>
      </SpotDesc>
      <ButtonContainer>
        <CommonButton
          size='sm'
          type='button'
          bgColor='light'
          fontColor='black'
          txt='닫기'
          onClick={closeModal}
        />
      </ButtonContainer>
    </Container>
  );
}

export default SpotDetail;
