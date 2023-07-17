import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../../components/common/Input/Input';
import CommonButton from '../../components/common/Button/CommonButton';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { SET_USER } from '../../redux/User';

const Container = styled.main`
  background-color: var(--ivory);
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

const InputWrapper = styled.div`
  & + & {
    margin-top: 20px;
  }
`;

const ValidationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 10px;
`;

const ErrorMessage = styled.strong`
  position: absolute;
  color: red;
  margin-top: 5px;
  padding: 0 5px;
`;

const Message = styled.strong`
  position: absolute;
  color: ${(props) => (props.isChecked ? 'var(--vividPink)' : '#A4A4A4')};
  margin-top: 5px;
  padding: 0 5px;
`;

function Join() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [joinValue, setJoinValue] = useState({
    email: '',
    password: '',
    nickname: '',
    intro: '',
    profile: '',
  });
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  // const [nickname, setNickname] = useState('');
  // const [intro, setIntro] = useState('');
  // const [isValidatedEmail, setIsValidatedEmail] = useState(false);
  const [isValidatedPassword, setIsValidatedPassword] = useState(false);
  const [isValidatedNickname, setIsValidatedNickname] = useState(false);
  const [isValidatedPasswordCheck, setIsValidatedPasswordCheck] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (
      joinValue.email ||
      joinValue.password ||
      joinValue.passwordCheck ||
      joinValue.nickname ||
      joinValue.intro
    ) {
      return setDisable(false);
    }
    setDisable(true);
  }, [joinValue]);

  const isValid = (id, value) => {
    if (id === 'email') {
      const regexEmail =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (!regexEmail.test(value)) {
        // setIsValidatedEmail(false);
        setEmailError('✔︎ 이메일 형식이 올바르지 않습니다.');
      } else {
        // setIsValidatedEmail(true);
        setEmailError('');
      }
    } else if (id === 'password') {
      const regexPass = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[~?!@#$%^&*_-]).{8,}$/;
      if (!regexPass.test(value)) {
        setIsValidatedPassword(false);
      } else {
        setIsValidatedPassword(true);
      }
    } else if (id === 'nickname') {
      if (value.length >= 2 && value.length <= 10) {
        setIsValidatedNickname(true);
      } else {
        setIsValidatedNickname(false);
      }
    }
  };

  const inputChangeHandler = (e) => {
    const { id, value } = e.target;
    setJoinValue({
      ...joinValue,
      [id]: value,
    });
    isValid(id, value);
  };

  const passwordCheckValidation = (e) => {
    const { value } = e.target;

    setPasswordCheck((prev) => value); // eslint-disable-line no-unused-vars
  };

  useEffect(() => {
    // PasswordCheck의 길이가 0을 넘어갔을 때부터 실행되게 함
    // 그렇지 않으면 첫 랜더링때부터 PasswordCheck가 보이게됨.
    if (passwordCheck.length > 0) {
      // onChangePasswordCheck에서 나왔으므로 e.target.value로 state를 업데이트할 수 없음
      // 따라서 다음과 같은 방식으로 state를 업데이트 함
      setPasswordCheck((currentValue) => currentValue);

      if (joinValue.password === passwordCheck) {
        setIsValidatedPasswordCheck(true);
      } else {
        setIsValidatedPasswordCheck(false);
      }
    }
  }, [passwordCheck]);

  async function getEmailValidate() {
    try {
      //검증 오류 초기화
      setEmailError('');

      //백엔드 이메일 검증
      const response = await fetch(
        'http://49.50.172.178:8080/findPhotoSpot-0.0.1-SNAPSHOT/user/emailvalid',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: {
              email: joinValue.email,
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
  async function getNicknameValidate() {
    try {
      //검증 오류 초기화
      setEmailError('');

      //백엔드 닉네임 검증
      const response = await fetch(
        'http://49.50.172.178:8080/findPhotoSpot-0.0.1-SNAPSHOT/user/nicknamevalid',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: {
              nickname: joinValue.nickname,
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
  async function submitHandler(e) {
    e.preventDefault();
    const {
      email: { value: email },
      password: { value: password },
      nickname: { value: nickname },
      intro: { value: intro },
    } = e.target;
    if (!emailError) {
      //스토어에 유저 정보 저장
      dispatch(SET_USER({ email, password, nickname, intro }));
      try {
        //백엔드 이메일 검증
        const response = await fetch(
          'http://49.50.172.178:8080/findPhotoSpot-0.0.1-SNAPSHOT/user',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user: {
                email: email,
                password: password,
                nickname: nickname,
                intro: intro,
                profile_img: '',
              },
            }),
          },
        );
        const test = await response.json();
        alert(test.message);
      } catch (error) {
        console.log('error');
      }
      // 다음 페이지로 이동
      // navigate('/');
    }
  }

  return (
    <Container>
      <Title>회원가입</Title>
      <JoinForm onSubmit={submitHandler}>
        <InputFieldset>
          <InputWrapper>
            <ValidationWrapper>
              <Input
                id='email'
                labelText='이메일'
                placeholder='이메일을 입력해주세요'
                onChange={inputChangeHandler}
                required={true}
              />
              <CommonButton
                size='sm'
                fontColor='black'
                txt='확인'
                bgColor='light'
                disabled={disable}
                onClick={getEmailValidate}
                type='button'
              />
            </ValidationWrapper>
            <ErrorMessage>{emailError}</ErrorMessage>
          </InputWrapper>
          <InputWrapper>
            <Input
              type='password'
              id='password'
              labelText='비밀번호'
              placeholder='비밀번호를 입력해주세요'
              onChange={inputChangeHandler}
              required={true}
            />
            <Message isChecked={isValidatedPassword}>
              ✔︎ 대소문자, 숫자, 특수문자 포함 8자 이상
            </Message>
          </InputWrapper>
          <InputWrapper>
            <Input
              type='password'
              id='passwordCheck'
              labelText='비밀번호 확인'
              placeholder='비밀번호를 입력해주세요'
              onChange={passwordCheckValidation}
              required={true}
            />
            <Message isChecked={isValidatedPasswordCheck}>✔︎ 비밀번호 일치</Message>
          </InputWrapper>
          <InputWrapper>
            <ValidationWrapper>
              <Input
                id='nickname'
                labelText='닉네임'
                placeholder='닉네임을 입력해주세요'
                onChange={inputChangeHandler}
                required={true}
              />
              <CommonButton
                size='sm'
                fontColor='black'
                txt='확인'
                bgColor='light'
                disabled={disable}
                onClick={getNicknameValidate}
                type='button'
              />
            </ValidationWrapper>
            <Message isChecked={isValidatedNickname}>✔︎ 2~10자 이내</Message>
          </InputWrapper>
          <InputWrapper>
            <Input
              id='intro'
              labelText='자기소개'
              placeholder='자기소개를 입력해주세요'
              onChange={inputChangeHandler}
              required={true}
            />
          </InputWrapper>
        </InputFieldset>
        <CommonButton
          size='lg'
          fontColor='black'
          txt='시작하기'
          bgColor='light'
          disabled={disable}
        />
      </JoinForm>
    </Container>
  );
}

export default Join;
