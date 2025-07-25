import React from 'react';
import { StyledAddButton } from './styles';

interface AddButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

export const AddButton: React.FC<AddButtonProps> = ({ onClick, children = '+ Add' }) => {
  return (
    <StyledAddButton onClick={onClick} data-draggable-element="true">
      {children}
    </StyledAddButton>
  );
};