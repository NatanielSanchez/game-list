import { type ReactNode } from "react";
import { FaCheck, FaClipboardList, FaPlus, FaTrashCan, FaXmark } from "react-icons/fa6";
import Select, {
  type OptionProps,
  type PlaceholderProps,
  type SingleValue,
  type SingleValueProps,
  type StylesConfig,
} from "react-select";
import { components } from "react-select";
import styled, { css } from "styled-components";
import useUserGame from "./useUserGame";
import useUpdateUserGame from "./useUpdateUserGame";
import useCreateUserGame from "./useCreateUserGame";
import useDeleteUserGameByGameId from "./useDeleteUserGameByGameId";
import useIsMutatingUserGame from "./useIsMutatingUserGame";

const options: SingleSelectOption[] = [
  { label: "Plan to play", value: "Plan to play", icon: <FaClipboardList /> },
  { label: "Completed", value: "Completed", icon: <FaCheck /> },
  { label: "Dropped", value: "Dropped", icon: <FaTrashCan /> },
];

type UserListSelectProps = {
  gameId: number;
  menuPosition: "auto" | "bottom" | "top";
  fontSize: string;
};

// Performs CRUD operations on userGame table for the "state" column, except the delete which deletes everything
function UserListSelect({ gameId, menuPosition, fontSize }: UserListSelectProps) {
  const { userGame, isFetchingGameState } = useUserGame(gameId);
  const { createUserGame } = useCreateUserGame(gameId);
  const { updateUserGame } = useUpdateUserGame(gameId);
  const { deleteUserGameByGameId } = useDeleteUserGameByGameId(gameId);
  const isMutating = useIsMutatingUserGame(gameId);

  const value = userGame ? options.find((opt) => opt.value === userGame.state) : null;
  // add a fake select value to call a delete request but ONLY if there is a value returned by the database
  const selectOptions = value ? [...options, { label: "Remove", value: "_REMOVE_", icon: <FaXmark /> }] : options;

  const isLoading = isFetchingGameState || isMutating;

  function onSelect(value: SingleValue<SingleSelectOption>) {
    if (!value) return;

    // dont think there is a scenario where the remove option is there with no previous data, so this should be fine
    if (value.value === "_REMOVE_" && userGame) {
      deleteUserGameByGameId(gameId);
      return;
    }
    if (!userGame) createUserGame({ gameId, state: value.value });
    else updateUserGame({ ...userGame, state: value.value });
  }

  return (
    <Select<SingleSelectOption, false>
      options={selectOptions}
      value={value}
      onChange={onSelect}
      isLoading={isLoading}
      isDisabled={isLoading}
      isSearchable={false}
      isOptionDisabled={(option) => option.value === userGame?.state}
      captureMenuScroll={true}
      closeMenuOnSelect={true}
      menuPlacement={menuPosition}
      components={{
        DropdownIndicator: null,
        Placeholder: CustomPlaceholder,
        Option: CustomOption,
        SingleValue: CustomSingleValue,
      }}
      styles={getSelectStyle(fontSize)}
    />
  );
}

export default UserListSelect;

type SingleSelectOption = {
  label: string;
  value: string;
  icon: ReactNode;
};

function CustomPlaceholder(props: PlaceholderProps<SingleSelectOption, false>) {
  return (
    <components.Placeholder {...props}>
      {props.selectProps.isLoading ? (
        "Loading..."
      ) : (
        <StyledValue>
          <FaPlus />
          Add to list
        </StyledValue>
      )}
    </components.Placeholder>
  );
}
function CustomOption(props: OptionProps<SingleSelectOption, false>) {
  return (
    <components.Option {...props}>
      <StyledValue $state={props.data.label}>
        {props.data.icon}
        {props.data.label}
      </StyledValue>
    </components.Option>
  );
}

function CustomSingleValue(props: SingleValueProps<SingleSelectOption, false>) {
  return (
    <components.SingleValue {...props}>
      <StyledValue $state={props.data.label}>
        {props.data.icon}
        {props.data.label}
      </StyledValue>
    </components.SingleValue>
  );
}

const StyledValue = styled.div<{ $state?: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & svg {
    font-size: 2rem;
    ${({ $state }) => {
      switch ($state) {
        case "Plan to play":
          return css`
            color: var(--color-indigo-700);
          `;
        case "Completed":
          return css`
            color: green;
          `;
        case "Dropped":
          return css`
            color: orange;
          `;
        case "Remove":
          return css`
            color: red;
          `;
        default:
          return css`
            color: var(--color-brand-500);
          `;
      }
    }}
  }
`;

function getSelectStyle(size: string): StylesConfig<SingleSelectOption> {
  return {
    control: (baseStyles, state) => ({
      ...baseStyles,
      width: "fit-content",
      background: "var(--color-grey-0)",
      border: state.menuIsOpen ? "2px solid var(--color-brand-700)" : "2px solid transparent",
      borderRadius: "var(--border-radius-lg)",
      fontSize: size,
      boxShadow: "none", // REMOVES BLUE FOCUS RING
      "&:hover": {
        borderColor: "var(--color-brand-700)",
      },
    }),
    input: (baseStyles) => ({
      ...baseStyles,
      color: "var(--color-grey-700)",
    }),
    placeholder: (baseStyles, state) => ({
      ...baseStyles,
      color: state.isDisabled ? "var(--color-grey-500)" : "var(--color-grey-700)",
    }),
    singleValue: (baseStyles, state) => ({
      ...baseStyles,
      color: state.isDisabled ? "var(--color-grey-500)" : "var(--color-grey-700)",
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      background: state.isFocused ? "var(--color-grey-200)" : "var(--color-grey-0)",
      color: "var(--color-grey-700)",
      fontSize: size,
      whiteSpace: "nowrap",
      textDecoration: state.isDisabled ? "underline" : "none",
      "&:hover": {
        cursor: state.isDisabled ? "not-allowed" : "pointer",
      },
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      width: "fit-content",
      border: "none",
      borderRadius: "var(--border-radius-lg)",
      marginBottom: "5px",
    }),
    menuList: (baseStyles) => ({
      ...baseStyles,
      background: "var(--color-grey-0)",
      border: "2px solid  var(--color-brand-700)",
      borderRadius: "var(--border-radius-lg)",
    }),
    dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
      color: "var(--color-grey-400)",
      "&:hover": {
        color: "var(--color-brand-600)",
      },
    }),
    clearIndicator: (baseStyles) => ({
      ...baseStyles,
      color: "var(--color-grey-400)",
      "&:hover": {
        color: "var(--color-brand-600)",
      },
    }),
    loadingIndicator: (baseStyles) => ({
      ...baseStyles,
      color: "var(--color-brand-700)",
    }),
  };
}
