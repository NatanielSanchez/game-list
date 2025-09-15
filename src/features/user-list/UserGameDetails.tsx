import StarRating from "../../ui/StarRating";
import useUserGame from "./useUserGame";
import useUpdateUserGame from "./useUpdateUserGame";
import useIsMutatingUserGame from "./useIsMutatingUserGame";
import SpinnerMini from "../../ui/SpinnerMini";
import styled from "styled-components";
import UserReview from "./UserReview";

function UserGameDetails({ gameId }: { gameId: number }) {
  const { userGame, isFetchingGameState } = useUserGame(gameId);
  const { updateUserGame } = useUpdateUserGame(gameId);
  const isMutating = useIsMutatingUserGame(gameId);

  const isLoading = isFetchingGameState || isMutating;
  if (isFetchingGameState) return <Spinner />;

  return (
    userGame && (
      <>
        <StarRating
          size={30}
          maxRating={10}
          noRatingMessage="Leave a score!"
          defaultRating={userGame.score || 0}
          color={isLoading ? "var(--color-grey-500)" : "var(--color-yellow-500)"}
          disabled={isLoading}
          onSetRating={(rating) => updateUserGame({ ...userGame, score: rating })}
        />
        <UserReview
          defaultValue={userGame.review || ""}
          isLoading={isLoading}
          onSave={(review) => updateUserGame({ ...userGame, review })}
        />
      </>
    )
  );
}

export default UserGameDetails;

const Spinner = styled(SpinnerMini)`
  width: 5rem;
  height: 5rem;
  color: var(--color-brand-700);
`;
