import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

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
`;

function App() {
  return (
    <>
      <GlobalStyled />
    </>
  );
}

export default App;
