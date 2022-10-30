import { css } from 'styled-components';

export const itemStyles = css<{ open?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  border-top-right-radius: ${({ open }) => (open ? '0.5rem' : 0)};
  border-top-left-radius: ${({ open }) => (open ? '0.5rem' : 0)};
  padding: 15px;
`;

export const startContentTextStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;
  margin: 0 10px 0 20px;
  padding-bottom: 5px;
  border-bottom-color: ${({ theme }) => theme.colors.text.disabled};
  border-bottom-width: 1px;
  flex: 1;
`;
