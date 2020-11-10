import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-slider/dist/css/bootstrap-slider.css';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
