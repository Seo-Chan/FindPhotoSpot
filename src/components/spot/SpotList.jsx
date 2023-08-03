import React from 'react';
import styled from 'styled-components';

const MySpotList = styled.ul`
  width: 40vw;
  height: 200px;
  padding: 15px 20px;
  background-color: var(--lightPink);
  border-radius: 15px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SpotListContainer = styled.div``;

const SpotContainer = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  padding-bottom: 4px;
  border-bottom: 1px solid #ffffff;
  img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const SpotInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SpotName = styled.p`
  font-size: 1.5rem;
`;

const SpotAddress = styled.p`
  font-size: 1.1rem;
`;

const SpotPost = styled.h3`
  width: 35vw;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 8px;
`;

function SpotList({ title, spotList }) {
  return (
    <SpotListContainer>
      <SpotPost>{title}</SpotPost>
      <MySpotList>
        {!!spotList.length &&
          spotList.map((spot, index) => (
            <SpotContainer key={index}>
              <img
                src={`http://49.50.172.178:8080/findPhotoSpot-0.0.1-SNAPSHOT/image/${
                  spot.imageList.split(',')[0]
                }`}
              />
              <SpotInfo>
                <SpotName>{spot.spotName}</SpotName>
                <SpotAddress>{spot.address}</SpotAddress>
              </SpotInfo>
            </SpotContainer>
          ))}
      </MySpotList>
    </SpotListContainer>
  );
}

export default SpotList;
