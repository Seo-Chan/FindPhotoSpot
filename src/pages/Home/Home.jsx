import React, { useEffect } from 'react';
import styled from 'styled-components';
import NavBar from '../../components/common/NavBar/NavBar';

const Container = styled.div`
  background-color: var(--ivory);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Map = styled.div`
  width: 100vw;
  height: 100vh;
`;

const { kakao } = window;

function Home() {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(36.3515305, 127.3824293),
      level: 12,
    };
    const map = new kakao.maps.Map(container, options); //eslint-disable-line no-unused-vars
  }, []);

  return (
    <Container>
      <header>
        <NavBar />
      </header>
      <main>
        <Map id='map'></Map>
      </main>
    </Container>
  );
}

export default Home;
