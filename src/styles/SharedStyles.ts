import styled from "styled-components";

export const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  background-color: #f5f5f5;
  overflow: hidden;
`;

export const Toolbar = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  z-index: 1000;
  flex-shrink: 0;
`;

export const ToolbarButton = styled.button`
  padding: 8px 16px;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #005a9e;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ToolbarSpan = styled.span`
  font-weight: bold;
  color: #333;
  margin-left: 10px;
`;
