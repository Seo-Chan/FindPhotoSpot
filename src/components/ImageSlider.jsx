import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IconArrowRight from '../assets/icon/icon-rightArrow.png';
import IconArrowLeft from '../assets/icon/icon-leftArrow.png';

const ImageContainer = styled.ul`
  display: flex;
  justify-content: flex-start;
  position: relative;
  width: 220px;
  overflow: hidden;
`;

const PostList = styled.li`
  width: 220px;
  display: flex;
`;

const PostImg = styled.img`
  width: 100%;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 5px;
  transform: translateX(${(props) => props.imageCount * 220 * -1 + 'px'});
`;
const Button = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background-color: var(--pink);
  opacity: 70%;
  cursor: pointer;
  img {
    width: 70%;
    vertical-align: top;
  }
  img:hover {
    transition: 0.5s;
    transform: scale(1.2);
  }
`;
const LeftBtn = styled(Button)`
  left: 1px;
`;
const RightBtn = styled(Button)`
  right: 1px;
`;

const IconWrapper = styled.div`
  background-color: transparent;
  border-radius: 30px;
  text-align: center;
`;

const PageIcon = styled.div`
  display: inline-block;
  margin: 3px;
  width: 8px;
  height: 8px;
  background-color: var(--vividPink);
  box-shadow: 1px 1px 2px var(--black);
  border-radius: 4px;
  cursor: pointer;
  transition: ease-in 0.2s;
  &.icon {
    opacity: 0.3;
  }
  &.icon.active {
    opacity: 0.8;
  }
`;

function ImageSlider({ image }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const imageSplit = image + '';
    setImageList(imageSplit.split(','));
  }, [image]);
  console.log(imageList);

  const handleLeftBtn = () => {
    if (imageCount - 1 < 0) {
      setImageCount(imageList.length - 1);
      setSlideIndex(imageList.length - 1);
    } else {
      setImageCount((prev) => prev - 1);
      setSlideIndex((prev) => prev - 1);
    }
  };

  const handleRightBtn = () => {
    if (imageCount + 1 > imageList.length - 1) {
      setImageCount(0);
      setSlideIndex(0);
    } else {
      setImageCount((prev) => prev + 1);
      setSlideIndex((prev) => prev + 1);
    }
  };

  const movePage = (index) => {
    setSlideIndex(index);
    setImageCount(index);
  };

  return (
    <>
      <ImageContainer>
        <PostList>
          {!!imageList.length &&
            imageList.map((img, index) => (
              <PostImg
                imageCount={imageCount}
                src={`http://49.50.172.178:8080/findPhotoSpot-0.0.1-SNAPSHOT/image/${img}`}
                key={index}
                alt='게시물 이미지'
              />
            ))}
          {imageList.length > 1 && (
            <>
              <LeftBtn onClick={handleLeftBtn}>
                <img src={IconArrowLeft} alt='왼쪽 화살표 버튼' />
              </LeftBtn>
              <RightBtn onClick={handleRightBtn}>
                <img src={IconArrowRight} alt='오른쪽 화살표 버튼' />
              </RightBtn>
            </>
          )}
        </PostList>
      </ImageContainer>
      {imageList.length > 1 && (
        <IconWrapper>
          {Array.from({ length: imageList.length }).map((item, index) => (
            <PageIcon
              key={index}
              onClick={() => movePage(index)}
              className={slideIndex === index ? 'icon active' : 'icon'}
            />
          ))}
        </IconWrapper>
      )}
    </>
  );
}

export default ImageSlider;
