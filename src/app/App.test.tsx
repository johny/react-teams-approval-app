import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

import { renderWithRedux } from '../test-utils';

test('renders app headline', () => {
  const { getByText } = renderWithRedux(<App />);
  const headline = getByText(/Team approvals admin/i);
  expect(headline).toBeInTheDocument();
});
