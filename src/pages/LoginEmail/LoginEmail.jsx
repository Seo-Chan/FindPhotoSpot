import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginEmail() {
  return (
    <main>
      <h1>로그인</h1>
      <form>
        <label htmlFor='ID'>
          아이디: <input type='text' id='ID' />
        </label>
        <label htmlFor='password'>
          비밀번호: <input type='password' id='password' />
        </label>
      </form>
      <button type='submit'>확인</button>
      <Link to='/join'>이메일로 회원가입</Link>
    </main>
  );
}
