import {
  closestCenter,
  CollisionDetection,
  ClientRect,
  Active,
  DroppableContainer,
} from "@dnd-kit/core";

// Custom collision detection that accounts for zoom and provides snappy behavior
export const createZoomAwareCollisionDetection = (
  scale: number
): CollisionDetection => {
  return ({ active, droppableContainers, ...args }) => {
    // Helper function to transform a ClientRect by the zoom scale
    const transformRect = (rect: ClientRect | null): ClientRect | null => {
      if (!rect) return rect;
      return {
        ...rect,
        left: rect.left / scale,
        right: rect.right / scale,
        top: rect.top / scale,
        bottom: rect.bottom / scale,
        width: rect.width / scale,
        height: rect.height / scale,
      };
    };

    // Transform the active item's position based on zoom
    const transformedActive: Active = {
      ...active,
      rect: {
        ...active.rect,
        current: active.rect.current
          ? {
              initial: transformRect(active.rect.current.initial),
              translated: transformRect(active.rect.current.translated),
            }
          : active.rect.current,
      },
    };

    // Transform droppable container positions
    const transformedDroppables: DroppableContainer[] = [];

    droppableContainers.forEach((container) => {
      transformedDroppables.push({
        ...container,
        rect: {
          ...container.rect,
          current: transformRect(container.rect.current),
        },
      });
    });

    // Use closestCenter but with a threshold for snappier behavior
    const collisions = closestCenter({
      ...args,
      active: transformedActive,
      droppableContainers: transformedDroppables,
    });

    return collisions;
  };
};
