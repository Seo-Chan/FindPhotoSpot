import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import NavBar from '../../components/common/NavBar/NavBar';
import SpotDetail from '../../components/Modal/SpotDetail';

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: yellow;
`;

const Desc = styled.p`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 10px;
  z-index: 1;
`;

const Map = styled.div`
  display: relative;
  width: 100vw;
  height: 85vh;
  bottom: 0;
  z-index: 3;
`;

function Home() {
  const mapContainer = useRef(null);
  const { kakao } = window;
  const [isOpen, setIsOpen] = useState(false); // 모달 창 Open 여부 저장

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

      // 마커 클릭 시 이벤트
      kakao.maps.event.addListener(marker, 'click', () => makeClickListener());

      marker.setMap(map);
    }
  }, []);

  const makeClickListener = () => {
    setIsOpen(true);
    console.log('good');
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <h1 className='ir-hidden'>국내 인생샷 스팟</h1>
      <header>
        <NavBar />
      </header>
      <main>
        <Desc>원하는 스팟의 자세한 정보를 보시려면 사진을 클릭 해주세요!</Desc>
        <h2 className='ir-hidden'>국내 지도</h2>
        <Map id='map' ref={mapContainer}>
          {isOpen && <SpotDetail handleCloseClick={handleCloseClick} />}
        </Map>
      </main>
    </Container>
  );
}

export default Home;
