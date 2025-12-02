import { describe, it, beforeEach, expect } from 'vitest';
import { CreateSettingsService } from './SettingsService.jsx';

describe('CreateSettingsService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores the PAT in memory while persisting repos', () => {
    const service = CreateSettingsService();

    service.save({ pat: 'secret-pat', repos: ['foo/bar'] });

    expect(localStorage.getItem('prlist_settings')).toBe(JSON.stringify({ repos: ['foo/bar'] }));

    const loaded = service.load();
    expect(loaded.pat).toBe('secret-pat');
    expect(loaded.repos).toEqual(['foo/bar']);
  });

  it('returns runtime PAT even when there is no persisted data', () => {
    const service = CreateSettingsService();
    service.setRuntimePat('runtime-only-pat');

    const loaded = service.load();

    expect(loaded.pat).toBe('runtime-only-pat');
    expect(loaded.repos).toEqual([]);
  });

  it('falls back to an empty repo list when persisted data is invalid', () => {
    localStorage.setItem('prlist_settings', JSON.stringify({ repos: 'not-an-array' }));
    const service = CreateSettingsService();

    const loaded = service.load();

    expect(loaded.repos).toEqual([]);
    expect(loaded.pat).toBe('');
  });
});
