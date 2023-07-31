import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import NavBar from '../../components/common/NavBar/NavBar';
import UploadImg from '../../assets/images/uploadImg.png';
import CommonButton from '../../components/common/Button/CommonButton';
import PostCode from '../../components/Modal/PostCode';
import { useSelector, useDispatch } from 'react-redux';
import { SET_SPOT } from '../../redux/Spot';
import IconDelete from '../../assets/icon/icon-delete.png';
import { spotUpload, uploadImgs } from '../../api/api';

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

const UploadBox = styled.div`
  width: 650px;
  height: 200px;
  line-height: 200px;
  margin-top: 10px;
  border: 2px dashed var(--pink);
  text-align: center;
  cursor: pointer;
`;

const UploadIcon = styled.img`
  width: 130px;
  vertical-align: middle;
`;

const ImgUpload = styled.input`
  display: none;
`;

const SpotImg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 650px;
`;

const ExtraImgList = styled.ol`
  margin: 5px 0;
  height: 220px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  &::-webkit-scrollbar {
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--vividPink);
    border-radius: 6px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
`;

const Image = styled.img`
  object-fit: cover;
`;

const DeleteBtn = styled.button`
  width: 18px;
  height: 18px;
  background-color: #cacaca;
  position: absolute;
  top: -3px;
  right: -3px;
  z-index: 1;
  border: none;
  cursor: pointer;
`;

const DeleteImg = styled.img`
  display: inline-block;
  width: 20px;
  height: 20px;
`;

const AddFileBtn = styled.button`
  width: 650px;
  padding: 10px;
  color: #000000;
  border: none;
  background-color: #cacaca;
  border-radius: 5px;
  font-size: 1.5rem;
`;

const UpdateForm = styled.div`
  position: relative;
  margin: 20px auto 70px;
  width: 650px;
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

  const handleClick = () => {
    if (imageList.length >= 4) {
      alert('사진은 4장까지 추가할 수 있습니다.');
      return;
    }
    imgRef.current?.click();
  };

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
    try {
      let imgFileList = uploadImgs(formData).then((data) => {
        console.log(data.imageFilename);
        return data.imageFilename;
      });

      return imgFileList;
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenClick = () => {
    setIsOpen(true);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  async function submitHandler(e) {
    e.preventDefault();
    //스토어에 스팟 정보 저장
    dispatch(SET_SPOT(spotValue.intro, spotValue.spotname, spot));
    try {
      spotUpload({
        spot: {
          address: spot,
          spotName: spotValue.spotname,
          intro: spotValue.intro,
          email: 'test@test.com',
          imageList: await getImageFile(),
        },
      }).then((data) => {
        alert(data.message);
      });
    } catch (error) {
      console.log(error);
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
          <label htmlFor='spotImg'>사진 등록 (최대 4장)</label>
          {imageList.length !== 0 ? (
            <>
              <ExtraImgList>
                {imageList.map((img) => (
                  <li key={img.id}>
                    <ImageContainer>
                      <Image
                        src={img.result}
                        alt=''
                        style={{
                          width: '170px',
                          height: '200px',
                        }}
                      />
                      <DeleteBtn
                        onClick={() => setImageList((prev) => prev.filter((a) => a.id !== img.id))}
                      >
                        <DeleteImg src={IconDelete} />
                      </DeleteBtn>
                    </ImageContainer>
                  </li>
                ))}
              </ExtraImgList>
              <AddFileBtn type='button' onClick={handleClick}>
                사진 추가하기
              </AddFileBtn>
            </>
          ) : (
            <UploadBox onClick={handleClick}>
              <UploadIcon src={UploadImg} />
            </UploadBox>
          )}
          <ImgUpload
            type='file'
            multiple
            accept='.jpg, .png, .jpeg, .bmp'
            id='spotImg'
            onChange={onChangeImage}
            ref={imgRef}
          />
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
