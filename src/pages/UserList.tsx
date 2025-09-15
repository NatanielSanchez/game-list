import UserListGames from "../features/user-list/UserListGames";
import UserListOperations from "../features/user-list/UserListOperations";
import Flexbox from "../ui/Flexbox";
import Heading from "../ui/Heading";

function UserList() {
  return (
    <>
      <Flexbox>
        <Heading as="h1">Your game list</Heading>
        <UserListOperations />
      </Flexbox>
      <UserListGames />
    </>
  );
}

export default UserList;
