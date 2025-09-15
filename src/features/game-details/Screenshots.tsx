import styled from "styled-components";
import type { Screenshot } from "../../services/types";
import Modal from "../../ui/Modal";
import Heading from "../../ui/Heading";
import { useState } from "react";
import ImageGallery from "../../ui/ImageGallery";

const smallScreenshotUrl = import.meta.env.VITE_SCREENSHOT_MED_URL;
const bigScreenshotUrl = import.meta.env.VITE_SCREENSHOT_HUGE_URL;

function Screenshots({ screenshots }: { screenshots: Screenshot[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const imageUrls = screenshots.map((s) => `${bigScreenshotUrl + s.image_id}.jpg`);

  return (
    <>
      <Heading as="h3">Screenshots (click to enlarge)</Heading>
      <StyledScreenshots>
        <Modal>
          {screenshots.map((s, i) => (
            <Modal.Open
              key={s.id}
              opens="screenshots"
              renderItem={(open) => (
                <img
                  onClick={() => {
                    setSelectedIndex(i);
                    open();
                  }}
                  src={`${smallScreenshotUrl + s.image_id}.jpg`}
                />
              )}
            />
          ))}
          <Modal.Window
            name="screenshots"
            renderItem={() => <ImageGallery images={imageUrls} startIndex={selectedIndex} />}
          />
        </Modal>
      </StyledScreenshots>
    </>
  );
}

export default Screenshots;

const StyledScreenshots = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  & img {
    border: 2px solid transparent;
    width: 10dvw;
    &:hover {
      cursor: pointer;
      border-color: var(--color-brand-700);
    }
  }
`;
