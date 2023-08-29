import { styled } from 'styled-components';

export const AppContainer = styled.div`
  /* base styles */
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
  display: flex;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px; // basis for rem calculation
  font-synthesis: none;
  font-weight: 400;
  justify-content: center;
  left: 50%;
  line-height: 1.5;
  max-width: 62.5rem; // 1000px / 16px = 62.5rem
  position: absolute;
  text-rendering: optimizeLegibility;
  top: 0;
  transform: translate(-50%, 0);
  width: 100%;

  @media screen and (max-width: 48rem) {
    flex-direction: column-reverse;
  }
`;

export const AppContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  width: 100%;
`;

export const TitleContainer = styled.div`
  font-size: larger;
  font-weight: 800;
  padding: 1rem;
  width: 100%;
`;
