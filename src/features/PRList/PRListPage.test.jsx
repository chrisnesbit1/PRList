import { describe, it, beforeEach, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PRListPage from './PRListPage.jsx';

const mockSettingsService = {
  load: vi.fn(),
  save: vi.fn(),
};

vi.mock('../../services/SettingsService.jsx', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    CreateSettingsService: () => mockSettingsService,
  };
});

describe('PRListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSettingsService.load.mockReturnValue({ pat: '', repos: [] });
  });

  it('populates the form with settings from the service', () => {
    mockSettingsService.load.mockReturnValue({
      pat: 'stored-pat',
      repos: ['foo/bar', 'baz/qux'],
    });

    render(<PRListPage />);

    expect(mockSettingsService.load).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText(/personal access token/i)).toHaveValue('stored-pat');
    expect(screen.getByLabelText(/org\/repo\(s\)/i)).toHaveValue('foo/bar\nbaz/qux');
  });

  it('saves settings when the form is submitted', async () => {
    const user = userEvent.setup();
    render(<PRListPage />);

    await user.type(screen.getByLabelText(/org\/repo\(s\)/i), 'octocat/hello-world');
    await user.type(screen.getByLabelText(/personal access token/i), 'new-pat');
    await user.click(screen.getByRole('button', { name: /save settings/i }));

    expect(mockSettingsService.save).toHaveBeenCalledTimes(1);
    expect(mockSettingsService.save).toHaveBeenCalledWith({
      pat: 'new-pat',
      repos: ['octocat/hello-world'],
    });
  });
});
