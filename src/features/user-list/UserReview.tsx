import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import Button from "../../ui/Button";
import { useState } from "react";

type UserReviewProps = {
  defaultValue: string;
  isLoading: boolean;
  onSave: (review: string) => void;
};
function UserReview({ defaultValue, isLoading, onSave }: UserReviewProps) {
  const [review, setReview] = useState(defaultValue);
  return (
    <>
      <TextArea
        disabled={isLoading}
        placeholder="Leave a review!"
        minRows={4}
        maxRows={8}
        defaultValue={defaultValue}
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <TextAreaButtons>
        <Button
          $size="small"
          $variation="primary"
          disabled={isLoading || review === defaultValue}
          onClick={() => onSave(review)}
        >
          Save review
        </Button>
        <Button
          $size="small"
          $variation="secondary"
          disabled={isLoading || review === ""}
          onClick={() => {
            setReview("");
          }}
        >
          Clear review
        </Button>
        <Button
          $size="small"
          $variation="danger"
          disabled={isLoading || defaultValue === ""}
          onClick={() => {
            setReview("");
            onSave("");
          }}
        >
          Delete review
        </Button>
      </TextAreaButtons>
    </>
  );
}

export default UserReview;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  resize: vertical;

  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;

  font-size: 1.5rem;
  font-family: "Roboto", sans-serif;
  color: var(--color-grey-700);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);

  &:disabled {
    color: var(--color-grey-500);
  }
`;

const TextAreaButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
