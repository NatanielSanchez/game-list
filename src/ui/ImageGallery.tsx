import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import styled, { css } from "styled-components";
import { useState } from "react";

function ImageGallery({ images, startIndex }: { images: string[]; startIndex?: number }) {
  const [index, setIndex] = useState(startIndex && startIndex >= 0 && startIndex < images.length ? startIndex : 0);
  const [isLoadingImg, setIsLoadingImg] = useState(true);

  function dec() {
    setIndex((index) => (index > 0 ? index - 1 : index));
    setIsLoadingImg(true);
  }

  function inc() {
    setIndex((index) => (index < images.length - 1 ? index + 1 : index));
    setIsLoadingImg(true);
  }

  return (
    <>
      <StyledGallery>
        <ArrowButton onClick={dec} disabled={index === 0}>
          <MdOutlineArrowBackIos />
        </ArrowButton>
        <Image $isLoading={isLoadingImg} src={images[index]} onLoad={() => setIsLoadingImg(false)} />
        <ArrowButton onClick={inc} disabled={index === images.length - 1}>
          <MdOutlineArrowForwardIos />
        </ArrowButton>
      </StyledGallery>
      <Text>
        {index + 1} / {images.length}
      </Text>
    </>
  );
}

export default ImageGallery;

const StyledGallery = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 70dvw;
`;

const ArrowButton = styled.button`
  font-size: 3rem;
  color: var(--color-grey-700);
  border: none;
  background-color: transparent;

  &:not(:disabled) svg:hover {
    color: var(--color-brand-700);
  }
`;

const Image = styled.img<{ $isLoading: boolean }>`
  width: 60dvw;
  ${({ $isLoading }) =>
    $isLoading &&
    css`
      filter: grayscale(100%);
    `}
`;

const Text = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;

  color: var(--color-grey-500);
`;
