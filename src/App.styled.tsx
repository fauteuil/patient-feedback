import { styled } from 'styled-components';

export const AppContainer = styled.div`
  /* base styles */
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px; // basis for rem calculation
  line-height: 1.5;
  font-weight: 400;

  /* display: flex; */
  justify-content: center;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  /* padding: 3rem; */

  max-width: 62.5rem; // 1000px / 16px = 62.5rem
  display: flex;

  @media screen and (max-width: 48rem) {
    flex-direction: column-reverse;
  }
`;

export const AppContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 3rem;
`;

export const TitleContainer = styled.div`
  padding: 1rem;

  width: 100%;
  font-size: larger;
  font-weight: 800;
`;
