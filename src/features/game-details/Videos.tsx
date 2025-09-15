import styled from "styled-components";
import type { Video } from "../../services/types";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import { useState } from "react";
import Thumbnail from "./Thumbnail";
import VideoGallery from "../../ui/VideoGallery";

function getVideoThumbnail(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function Videos({ videos }: { videos: Video[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const videoThumbnails = videos.map((v) => getVideoThumbnail(v.videoId));
  const videoIds = videos.map((v) => v.videoId);

  return (
    <>
      <Heading as="h3">Videos</Heading>
      <StyledVideos>
        <Modal>
          {videoThumbnails.map((v, i) => (
            <Modal.Open
              key={v}
              opens="videos"
              renderItem={(open) => (
                <Thumbnail
                  onClick={() => {
                    setSelectedIndex(i);
                    open();
                  }}
                  thumbnailUrl={v}
                />
              )}
            />
          ))}
          <Modal.Window
            name="videos"
            renderItem={() => <VideoGallery videoIds={videoIds} startIndex={selectedIndex} />}
          />
        </Modal>
      </StyledVideos>
    </>
  );
}

export default Videos;

const StyledVideos = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
