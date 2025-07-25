import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { StyledDraggableBox } from './styles';

interface DraggableBoxProps {
  id: string;
  content: string;
  isOverlay?: boolean;
  scale?: number;
}

export const DraggableBox: React.FC<DraggableBoxProps> = ({ 
  id, 
  content, 
  isOverlay = false,
  scale = 1
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    isOver,
  } = useSortable({ id });

  // Always disable transform to prevent boxes from moving, only show highlighting
  const style = {
    transform: 'none',
    transition: 'none',
  };

  return (
    <StyledDraggableBox
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      $isDragging={isDragging}
      $isOver={isOver}
      $isOverlay={isOverlay}
      data-draggable-element="true"
    >
      {content}
    </StyledDraggableBox>
  );
};