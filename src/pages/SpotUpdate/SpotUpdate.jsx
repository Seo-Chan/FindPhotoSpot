import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import NavBar from '../../components/common/NavBar/NavBar';
import UploadImg from '../../assets/images/uploadImg.png';
import CommonButton from '../../components/common/Button/CommonButton';

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
  padding: 40px;
  font-size: 1.3rem;
  font-weight: 500;
`;

const MainImgDesc = styled.p`
  margin: 5px 0;
`;

const ImgUpload = styled.input`
  display: none;
`;

const UploadImgDiv = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
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

const ExtraImgContainer = styled.div`
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

const TextArea = styled.textarea`
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
  const [extraImgFile1, setExtraImgFile1] = useState(UploadImg);
  const [extraImgFile2, setExtraImgFile2] = useState(UploadImg);
  const [extraImgFile3, setExtraImgFile3] = useState(UploadImg);
  const imgRef = useRef();

  const saveMainImgFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      setMainImgFile(reader.result);
    };
  };
  const saveExtraImgFile1 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      setExtraImgFile1(reader.result);
    };
  };
  const saveExtraImgFile2 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      setExtraImgFile2(reader.result);
    };
  };
  const saveExtraImgFile3 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      setExtraImgFile3(reader.result);
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
            <label htmlFor='mainImg'>
              <UploadImgDiv image={mainImgFile} ref={imgRef}></UploadImgDiv>
            </label>
            <ImgUpload
              type='file'
              accept='image/*'
              id='mainImg'
              onChange={(e) => saveMainImgFile(e)}
            />
          </MainImgContainer>
          <AddImgContainer>
            <MainImgDesc>추가 사진 (3장 까지 가능)</MainImgDesc>
            <ExtraImgContainer>
              <label htmlFor='extraImg1'>
                <UploadImgDiv image={extraImgFile1}></UploadImgDiv>
              </label>
              <ImgUpload
                type='file'
                accept='image/*'
                id='extraImg1'
                onChange={(e) => saveExtraImgFile1(e)}
                ref={imgRef}
              />
              <label htmlFor='extraImg2'>
                <UploadImgDiv image={extraImgFile2}></UploadImgDiv>
              </label>
              <ImgUpload
                type='file'
                accept='image/*'
                id='extraImg2'
                onChange={(e) => saveExtraImgFile2(e)}
                ref={imgRef}
              />
              <label htmlFor='extraImg3'>
                <UploadImgDiv image={extraImgFile3}></UploadImgDiv>
              </label>
              <ImgUpload
                type='file'
                accept='image/*'
                id='extraImg3'
                onChange={(e) => saveExtraImgFile3(e)}
                ref={imgRef}
              />
            </ExtraImgContainer>
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
              <TextArea cols='10' rows='10' />
            </InputContainer>
          </InputFieldset>
        </UpdateForm>
        <CommonButton size='lg' bgColor='light' fontColor='black' txt='등록하기' />
      </MainContainer>
    </Container>
  );
}

export default SpotUpdate;
