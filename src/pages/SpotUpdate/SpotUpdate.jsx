import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import NavBar from '../../components/common/NavBar/NavBar';
import UploadImg from '../../assets/images/uploadImg.png';
import CommonButton from '../../components/common/Button/CommonButton';
import PostCode from '../../components/Modal/PostCode';
import { useSelector, useDispatch } from 'react-redux';
import { SET_SPOT } from '../../redux/Spot';
import IconDelete from '../../assets/icon/icon-delete.png';

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
  flex-direction: column;
  justify-content: start;
  width: 60vw;
`;

const ExtraImgList = styled.ol`
  /* display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: scroll;
  gap: 8px;
  background-color: var(--vividPink);
`;

const ImageContainer = styled.div`
  position: relative;
`;

const DeleteBtn = styled.button`
  background-color: transparent;
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 1;
  border: none;
  cursor: pointer;
`;

const Image = styled.img`
  object-fit: cover;
  border-radius: 10px;
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

const baseURL = 'http://49.50.172.178:8080/findPhotoSpot-0.0.1-SNAPSHOT';

// base64 -> 이미지 File로 전환
const dataURLtoFile = (dataUrl, filename) => {
  const arr = dataUrl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch != null ? mimeMatch[1] : 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

function SpotUpdate() {
  const dispatch = useDispatch();
  const [imageList, setImageList] = useState([]);
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

  //이미지 미리보기
  const onChangeImage = async (e) => {
    const { files } = e.target;
    if (files && files[0].size > 10 * 1024 * 1024) {
      alert('이미지 파일 사이즈는 10MB 이내로 등록 가능합니다.');
      return;
    }
    //파일 업로드 용량 제한(10MB)
    if (files.length > 4 || imageList.length > 3) {
      alert('첨부 가능 이미지 수는 최대 4장입니다.');
      return;
    }
    for await (const file of files || []) {
      const result = await new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => {
          const src = e.target.result;
          resolve(src);
        };
      });

      const id = Date.now();
      setImageList((prev) => [...prev, { id, result, filename: file.name }]);
    }
    e.target.value = '';
  };

  // 서버로 이미지 보내기
  const getImageFile = async () => {
    if (imageList.length === 0) throw new Error('등록된 미리보기 이미지가 없습니다');

    const formData = new FormData();
    for (const image of imageList) {
      formData.append('imageList', dataURLtoFile(image.result, image.filename));
    }
    const res = await fetch(`${baseURL}/image/uploadfiles`, {
      method: 'POST',
      body: formData,
    });
    //console.log(response);
    const test = await res.json();
    console.log(test.imageFilename); //imageFilename 항목에 등록된 이미지 파일명이 , 로 구분하여 나옴
    return test.imageFilename;
  };

  const handleOpenClick = () => {
    setIsOpen(true);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  async function submitHandler(e) {
    e.preventDefault();
    console.log(spot);
    //스토어에 스팟 정보 저장
    dispatch(SET_SPOT(spotValue.intro, spotValue.spotname, spot));
    try {
      const response = await fetch(
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
              imageFilename: await getImageFile(),
            },
          }),
        },
      );
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
          <MainImgDesc>스팟 사진 (4장 까지 가능)</MainImgDesc>
          <ExtraImgList>
            <label htmlFor='spotImg'>
              <UploadImgDiv image={UploadImg}></UploadImgDiv>
            </label>
            <ImgUpload
              type='file'
              multiple
              accept='.jpg, .png, .jpeg, .bmp'
              id='spotImg'
              onChange={onChangeImage}
              ref={imgRef}
            />
            {imageList.map((img) => (
              <li key={img.id}>
                <ImageContainer>
                  <Image
                    src={img.result}
                    alt=''
                    style={
                      imageList.length === 1
                        ? {
                            width: '304px',
                            height: '228px',
                          }
                        : {
                            width: '168px',
                            height: '126px',
                          }
                    }
                  />
                  <DeleteBtn
                    onClick={() => setImageList((prev) => prev.filter((a) => a.id !== img.id))}
                  >
                    <image src={IconDelete} />
                  </DeleteBtn>
                </ImageContainer>
              </li>
            ))}
          </ExtraImgList>
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
