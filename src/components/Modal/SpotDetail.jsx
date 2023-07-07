import React from 'react';
import styled from 'styled-components';
import UploadImg from '../../assets/images/uploadImg.png';

const Container = styled.section`
  width: 800px;
  background-color: green;
  display: flex;
  gap: 50px;
  padding: 40px;
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

function SpotDetail() {
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
    </Container>
  );
}

export default SpotDetail;
