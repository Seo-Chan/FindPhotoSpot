import React, { useEffect } from 'react';
import styled from 'styled-components';
import NavBar from '../../components/common/NavBar/NavBar';
import UploadImg from '../../assets/images/uploadImg.png';
import Button from '../../components/common/Button/Button';

const Container = styled.div`
  padding-bottom: 50px;
`;

const Title = styled.h1`
  margin-top: 60px;
  text-align: center;
  font-size: 2.8rem;
  font-weight: 500;
`;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px auto 0;
  padding: 50px;
  font-size: 1.3rem;
  font-weight: 500;
  border-radius: 30px;
`;

const Label = styled.p`
  margin: 5px 0;
`;

const SpotImg = styled.div`
  width: 800px;
  display: flex;
  flex-direction: row;
  gap: 80px;
`;

const MainImgContainer = styled.div``;

const AddImgContainer = styled.div``;

const MainImg = styled.img`
  width: 170px;
  border-radius: 5px;
  border: 2px solid var(--pink);
  & + & {
    margin-left: 10px;
  }
`;

const UpdateForm = styled.form`
  position: relative;
  width: 800px;
  margin: 20px 0 20px;
`;

const InputFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const InputText = styled.input`
  border: none;
  border-bottom: 1px solid var(--pink);
  padding: 10px 5px 8px;
  font-family: inherit;
  font-size: 1.4rem;
  outline: none;
  font-weight: 400;
`;

const Desc = styled.p`
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 400;
  margin: 2px 0;
`;

const Map = styled.div`
  width: 800px;
  height: 350px;
  margin-bottom: 50px;
  border-radius: 5px;
`;

const { kakao } = window;

function SpotUpdate() {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(36.3515305, 127.3824293),
      level: 12,
    };
    const map = new kakao.maps.Map(container, options); //eslint-disable-line no-unused-vars
  }, []);

  return (
    <Container>
      <header>
        <NavBar />
      </header>
      <Title>스팟 등록</Title>
      <MainContainer>
        <SpotImg>
          <MainImgContainer>
            <Label>스팟 대표 사진</Label>
            <MainImg src={UploadImg} alt='' />
          </MainImgContainer>
          <AddImgContainer>
            <Label>추가 사진 (5장 까지 가능)</Label>
            <MainImg src={UploadImg} alt='' />
            <MainImg src={UploadImg} alt='' />
            <MainImg src={UploadImg} alt='' />
          </AddImgContainer>
        </SpotImg>
        <UpdateForm>
          <InputFieldset>
            <InputContainer>
              <label htmlFor='spotname'>스팟이름</label>
              <InputText type='text' />
            </InputContainer>
            <InputContainer>
              <label htmlFor='address'>스팟주소</label>
              <InputText type='text' />
            </InputContainer>
            <InputContainer>
              <label htmlFor='spotdesc'>스팟을 소개해주세요!</label>
              <InputText type='text' />
            </InputContainer>
          </InputFieldset>
        </UpdateForm>
        <div>
          <Label>스팟의 위치</Label>
          <Desc>클릭해서 마커를 찍어주세요. 드래그로 위치를 조정할 수 있어요.</Desc>
          <Map id='map'></Map>
        </div>
        <Button size='lg' bgColor='light' fontColor='black' txt='등록하기' />
      </MainContainer>
    </Container>
  );
}

export default SpotUpdate;
