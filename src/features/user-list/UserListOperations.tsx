import Filter from "../../ui/Filter";
import InputFilter from "../../ui/InputFilter";
import Operations from "../../ui/Operations";

const UserGameStateFilters = [
  { label: "All", value: "All" },
  { label: "Plan to play", value: "Plan to play" },
  { label: "Completed", value: "Completed" },
  { label: "Dropped", value: "Dropped" },
];

function UserListOperations() {
  return (
    <Operations>
      <InputFilter fieldName="name" />
      <Filter filterField="state" options={UserGameStateFilters} />
    </Operations>
  );
}

export default UserListOperations;
