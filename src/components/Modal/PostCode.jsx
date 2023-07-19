import React from 'react';
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import { useDispatch } from 'react-redux';
import { POST } from '../../redux/Spot';

const Container = styled.section`
  width: 40vw;
  position: absolute;
  top: 500px;
`;

const CloseBtn = styled.button`
  position: relative;
  top: 230px;
  left: 45%;
  width: 50px;
  padding: 5px;
  background-color: var(--pink);
  border: 1px solid #767676;
  border-radius: 5px;
  z-index: 200;
`;

function PostCode({ handleCloseClick }) {
  const dispatch = useDispatch();
  const closeModal = () => {
    handleCloseClick();
  };

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    //스토어에 스팟 주소 저장
    dispatch(POST({ address: fullAddress }));
    closeModal();
  };

  const postCodeStyle = {
    display: 'block',
    position: 'absolute',
    top: '80%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: '100%',
    height: '500px',
    zIndex: 100,
    border: '1px solid #767676',
  };

  return (
    <Container>
      <DaumPostcode style={postCodeStyle} autoClose onComplete={handlePostCode} />
      <CloseBtn type='button' onClick={closeModal}>
        닫기
      </CloseBtn>
    </Container>
  );
}

export default PostCode;
