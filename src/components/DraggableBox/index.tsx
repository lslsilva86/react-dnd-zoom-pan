import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id });

  // Disable transform animations when zoomed to prevent items moving too far
  const shouldDisableTransform = scale !== 1;
  
  const style = {
    transform: shouldDisableTransform ? undefined : CSS.Transform.toString(transform),
    transition: shouldDisableTransform ? undefined : transition,
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