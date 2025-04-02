import React from 'react';
import Box from '@mui/material/Box';
import styled, { keyframes } from 'styled-components';

const dotAnimation = keyframes`
  0% { transform: translateX(0); opacity: 0.5; }
  50% { transform: translateX(10px); opacity: 1; }
  100% { transform: translateX(0); opacity: 0.5; }
`;

const Dot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #b0b0b0; /* Darker shade of #d9d9d9 */
  animation: ${dotAnimation} 1.5s ease-in-out infinite;

  &:nth-child(2) {
    background-color: #e0d6cf; /* Darker shade of #FBF7F4 */
    animation-delay: 0.5s;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 60px;
`;

const LoaderContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1300;
  background-color: rgba(251, 247, 244, 0.7); /* Slightly reduced opacity */
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <DotsContainer>
        <Dot />
        <Dot />
      </DotsContainer>
    </LoaderContainer>
  );
};

export default Loader;
