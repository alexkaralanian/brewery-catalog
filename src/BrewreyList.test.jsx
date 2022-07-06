/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import BreweryList from './BreweryList';

describe('Brewery List', () => {
  beforeEach(async () => {
    fetch.resetMocks();

    await fetch.mockResponse(
      JSON.stringify([
        {
          id: 'banjo-brewing-fayetteville',
          name: 'Banjo Brewing',
          city: 'Fayetteville',
          state: 'West Virginia',
        },
        {
          id: 'barrel-brothers-brewing-company-windsor',
          name: 'Barrel Brothers Brewing Company',
          city: 'Windsor',
          state: 'California',
        },
      ])
    );
  });

  test('renders', async () => {
    render(<BreweryList />, {
      wrapper: BrowserRouter,
    });
    await waitFor(() => {
      expect(screen.getByText('Brewery List')).toBeInTheDocument();
      expect(screen.getByText('Banjo Brewing')).toBeInTheDocument();
      expect(screen.getByText('Windsor, California,')).toBeInTheDocument();
    });
  });
});
