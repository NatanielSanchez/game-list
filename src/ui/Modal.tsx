/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type PropsWithChildren, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useKey } from "../hooks/useKey";
import { useOutsideClick } from "../hooks/useOutsideClick";

type ModalContextValue = {
  openName: string;
  open: React.Dispatch<React.SetStateAction<string>>;
  close: () => void;
};

type OpenProps = {
  opens: string;
  renderItem: (open: () => void) => ReactNode;
};

type WindowProps = {
  name: string;
  renderItem: (onCloseModal: () => void) => ReactNode;
};

/*
-A Modal component that supports multiple modal windows based on their given name.
-Only one modal window will be displayed at the time based on the current openName state.
*/
const ModalContext = createContext<ModalContextValue | null>(null);
function Modal({ children }: PropsWithChildren) {
  const [openName, setOpenName] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");

  return <ModalContext.Provider value={{ openName, open, close }}>{children}</ModalContext.Provider>;
}

function Open({ opens: opensWindowName, renderItem }: OpenProps) {
  const { open } = useModal();

  // make a copy of the children to add a prop to it: https://react.dev/reference/react/cloneElement
  //return cloneElement(children, { onClick: () => open(opensWindowName) });
  // CHECK THE "Alternatives" SECTION: there might be a better way to do this? like a render prop from Advanced Patterns
  return renderItem(() => open(opensWindowName));
}

function Window({ name, renderItem }: WindowProps) {
  const { openName, close } = useModal();
  const ref = useOutsideClick<HTMLDivElement>(close);
  useKey("escape", close);

  if (name === openName)
    return createPortal(
      <Overlay>
        <StyledModal ref={ref}>
          <Button onClick={close}>
            <HiXMark />
          </Button>
          {renderItem(close)}
        </StyledModal>
      </Overlay>,
      document.body
    );
  else return null;
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === null) throw new Error("ModalContext was accessed outside its provider!");
  else return context;
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 4rem 2rem 2rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
        stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
