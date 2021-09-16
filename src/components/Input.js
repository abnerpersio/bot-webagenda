import styled, { css } from 'styled-components';

export default styled.input`
  width: 100%;
  display: block;
  border: none;
  border-radius: 4px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  background: transparent;
  font-size: 16px;
  padding: 8px;
  transition: border-color 0.2s ease-in-out;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  & + div,
  & + input {
    margin-top: 16px;
  }

  &::placeholder {
    color: #242526;
    opacity: 0.5;
  }

  &:focus {
    border-color: #3881F5;
  }

  ${({ error }) => error
    && css`
      & {
        border-color: #e60000 !important;
      }
    `}

  &[type="checkbox"] {
    box-shadow: none;
    display: inline-block;
    width: auto;
  }
`;
