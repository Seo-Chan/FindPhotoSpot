import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import LoginEmail from './pages/LoginEmail/LoginEmail';
import Join from './pages/Join/Join';
import Home from './pages/Home/Home';
import SpotUpdate from './pages/SpotUpdate/SpotUpdate';
import MyPage from './pages/MyPage/MyPage/MyPage';
import Modal from './components/Modal/SpotDetail';
import EditProfile from './pages/MyPage/EditProfile/EditProfile';

const GlobalStyled = createGlobalStyle`
${reset} // 초기화css

*{
  box-sizing: border-box;
}
button {
  margin:0;
  padding:0;
}
a{
  color:inherit;
  text-decoration: none;
}
a:visited{
  color:inherit;
}

@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: 'omyu_pretty';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

.ir-hidden {
   position: absolute;
   clip: rect(0 0 0 0);
   width: 1px;
   height: 1px;
   margin: -1px;
   overflow: hidden;
}

html{
  font-size: 62.5%;
}

body{
  background-color: #ffffff;
  color: #2b2b2b;
  font-family: 'Pretendard-Regular';
}

:root{
  --vividPink:#FF9494;
  --pink:#FFCDC9;
  --lightPink:#FFE3E1;
  --ivory:#FFF5E4;
}
`;

function App() {
  return (
    <>
      <GlobalStyled />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/login/loginEmail' element={<LoginEmail />} />
          <Route path='/join' element={<Join />} />
          <Route path='/spot/spotupdate' element={<SpotUpdate />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/mypage/editprofile' element={<EditProfile />} />
          <Route path='/modal' element={<Modal />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
