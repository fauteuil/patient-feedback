import { render, screen } from '@testing-library/react';
// import { FeedbackForm } from './FeedbackForm';
import { App } from '../../App';

describe('FeedbackForm', () => {
  it('should render the component correctly', () => {
    // const { getByText } = screen;
    const { findByText } = screen;

    render(App());
    // render(FeedbackForm());
    expect(findByText('PATIENT FEEDBACK')).toBeDefined();

    // expect(findByText('Hello, world!')).toBeInTheDocument();
  });
});

// test('render correctly', () => {
//   render(<FeedbackForm />)
//   const titleElement = screen.getRoleBy('heading')
//   expect(titleElement).toBeInTheDocument()
// }
