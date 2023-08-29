// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css';
import { AppContainer, AppContent, TitleContainer } from './App.styled';
import { FeedbackForm } from './components/feedback-form/FeedbackForm';

export function App() {

  return (
    <AppContainer>
      <AppContent>
        <TitleContainer>PATIENT FEEDBACK</TitleContainer>
        <FeedbackForm />
      </AppContent>
    </AppContainer>
  );
}
