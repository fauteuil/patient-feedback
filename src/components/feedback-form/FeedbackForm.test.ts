import { render, screen } from '@testing-library/react';
import { App } from '../../App';

describe('Render App / FeedbackForm', () => {
  it('should render the component correctly', () => {
    const { findByText, findByTestId } = screen;

    render(App());
    expect(findByText('PATIENT FEEDBACK')).toBeDefined();

    expect(findByTestId('button-continue')).toBeDefined();
    findByTestId('button-continue').then(button => button.click());
    expect(findByText('Doctor Recommendation is a required field')).toBeDefined();
  });

  it('should show a form validation error', () => {
    const { findByText, findByTestId } = screen;

    render(App());

    expect(findByTestId('button-continue')).toBeDefined();
    findByTestId('button-continue').then(button => button.click());
    expect(findByText('Doctor Recommendation is a required field')).toBeDefined();
  });
});
