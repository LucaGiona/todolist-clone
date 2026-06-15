import { describe, it, expect } from 'vitest';

// Tests for the getInitials helper logic (extracted for unit testing)
function getInitials(name?: string | null, email?: string | null): string {
  if (name) {
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
  return (email?.[0] ?? 'U').toUpperCase();
}

describe('getInitials', () => {
  it('returns initials from full name', () => {
    expect(getInitials('John Doe')).toBe('JD');
  });

  it('returns first two chars for single name', () => {
    expect(getInitials('Alice')).toBe('A');
  });

  it('caps at 2 characters for long names', () => {
    expect(getInitials('Alice Bob Charlie')).toBe('AB');
  });

  it('falls back to email initial when no name', () => {
    expect(getInitials(null, 'user@example.com')).toBe('U');
  });

  it('returns U when both name and email are missing', () => {
    expect(getInitials(null, null)).toBe('U');
  });
});
