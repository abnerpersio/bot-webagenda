import styled, { css } from 'styled-components';

export default styled.button`
  border: none;
  background: #3881F5;
  color: #F8F8F8;
  border: 2px solid transparent;
  border-radius: 4px;
  padding: 8px 24px;
  margin-top: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 24px;
  }

  svg {
    width: 16px;
    height: 16px;
  }

  & > * + svg {
    margin-left: 8px;
  }

  &.large-icon svg {
    width: 24px;
    height: 24px;
  }


  ${({ isLoading }) => isLoading
    && css`
      background: #242526;
      cursor: default;
    `}

  ${({ transparent }) => transparent
    && css`
      background-color: transparent;
      border: 2px solid #3881F5;
      color: #3881F5;
  `}

  ${({ variant }) => variant === 'orange'
  && css`
    background: #FB5012;
    color: #F8F8F8;
  `}

  ${({ variant, transparent }) => variant === 'orange' && transparent
  && css`
    background-color: transparent;
    border: 2px solid #FB5012;
    color: #FB5012;
  `}

  &:hover {
    background-color: #5393f7;

    ${({ transparent }) => transparent
    && css`
      border-color: #5393f7;
      background: transparent;
      color: #5393f7;
    `}

    ${({ variant }) => variant === 'orange'
    && css`
      border-color: #fd7c4e;
      background-color: transparent;
      color: #fd7c4e;
    `}
  }

  &:disabled {
    border-color: transparent;
    background: #ccc;
    color: #F8F8F8;
    cursor: default;
  }

  ${({ error }) => error
    && css`
      border-color: transparent;
      background: #ccc;
      color: #F8F8F8;
      cursor: default;
    `}

`;
