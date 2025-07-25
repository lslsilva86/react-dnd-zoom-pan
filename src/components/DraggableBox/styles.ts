import styled from "styled-components";

interface StyledDraggableBoxProps {
  $isDragging: boolean;
  $isOver: boolean;
  $isOverlay: boolean;
}

export const StyledDraggableBox = styled.div<StyledDraggableBoxProps>`
  background-color: #2196f3;
  color: white;
  border: 2px solid #1976d2;
  border-radius: 8px;
  padding: 15px 20px;
  font-weight: bold;
  cursor: grab;
  user-select: none;
  width: 200px;
  text-align: center;
  transition: all 0.2s ease;
  position: relative;
  pointer-events: auto;

  &:hover {
    background-color: #1976d2;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(33, 150, 243, 0.3);
  }

  &:active {
    cursor: grabbing;
    transform: rotate(5deg);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  ${(props) =>
    props.$isDragging &&
    `
    cursor: grabbing;
    transform: rotate(5deg);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    opacity: 0.5;
  `}

  ${(props) =>
    props.$isOver &&
    `
    border-color: #4CAF50;
    background-color: #66BB6A;
    transform: scale(1.05);

    &::before {
      content: '';
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      border: 3px dashed #4CAF50;
      border-radius: 12px;
      background-color: rgba(76, 175, 80, 0.1);
    }
  `}

  ${(props) =>
    props.$isOverlay &&
    `
    background-color: #1976D2;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    position: fixed;
    pointer-events: none;
    transform-origin: center center;
  `}
`;
