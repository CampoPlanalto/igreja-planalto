import { describe, expect, it } from 'vitest';
import { cn, slugify, formatDate } from '@/lib/utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden')).toBe('base');
  });

  it('handles undefined values', () => {
    expect(cn('base', undefined, null)).toBe('base');
  });
});

describe('slugify', () => {
  it('converts text to slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('handles special characters', () => {
    expect(slugify('Café & Bistrô!')).toBe('cafe-bistro');
  });

  it('removes accents', () => {
    expect(slugify('Campanha São João')).toBe('campanha-sao-joao');
  });
});

describe('formatDate', () => {
  it('formats date string', () => {
    const result = formatDate('2026-07-26');
    expect(result).toBeTruthy();
  });
});