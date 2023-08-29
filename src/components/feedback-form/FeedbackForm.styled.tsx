import styled from 'styled-components';
import { Selected } from '../../types';

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 30rem;
  width: 35rem;
  top: 0;
`;

export const ButtonGroupWrapper = styled.div`
  position: absolute;
  top: 32rem;
`;

export const FormButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 3rem;
`;

export const FormFieldWrapper = styled.div<Selected>`
  border-radius: 0.25rem;
  border: solid 0.0625rem lightgray;
  min-height: 25rem;
  min-width: 30rem;
  padding: 1rem;
  position: absolute;
  top: ${(props: { selected?: boolean }) => `${props.selected ? 0 : 30}rem`};
  transition: top 0.5s ease; //, visibility 0.125s ;
  visibility: ${(props: { selected?: boolean }) => `${props.selected ? 'visible' : 'hidden'}`};

  @media screen and (max-width: 48rem) {
    max-width: 27rem;
  }
`;

export const FormFieldHeader = styled.div`
  background-color: lightgray;
  padding: 2rem;
`;

export const FormFieldDescription = styled.div`
  font-size: large;
  font-weight: 600;
`;

export const FormFieldInstructions = styled.div`
  font-weight: 500;

  padding: 1rem 0 0 0;
`;

export const FormFieldError = styled.div`
  color: red;
  padding: 1rem 0 0 0;
`;

export const FormFieldControlWrapper = styled.div`
  padding: 1rem;
  font-size: medium;
  line-height: 1rem;
`;

export const SelectStyled = styled.select`
  height: 2rem;
  min-width: 10rem;
`;

export const InputStyled = styled.input`
  height: 2rem;
  min-width: 20rem;
`;

export const TextareaStyled = styled.textarea`
  min-height: 4rem;
  min-width: 24rem;
`;
