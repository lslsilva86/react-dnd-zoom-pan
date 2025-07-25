import styled from "styled-components";

export const CanvasContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  user-select: none;
`;

interface CanvasProps {
  transform: {
    x: number;
    y: number;
    scale: number;
  };
  isDragging: boolean;
}

export const StyledCanvas = styled.div<CanvasProps>`
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 100px;
  min-width: 100%;
  transform-origin: center center;
  transition: transform 0.1s ease-out;
  transform: translate(
      ${(props) => props.transform.x}px,
      ${(props) => props.transform.y}px
    )
    scale(${(props) => props.transform.scale});
  cursor: ${(props) => (props.isDragging ? "grabbing" : "grab")};
`;

export const HorizontalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 80px;
  width: max-content;
  min-width: fit-content;
  pointer-events: auto;
`;

export const DraggableContainer = styled.div`
  display: flex;
  gap: 10px;
  min-height: 60px;
  align-items: center;
  position: relative;
  pointer-events: auto;

  &::before {
    content: "";
    position: absolute;
    left: -7px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 40px;
    background-color: transparent;
    border-radius: 2px;
    transition: background-color 0.2s ease;
  }

  &.drop-indicator-left::before {
    background-color: #4caf50;
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.6);
  }

  &::after {
    content: "";
    position: absolute;
    right: -7px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 40px;
    background-color: transparent;
    border-radius: 2px;
    transition: background-color 0.2s ease;
  }

  &.drop-indicator-right::after {
    background-color: #4caf50;
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.6);
  }
`;

export const DragOverlayBox = styled.div<{ $scale: number }>`
  background-color: #1976d2;
  color: white;
  border: 2px solid #1976d2;
  border-radius: 8px;
  padding: 15px 20px;
  font-weight: bold;
  width: 200px;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  transform: scale(${(props) => props.$scale}) rotate(5deg);
  transform-origin: center center;
`;
