import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(36, 37, 38, 0.4);
  z-index: 10;
`;

export const Container = styled.div`
  background: #F8F8F8;
  border-radius: 4px;
  padding: 8px;
  padding-top: 16px;
  min-height: 150px;
  max-height: 480px;
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 100px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.25);
  overflow: auto;
  position: relative;

  button.btn-close {
    margin-top: 16px;
    margin-left: 16px;
  }

  .close {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 30px;
    border: none;
    background: transparent;
  }
`;
