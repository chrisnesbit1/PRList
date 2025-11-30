import { describe, it, beforeEach, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

describe('App routing', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  it('renders the header', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /prlist/i })).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<App />);
    expect(screen.getByText('© 2025 Chris Nesbit')).toBeInTheDocument();
  });

  it('renders the router with navigation links', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /pull requests/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
  });

  it('renders the default page', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 2, name: /pull requests/i })).toBeInTheDocument();
  });

  it('renders PRListPage on the main route', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 2, name: /pull requests/i })).toBeInTheDocument();
  });

  it('loads the about page on /about', () => {
    window.history.pushState({}, '', '/about');
    render(<App />);
    expect(screen.getByRole('heading', { level: 2, name: /about prlist/i })).toBeInTheDocument();
  });

  it('navigates between routes when links are clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('link', { name: /about/i }));
    expect(screen.getByRole('heading', { level: 2, name: /about prlist/i })).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: /pull requests/i }));
    expect(screen.getByRole('heading', { level: 2, name: /pull requests/i })).toBeInTheDocument();
  });
});
