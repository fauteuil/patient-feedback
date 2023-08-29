import styled from 'styled-components';

export const FeedbackResponseWrapper = styled.div`
  border-radius: 0.25rem;
  border: solid 0.0625rem lightgray;
  /* min-height: 25rem; */
  min-width: 30rem;
  padding: 1rem;
  /* position: absolute;
  top: 0; */
  @media screen and (max-width: 48rem) {
    max-width: 27rem;
    min-width: unset;
  }
`;

export const FeedbackResponseHeader = styled.div`
  background-color: lightgray;
  padding: 2rem;
  margin-bottom: 1rem ;
`;

export const FeedbackResponseDescription = styled.div`
  font-size: large;
  font-weight: 700;
`;

export const FeedbackResponseInstructions = styled.div`
  font-weight: 600;
color:gray;
  padding: 1rem 0 0 0;
`;

export const FeedbackResponseValue = styled.div`
  font-weight: 500;
  padding: 1rem 0 0 1rem;
`;

export const FeedbackWrapper = styled.div`
  padding: 1rem;
  border-radius: 0.25rem;
  border: solid 0.0625rem lightgray;
  display: flex;
  flex-direction: column;
  position: absolute;
  /* height: 30rem; */
  top: 7rem;
  margin-bottom: 2rem ;
`;

export const FeedbackResponseDivider = styled.div`
  padding: 1rem 0 0 0;
  height: 0.25rem;
  border-bottom: solid 0.0625rem lightgray;
  width: 100% ;
`;

