import React, { useState, useRef } from 'react';
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

const MainImgDesc = styled.p`
  margin: 5px 0;
`;

const ImgUpload = styled.input`
  display: none;
`;

const UploadImgDiv = styled.div`
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: contain;
  width: 170px;
  height: 200px;
  border: 2px solid var(--pink);
  border-radius: 5px;
`;

const SpotImg = styled.div`
  width: 800px;
  display: flex;
  flex-direction: row;
  gap: 80px;
`;

const MainImgContainer = styled.div``;

const AddImgContainer = styled.div``;

const ImgLabel = styled.label`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const UpdateForm = styled.form`
  position: relative;
  width: 800px;
  margin: 20px 0 70px;
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
  background-color: var(--lightPink);
  padding: 10px 5px 8px;
  font-family: inherit;
  font-size: 1.4rem;
  outline: none;
  font-weight: 400;
`;

function SpotUpdate() {
  const [mainImgFile, setMainImgFile] = useState(UploadImg);
  const imgRef = useRef();

  const saveImgFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      setMainImgFile(reader.result);
    };
  };

  return (
    <Container>
      <header>
        <NavBar />
      </header>
      <Title>스팟 등록</Title>
      <MainContainer>
        <SpotImg>
          <MainImgContainer>
            <MainImgDesc>스팟 대표 사진</MainImgDesc>
            <label htmlFor='spotImg'>
              <UploadImgDiv image={mainImgFile} ref={imgRef}></UploadImgDiv>
            </label>
            <ImgUpload type='file' accept='image/*' id='spotImg' onChange={(e) => saveImgFile(e)} />
          </MainImgContainer>
          <AddImgContainer>
            <MainImgDesc>추가 사진 (3장 까지 가능)</MainImgDesc>
            <ImgLabel htmlFor='spotImg'>
              <UploadImgDiv image={mainImgFile}></UploadImgDiv>
              <UploadImgDiv image={mainImgFile}></UploadImgDiv>
              <UploadImgDiv image={mainImgFile}></UploadImgDiv>
            </ImgLabel>
            <ImgUpload
              type='file'
              accept='image/*'
              id='spotImg'
              onChange={saveImgFile}
              ref={imgRef}
            />
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
        <Button size='lg' bgColor='light' fontColor='black' txt='등록하기' />
      </MainContainer>
    </Container>
  );
}

export default SpotUpdate;
