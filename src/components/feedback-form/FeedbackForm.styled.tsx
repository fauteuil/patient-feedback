import styled from 'styled-components';
import { Offset, Selected } from '../../types';

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 30rem;
  width: 35rem;
  top: 0;


  /* overflow: hidden; */
  /* width: 35rem ; */
`;

export const FormViewWrapper = styled.div`
  display: flex;
  gap: 3rem;
  flex-direction: row;
  overflow: hidden;
  width: 35rem;
  position: relative;
  /* left: 0; */
  height: 20rem;
`;

export const FormFieldCarouselWrapper = styled.div<Offset>`
  display: flex;
  gap: 3rem;
  flex-direction: row;
  /* left: ${(props: { offset?: number }) => `${props?.offset || 0}rem`};
  position: relative;
  transition: left 0.5s; */
  /* width: 35rem ; */
`;

export const FormButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  top:25rem;
  position: absolute;
`;

/* export const FormFieldWrapper = styled.div` */
export const FormFieldWrapper = styled.div<Selected>`
  border: solid 0.0625rem lightgray;
  border-radius: 0.25rem ;
  /* display: flex ; */
  /* align-items: left; */
  /* left: ${(props: { selected?: boolean }) => `${props.selected ? true : false}`}; */
  top: ${(props: { selected?: boolean }) => `${props.selected ? 0 : 30}rem`};
  position: absolute;
  /* top: 0; */
  min-width: 30rem;
  /* transition: top 0.5s ease, visibility 0.5s ease; */
  transition: top 0.5s ease; //, visibility 0.5s ease;
  min-height: 15rem;
  visibility: ${(props: { selected?: boolean }) => `${props.selected ? 'visible' : 'hidden'}`};
  padding: 1rem ;

  @media screen and (max-width: 48rem) {
    max-width: 25rem;
  }
  `;

export const FormFieldHeader = styled.div`
  background-color: lightgray;
  padding: 2rem;
  /* font-size: large; */
`;

export const FormFieldDescription = styled.div`
  font-size: large;
  font-weight: 600;
  /* padding: 0 0 1rem 0; */
`;

export const FormFieldInstructions = styled.div`
  /* padding: 2rem; */
  /* border: solid 0.0625rem black;
border-radius: 0.125rem; */
  font-weight: 500;

  padding: 1rem 0 0 0;
`;

export const FormFieldError = styled.div`
  /* padding: 2rem; */
  /* border: solid 0.0625rem black;
border-radius: 0.125rem; */
  color: red;
  padding: 1rem 0 0 0;
`;

export const FormFieldControlWrapper = styled.div`
  padding: 1rem;
  font-size: medium;
  line-height: 1rem;
`;
