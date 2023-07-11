import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';
import UploadProfileImg from '../../../assets/images/uploadProfileImg.png';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.8rem;
  font-weight: 500;
`;

const JoinForm = styled.form`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 30px 0 20px;
`;

const InputFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 16px;
  margin-bottom: 40px;
  padding: 40px 20px;
  border-radius: 20px;
  background-color: #ffffff;
`;

const ImgUpload = styled.input`
  display: none;
`;

const UploadImgDiv = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  width: 220px;
  height: 220px;
  margin: 0 auto;
  border-radius: 50%;
  border: 2px solid var(--pink);
`;

const InputWrapper = styled.div`
  & + & {
    margin-top: 20px;
  }
`;

// const ErrorMessage = styled.strong`
//   position: absolute;
//   color: red;
//   margin-top: 5px;
//   padding: 0 5px;
// `;

const Message = styled.strong`
  position: absolute;
  color: ${(props) => (props.isChecked ? 'var(--vividPink)' : '#A4A4A4')};
  margin-top: 5px;
  padding: 0 5px;
`;

function EditProfile() {
  const [profileImgFile, setProfileImgFile] = useState(UploadProfileImg);
  const imgRef = useRef();

  const saveProfileImgFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      setProfileImgFile(reader.result);
    };
  };

  return (
    <Container>
      <Title>회원정보 수정</Title>
      <JoinForm>
        <InputFieldset>
          <label htmlFor='mainImg'>
            <UploadImgDiv image={profileImgFile} ref={imgRef}></UploadImgDiv>
          </label>
          <ImgUpload
            type='file'
            accept='image/*'
            id='mainImg'
            onChange={(e) => saveProfileImgFile(e)}
          />
          <InputWrapper>
            <Input
              id='nickname'
              labelText='닉네임'
              placeholder='닉네임을 입력해주세요'
              required={true}
            />
            <Message>✔︎ 2~10자 이내</Message>
          </InputWrapper>
          <InputWrapper>
            <Input
              id='intro'
              labelText='자기소개'
              placeholder='자기소개를 입력해주세요'
              required={true}
            />
          </InputWrapper>
        </InputFieldset>
        <Button size='lg' fontColor='black' txt='등록하기' bgColor='light' />
      </JoinForm>
    </Container>
  );
}

export default EditProfile;
