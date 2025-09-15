/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

type Position = { x: number; y: number };
type TooltipState = {
  elementId: string; // dom id of hoverable element
  content: ReactNode; // content to show on tooltip
  position: Position; // position of the tooltip box
};
type HoverableContextType = {
  showTooltip: (tooltipContent: ReactNode, elementId: string) => void;
  hideTooltip: () => void;
};

const HoverableContext = createContext<HoverableContextType | undefined>(undefined);

export function HoverableProvider({ children }: PropsWithChildren) {
  const { isDarkMode } = useDarkMode();
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const currentHoverIdRef = useRef<string | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  // TS is weird, what you mean setTimeout it doesnt return a number anymore?
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const isVisible = tooltip && isHovering;

  const showTooltip = useCallback((tooltipContent: ReactNode, elementId: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    currentHoverIdRef.current = elementId;

    timerRef.current = setTimeout(() => {
      // skip if mouse has already moved to a different element
      //if (currentHoverIdRef.current !== elementId) return;

      const el = document.getElementById(elementId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const position = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      setTooltip({ elementId, content: tooltipContent, position });
      setIsHovering(true);
    }, 500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const hideTooltip = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    currentHoverIdRef.current = null;
    setIsHovering(false);
  }, []);

  useLayoutEffect(() => {
    if (!tooltip || !tooltip.elementId) return;

    function updatePosition() {
      const el = document.getElementById(tooltip!.elementId);
      if (!el || !tooltipRef.current) return;

      const elementRect = el.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let x = elementRect.left + elementRect.width / 2;
      let y = elementRect.top + elementRect.height / 2;

      if (x + tooltipRect.width > window.innerWidth) {
        x -= tooltipRect.width;
      }
      if (y + tooltipRect.height > window.innerHeight) {
        y -= tooltipRect.height;
      }

      const position = { x, y };

      setTooltip((prev) => {
        if (!prev) return null;

        const samePos = prev.position.x === position.x && prev.position.y === position.y;
        if (samePos) return prev;

        return { ...prev, position };
      });
    }

    updatePosition(); // run once immediately

    // for dynamic content, like fetched content
    const resizeObserver = new ResizeObserver(() => {
      updatePosition();
    });

    if (tooltipRef.current) resizeObserver.observe(tooltipRef.current);

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [tooltip]);

  return (
    <HoverableContext.Provider value={{ showTooltip, hideTooltip }}>
      {children}
      {isVisible &&
        createPortal(
          <TooltipContentBox
            ref={tooltipRef}
            $position={tooltip.position}
            $isDarkMode={isDarkMode}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {tooltip.content}
          </TooltipContentBox>,
          document.getElementById("hoverTooltip")!
        )}
    </HoverableContext.Provider>
  );
}

export function useHoverable() {
  const context = useContext(HoverableContext);
  if (!context) throw new Error("HoverableContext was used outside of its Provider!");
  return context;
}

const TooltipContentBox = styled.div<{ $position: Position; $isDarkMode: boolean }>`
  position: absolute;
  z-index: 999;
  left: ${({ $position }) => `${$position.x}px`};
  top: ${({ $position }) => `${$position.y}px`};

  border-radius: var(--border-radius-md);
  padding: 1.5rem;

  backdrop-filter: blur(10px);
  ${({ $isDarkMode }) =>
    $isDarkMode
      ? css`
          background: rgb(55, 65, 81, 0.8);
        `
      : css`
          background: rgb(243, 244, 246, 0.9);
        `}
`;
