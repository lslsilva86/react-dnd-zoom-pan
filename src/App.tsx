import React, { useState, useCallback } from 'react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useZoomPan } from './hooks/useZoomPan';
import { Canvas } from './components/Canvas';
import { createZoomAwareCollisionDetection } from './utils/collisionDetection';
import { AppContainer, Toolbar, ToolbarButton, ToolbarSpan } from './styles/SharedStyles';

interface DraggableItem {
  id: string;
  content: string;
}

function App() {
  const [items, setItems] = useState<DraggableItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { transform, isDragging, handleMouseDown, handleWheel, resetView } = useZoomPan();
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addItem = useCallback(() => {
    const newItem: DraggableItem = {
      id: `item-${Date.now()}`,
      content: `Box ${items.length + 1}`,
    };
    setItems(prev => [...prev, newItem]);
  }, [items.length]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Add visual feedback for drop zones
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over?.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    
    setActiveId(null);
  };

  const activeItem = items.find(item => item.id === activeId);

  // Create zoom-aware collision detection
  const zoomAwareCollisionDetection = useCallback(
    () => createZoomAwareCollisionDetection(transform.scale),
    [transform.scale]
  );

  return (
    <AppContainer>
      <Toolbar>
        <ToolbarButton onClick={resetView}>Reset View</ToolbarButton>
        <ToolbarSpan>Scale: {Math.round(transform.scale * 100)}%</ToolbarSpan>
        <ToolbarSpan>Pan: ({Math.round(transform.x)}, {Math.round(transform.y)})</ToolbarSpan>
      </Toolbar>
      
      <DndContext
        sensors={sensors}
        collisionDetection={zoomAwareCollisionDetection()}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Canvas
          items={items}
          activeItem={activeItem}
          transform={transform}
          isDragging={isDragging}
          onMouseDown={handleMouseDown}
          onWheel={handleWheel}
          onAddItem={addItem}
        />
      </DndContext>
    </AppContainer>
  );
}

export default App;