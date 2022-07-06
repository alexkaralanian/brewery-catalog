/* eslint-disable testing-library/no-wait-for-multiple-assertions */

import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import BreweryDetails from './BreweryDetails';

describe('Brewery Details', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('renders', async () => {
    await fetch.mockResponse(
      JSON.stringify({
        name: 'Banjo Brewing',
        city: 'Fayetteville',
        state: 'West Virginia',
        country: 'United States',
        phone: '3042164231',
      })
    );

    render(<BreweryDetails />, {
      wrapper: BrowserRouter,
    });

    await waitFor(() => {
      expect(screen.getByText('Banjo Brewing')).toBeInTheDocument();
      expect(
        screen.getByText('Fayetteville, West Virginia')
      ).toBeInTheDocument();
    });
  });
});
