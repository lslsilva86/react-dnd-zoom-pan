import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { StyledDraggableBox } from './styles';

interface DraggableBoxProps {
  id: string;
  content: string;
  isOverlay?: boolean;
}

export const DraggableBox: React.FC<DraggableBoxProps> = ({ 
  id, 
  content, 
  isOverlay = false 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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