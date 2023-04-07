import React from 'react';

export default function Join() {
  return (
    <main>
      <h1>회원가입</h1>
      <form>
        <label htmlFor='ID'>
          아이디: <input type='text' id='ID' />
        </label>
        <label htmlFor='password'>
          비밀번호: <input type='password' id='password' />
        </label>
      </form>
      <button type='submit'>다음</button>
    </main>
  );
}
