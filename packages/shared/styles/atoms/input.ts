import { css } from 'styled-components';

export const containerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

export const inputContainerStyle = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  background-color: white;
  border-radius: 5px;
  height: 44px;
`;

export const inputStyle = css`
  height: 100%;
  flex: 1;
  padding: 0 10px;
  border: none;
  box-sizing: border-box;
`;

export const titleStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px;
  border: none;
  box-sizing: border-box;
  font-size: 12px;
  color: black;
`;
