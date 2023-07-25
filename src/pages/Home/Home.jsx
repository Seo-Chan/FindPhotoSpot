import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import NavBar from '../../components/common/NavBar/NavBar';
import SpotDetail from '../../components/Modal/SpotDetail';
import MarkerIcon from '../../assets/images/logoIcon.png';

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
  const [spotID, setSpotID] = useState('');

  const makeClickListener = (spotId) => {
    setIsOpen(true);
    setSpotID(spotId);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  const options = {
    center: new kakao.maps.LatLng(36.3515305, 127.3824293),
    level: 12,
  };

  useEffect(() => {
    const map = new kakao.maps.Map(mapContainer.current, options);

    fetch('http://49.50.172.178:8080/findPhotoSpot-0.0.1-SNAPSHOT/spot/searchAll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        const spotData = JSON.parse(data.spot);

        for (let i = 0; i < spotData.length; i++) {
          // 주소-좌표 변환 객체 생성
          const geocoder = new kakao.maps.services.Geocoder();
          const markerSrc = `${MarkerIcon}`, // 마커이미지
            markerSize = new kakao.maps.Size(38, 30); // 마커이미지 크기

          // 주소로 좌표 검색
          geocoder.addressSearch(spotData[i].address, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

              // 마커 이미지를 생성
              const markerImage = new kakao.maps.MarkerImage(markerSrc, markerSize);
              const marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: coords, // 마커를 표시할 위치
                title: spotData[i].spotName, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
                image: markerImage,
              });

              // 마커 클릭 시 이벤트
              kakao.maps.event.addListener(marker, 'click', () =>
                makeClickListener(spotData[i].spotId),
              );
              marker.setMap(map);
            }
          });
        }
      });
  }, []);

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
          {isOpen && <SpotDetail handleCloseClick={handleCloseClick} spotID={spotID} />}
        </Map>
      </main>
    </Container>
  );
}

export default Home;
