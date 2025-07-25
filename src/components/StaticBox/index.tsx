import React from 'react';
import { StyledStaticBox } from './styles';

interface StaticBoxProps {
  children: React.ReactNode;
}

export const StaticBox: React.FC<StaticBoxProps> = ({ children }) => {
  return (
    <StyledStaticBox data-draggable-element="true">
      {children}
    </StyledStaticBox>
  );
};