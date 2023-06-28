import React, { useEffect, useRef } from 'react';
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

function Home() {
  const mapContainer = useRef(null);
  const { kakao } = window;
  const options = {
    center: new kakao.maps.LatLng(36.3515305, 127.3824293),
    level: 12,
  };
  const positions = [
    {
      title: '카카오',
      latlng: new kakao.maps.LatLng(36.450705, 126.570677),
    },
    {
      title: '대전',
      latlng: new kakao.maps.LatLng(36.3515305, 127.3824293),
    },
    {
      title: '텃밭',
      latlng: new kakao.maps.LatLng(36.3515307, 126.56994),
    },
    {
      title: '근린공원',
      latlng: new kakao.maps.LatLng(37.3815307, 126.570738),
    },
  ];
  const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
  useEffect(() => {
    const map = new kakao.maps.Map(mapContainer.current, options);

    for (let i = 0; i < positions.length; i++) {
      // 마커 이미지의 이미지 크기
      const imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
        image: markerImage,
      });
      marker.setMap(map);
    }
  }, []);

  return (
    <Container>
      <header>
        <NavBar />
      </header>
      <main>
        <Map id='map' ref={mapContainer}></Map>
      </main>
    </Container>
  );
}

export default Home;
