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

:root{
  --vividPink:#FF9494;
  --pink:#FFD1D1;
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
