import React, { useEffect } from 'react';
import styled from 'styled-components';
import Input from '../../components/common/Input/Input';
import CommonButton from '../../components/common/Button/CommonButton';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { SET_USER } from '../../redux/User';
import { joinSubmit } from '../../api/api';
import { useForm } from 'react-hook-form';
import { emailValid, nicknameValid } from '../../api/api';

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
    margin-top: 12px;
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

function Join() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [disable, setDisable] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setFocus,
  } = useForm();

  const regex = {
    email:
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
    password: /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[~?!@#$%^&*_-]).{8,}$/,
  };

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  // useEffect(() => {
  //   if (
  //     joinValue.email ||
  //     joinValue.password ||
  //     joinValue.passwordCheck ||
  //     joinValue.nickname ||
  //     joinValue.intro
  //   ) {
  //     return setDisable(false);
  //   }
  //   setDisable(true);
  // }, [joinValue]);

  async function getEmailValidate() {
    const emailValue = getValues('email');
    try {
      //백엔드 이메일 검증
      emailValid({
        user: {
          email: emailValue,
        },
      }).then((data) => {
        alert(data.message);
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function getNicknameValidate() {
    const nicknameValue = getValues('nickname');
    try {
      //백엔드 닉네임 검증
      nicknameValid({
        user: {
          nickname: nicknameValue,
        },
      }).then((data) => {
        alert(data.message);
      });
    } catch (error) {
      console.log(error);
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
    // if (!emailError) {
    //스토어에 유저 정보 저장
    dispatch(SET_USER({ email, password, nickname, intro }));
    try {
      //백엔드 닉네임 검증
      joinSubmit({
        user: {
          email: email,
          password: password,
          nickname: nickname,
          intro: intro,
          profile_img: '',
        },
      }).then((data) => {
        alert(data.message);
      });
    } catch (error) {
      console.log(error);
    }

    // 다음 페이지로 이동
    // navigate('/');
    // }
  }

  return (
    <Container>
      <Title>회원가입</Title>
      <JoinForm onSubmit={handleSubmit(submitHandler)}>
        <InputFieldset>
          <InputWrapper>
            <ValidationWrapper>
              <Input
                id='email'
                type='text'
                labelText='이메일'
                placeholder='이메일을 입력해주세요'
                register={register('email', {
                  required: '이메일은 필수 입력입니다.',
                  pattern: {
                    value: regex.email,
                    message: '✔︎ 이메일 형식이 올바르지 않습니다.',
                  },
                })}
              />
              <CommonButton
                size='sm'
                fontColor='black'
                txt='확인'
                bgColor='light'
                // disabled={disable}
                onClick={getEmailValidate}
                type='button'
              />
            </ValidationWrapper>
            <ErrorMessage>{errors?.email?.message}</ErrorMessage>
          </InputWrapper>
          <InputWrapper>
            <Input
              id='password'
              type='password'
              labelText='비밀번호'
              placeholder='대소문자, 숫자, 특수문자 포함 8자 이상으로 입력해주세요'
              register={register('password', {
                required: '비밀번호는 필수 입력입니다.',
                minLength: {
                  value: 8,
                  message: '✔︎ 대소문자, 숫자, 특수문자 포함 8자 이상',
                },
                pattern: {
                  value: regex.password,
                  message: '✔︎ 대소문자, 숫자, 특수문자 포함 8자 이상',
                },
              })}
            />
            <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          </InputWrapper>
          <InputWrapper>
            <Input
              type='password'
              id='passwordCheck'
              labelText='비밀번호 확인'
              placeholder='대소문자, 숫자, 특수문자 포함 8자 이상으로 입력해주세요'
              // onChange={passwordCheckValidation}
              register={register('passwordCheck', {
                required: '비밀번호는 필수 입력입니다.',
                validate: {
                  check: (val) => {
                    const { password } = getValues();
                    return password === val || '비밀번호가 일치하지 않습니다.';
                  },
                },
              })}
            />
            <ErrorMessage>{errors?.passwordCheck?.message}</ErrorMessage>
          </InputWrapper>
          <InputWrapper>
            <ValidationWrapper>
              <Input
                id='nickname'
                labelText='닉네임'
                placeholder='2~10자 이내로 입력해주세요'
                register={register('nickname', {
                  required: '닉네임은 필수 입력입니다.',
                  minLength: {
                    value: 2,
                    message: '✔︎ 2~10자 이내',
                  },
                  maxLength: {
                    value: 10,
                    message: '✔︎ 2~10자 이내',
                  },
                })}
              />
              <CommonButton
                size='sm'
                fontColor='black'
                txt='확인'
                bgColor='light'
                // disabled={disable}
                onClick={getNicknameValidate}
                type='button'
              />
            </ValidationWrapper>
            <ErrorMessage>{errors?.nickname?.message}</ErrorMessage>
          </InputWrapper>
          <InputWrapper>
            <Input
              id='intro'
              labelText='자기소개'
              placeholder='자기소개를 입력해주세요'
              register={register('intro', {
                required: '자기소개는 필수 입력입니다.',
              })}
            />
            <ErrorMessage>{errors?.intro?.message}</ErrorMessage>
          </InputWrapper>
        </InputFieldset>
        <CommonButton
          size='lg'
          fontColor='black'
          txt='시작하기'
          bgColor='light'
          // disabled={disable}
        />
      </JoinForm>
    </Container>
  );
}

export default Join;
