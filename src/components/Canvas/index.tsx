import React, { useRef } from 'react';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { DragOverlay } from '@dnd-kit/core';
import { DraggableBox } from '../DraggableBox';
import { StaticBox } from '../StaticBox';
import { AddButton } from '../AddButton';
import { 
  CanvasContainer, 
  StyledCanvas, 
  HorizontalContainer, 
  DraggableContainer,
  DragOverlayBox
} from './styles';

interface DraggableItem {
  id: string;
  content: string;
}

interface CanvasProps {
  items: DraggableItem[];
  activeItem: DraggableItem | undefined;
  transform: {
    x: number;
    y: number;
    scale: number;
  };
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onWheel: (e: React.WheelEvent) => void;
  onAddItem: () => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  items,
  activeItem,
  transform,
  isDragging,
  onMouseDown,
  onWheel,
  onAddItem,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <CanvasContainer 
      ref={canvasRef}
      onMouseDown={onMouseDown}
      onWheel={onWheel}
    >
      <StyledCanvas 
        transform={transform}
        isDragging={isDragging}
      >
        <HorizontalContainer>
          <StaticBox>
            Static Box
          </StaticBox>
          
          <SortableContext items={items.map(item => item.id)} strategy={horizontalListSortingStrategy}>
            <DraggableContainer>
              {items.map((item) => (
                <DraggableBox
                  key={item.id}
                  id={item.id}
                  content={item.content}
                />
              ))}
            </DraggableContainer>
          </SortableContext>
          
          <AddButton onClick={onAddItem} />
        </HorizontalContainer>
      </StyledCanvas>
      
      <DragOverlay>
        {activeItem ? (
          <DragOverlayBox $scale={transform.scale}>
            {activeItem.content}
          </DragOverlayBox>
        ) : null}
      </DragOverlay>
    </CanvasContainer>
  );
};