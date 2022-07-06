/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
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

  test('search filter', async () => {
    render(<BreweryList />, {
      wrapper: BrowserRouter,
    });

    let searchInput;

    await waitFor(() => {
      searchInput = screen.getByTestId('search-input');
    });

    userEvent.type(searchInput, 'banjo brewing');

    await waitFor(() => {
      expect(screen.queryAllByTestId('brewery-list')).toHaveLength(1);
    });
  });
});
