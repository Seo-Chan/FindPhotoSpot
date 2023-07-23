import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import NavBar from '../../components/common/NavBar/NavBar';
import UploadImg from '../../assets/images/uploadImg.png';
import CommonButton from '../../components/common/Button/CommonButton';
// import DaumPostcode from 'react-daum-postcode';
import PostCode from '../../components/Modal/PostCode';
import { useSelector, useDispatch } from 'react-redux';
import { SET_SPOT } from '../../redux/Spot';

const Container = styled.div`
  padding-bottom: 50px;
`;

const Title = styled.h1`
  margin-top: 60px;
  text-align: center;
  font-size: 2.8rem;
  font-weight: 500;
`;

const MainContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px auto 0;
  padding: 40px;
  font-size: 1.5rem;
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 80px;
`;

const MainImgContainer = styled.div``;

const AddImgContainer = styled.div``;

const ExtraImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`;

const UpdateForm = styled.div`
  position: relative;
  margin: 20px auto 70px;
  width: 60vw;
`;

const InputFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;
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

const PostSearch = styled.div`
  display: flex;
  gap: 20px;
`;

const PostInputText = styled(InputText)`
  width: 100%;
`;

const PostBtn = styled.button`
  width: 40px;
  background-color: #cacaca;
  border: none;
  padding: 5px;
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
  const dispatch = useDispatch();
  const [mainImgFile, setMainImgFile] = useState(UploadImg);
  const [extraImgFile1, setExtraImgFile1] = useState(UploadImg);
  const [extraImgFile2, setExtraImgFile2] = useState(UploadImg);
  const [extraImgFile3, setExtraImgFile3] = useState(UploadImg);
  const [spotValue, setSpotValue] = useState({
    spotname: '',
    intro: '',
  });
  const [isOpen, setIsOpen] = useState(false); // 모달 창 Open 여부 저장
  const imgRef = useRef();
  const spot = useSelector((state) => state.spot.address); // 스팟 주소 불러오기

  const inputChangeHandler = (e) => {
    const { id, value } = e.target;
    setSpotValue({
      ...spotValue,
      [id]: value,
    });
  };

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

  const handleOpenClick = () => {
    setIsOpen(true);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  const getImageFile = async () => {
    const FileElement = document.querySelector('#mainImg'); //input type='file' 의 id
    console.log(FileElement.files);
    const formData = new FormData();
    formData.append('file', FileElement.files[0]);
    const fileresponse = await fetch(
      'http://49.50.172.178:8080/findPhotoSpot-0.0.1-SNAPSHOT/image/uploadfile',
      {
        method: 'POST',
        //headers: { 'Content-Type': 'application/json' },//headers 달면 에러남
        //headers: { 'Content-Type': 'multipart/form-data' },
        body: formData,
      },
    );
    //console.log(response);
    const test = await fileresponse.json();
    console.log(test.imageFilename); //imageFilename 항목에 등록된 이미지 파일명이 나옴
    return test.imageFilename;
  };

  async function submitHandler(e) {
    e.preventDefault();

    //스토어에 스팟 정보 저장
    dispatch(SET_SPOT({ spotValue }));
    try {
      const response = await fetch(
        // 'http://localhost:8080/spot/insertSpot',
        'http://49.50.172.178:8080/findPhotoSpot-0.0.1-SNAPSHOT/spot/insertSpot',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            spot: {
              address: spot,
              spotName: spotValue.spotname,
              intro: spotValue.intro,
              email: 'test@test.com',
              thumbnailImg: await getImageFile(),
              subImg1: '',
              subImg2: '',
              subImg3: '',
            },
          }),
        },
      );
      //console.log(response);
      const test = await response.json();
      alert(test.message);
    } catch (error) {
      console.log('error');
    }
  }

  return (
    <Container>
      <header>
        <NavBar />
      </header>
      <Title>스팟 등록</Title>
      <MainContainer onSubmit={submitHandler}>
        {isOpen && <PostCode handleCloseClick={handleCloseClick} />}
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
              <InputText type='text' id='spotname' onChange={inputChangeHandler} />
            </InputContainer>
            <InputContainer>
              <label htmlFor='address'>스팟주소</label>
              <PostSearch>
                <PostBtn type='button' onClick={handleOpenClick}>
                  검색
                </PostBtn>
                <PostInputText
                  type='text'
                  id='address'
                  defaultValue={spot}
                  readOnly
                  onChange={inputChangeHandler}
                />
              </PostSearch>
            </InputContainer>
            <InputContainer>
              <label htmlFor='spotdesc'>스팟을 소개해주세요!</label>
              <TextArea cols='10' rows='10' id='intro' onChange={inputChangeHandler} />
            </InputContainer>
          </InputFieldset>
        </UpdateForm>
        <CommonButton size='lg' bgColor='light' fontColor='black' txt='등록하기' />
      </MainContainer>
    </Container>
  );
}

export default SpotUpdate;
