import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import styled, { css } from "styled-components";
import { useState } from "react";
import { FaYoutube } from "react-icons/fa6";

function getVideoEmbedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}`;
}

function getVideoUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function VideoGallery({ videoIds, startIndex }: { videoIds: string[]; startIndex?: number }) {
  const [index, setIndex] = useState(startIndex && startIndex >= 0 && startIndex < videoIds.length ? startIndex : 0);
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);

  function dec() {
    setIndex((index) => (index > 0 ? index - 1 : index));
    setIsLoadingVideo(true);
  }

  function inc() {
    setIndex((index) => (index < videoIds.length - 1 ? index + 1 : index));
    setIsLoadingVideo(true);
  }
  return (
    <>
      <StyledGallery>
        <ArrowButton onClick={dec} disabled={index === 0}>
          <MdOutlineArrowBackIos />
        </ArrowButton>
        <Video
          $isLoading={isLoadingVideo}
          src={getVideoEmbedUrl(videoIds[index])}
          allowFullScreen
          onLoad={() => setIsLoadingVideo(false)}
        />
        <ArrowButton onClick={inc} disabled={index === videoIds.length - 1}>
          <MdOutlineArrowForwardIos />
        </ArrowButton>
      </StyledGallery>
      <Text>
        <a href={getVideoUrl(videoIds[index])}>
          <FaYoutube />
          Watch on Youtube
        </a>
        {index + 1} / {videoIds.length}
      </Text>
    </>
  );
}

export default VideoGallery;

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

const Video = styled.iframe<{ $isLoading: boolean }>`
  width: 60dvw;
  height: 70dvh;
  border: none;
  ${({ $isLoading }) =>
    $isLoading &&
    css`
      filter: grayscale(100%);
    `}
`;

const Text = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;

  color: var(--color-grey-500);

  & a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    &:hover {
      color: var(--color-brand-700);
    }
  }
`;
