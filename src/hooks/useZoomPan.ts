import { useState, useCallback, useRef, useEffect } from "react";

interface Transform {
  x: number;
  y: number;
  scale: number;
}

export const useZoomPan = () => {
  const [transform, setTransform] = useState<Transform>({
    x: 0,
    y: 0,
    scale: 1,
  });
  const [isDragging, setIsDragging] = useState(false);
  const lastPointRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only start panning if clicking on the canvas background, not on interactive elements
    if ((e.target as HTMLElement).closest('[data-draggable-element="true"]')) {
      return;
    }

    setIsDragging(true);
    lastPointRef.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - lastPointRef.current.x;
      const deltaY = e.clientY - lastPointRef.current.y;

      setTransform((prev) => ({
        ...prev,
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));

      lastPointRef.current = { x: e.clientX, y: e.clientY };
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();

      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.max(0.5, Math.min(3, transform.scale * delta));

      setTransform((prev) => ({
        ...prev,
        scale: newScale,
      }));
    },
    [transform.scale]
  );

  const resetView = useCallback(() => {
    setTransform({ x: 0, y: 0, scale: 1 });
  }, []);

  // Event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "grabbing";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    transform,
    isDragging,
    handleMouseDown,
    handleWheel,
    resetView,
  };
};
