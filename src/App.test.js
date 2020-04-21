import React from 'react';
import { render } from '@testing-library/react';
import App from './components/App/App';
import { calculateDistanceMiles } from './helpers/calculateDistance'

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('calculate distance from two coordinates', () => {

  const Boston = { lat: 42.3601, lng: -71.0589 };
  const LA = { lat: 34.0522, lng: -118.2437 };
  expect(calculateDistanceMiles(Boston, LA)).toBe(2591.0);
  expect(calculateDistanceMiles(Boston, LA, 3)).toBe(2591.034);
});
