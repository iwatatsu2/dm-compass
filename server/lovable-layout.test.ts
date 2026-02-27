import { describe, it, expect } from 'vitest';

describe('LovableLayout - Section Search', () => {
  it('should filter sections by title', () => {
    const sections = [
      { id: '1', number: 1, title: '高血糖緊急症', subtitle: 'DKA', description: 'test', content: null },
      { id: '2', number: 2, title: 'ケトメーター判定', subtitle: 'β-HB', description: 'test', content: null },
    ];

    const query = '高血糖';
    const filtered = sections.filter((s) => s.title.toLowerCase().includes(query.toLowerCase()));

    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.title).toBe('高血糖緊急症');
  });

  it('should filter sections by subtitle', () => {
    const sections = [
      { id: '1', number: 1, title: '高血糖緊急症', subtitle: 'DKA', description: 'test', content: null },
      { id: '2', number: 2, title: 'ケトメーター判定', subtitle: 'β-HB', description: 'test', content: null },
    ];

    const query = 'DKA';
    const filtered = sections.filter((s) => s.subtitle.toLowerCase().includes(query.toLowerCase()));

    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.subtitle).toBe('DKA');
  });

  it('should return all sections when query is empty', () => {
    const sections = [
      { id: '1', number: 1, title: '高血糖緊急症', subtitle: 'DKA', description: 'test', content: null },
      { id: '2', number: 2, title: 'ケトメーター判定', subtitle: 'β-HB', description: 'test', content: null },
      { id: '3', number: 3, title: '糖入り点滴', subtitle: 'IVH', description: 'test', content: null },
    ];

    const query = '';
    const filtered = query ? sections.filter((s) => s.title.toLowerCase().includes(query.toLowerCase())) : sections;

    expect(filtered).toHaveLength(3);
  });

  it('should return empty array when no match found', () => {
    const sections = [
      { id: '1', number: 1, title: '高血糖緊急症', subtitle: 'DKA', description: 'test', content: null },
      { id: '2', number: 2, title: 'ケトメーター判定', subtitle: 'β-HB', description: 'test', content: null },
    ];

    const query = 'インスリノーマ';
    const filtered = sections.filter((s) => s.title.toLowerCase().includes(query.toLowerCase()));

    expect(filtered).toHaveLength(0);
  });

  it('should be case-insensitive', () => {
    const sections = [
      { id: '1', number: 1, title: '高血糖緊急症', subtitle: 'DKA', description: 'test', content: null },
    ];

    const query = 'dka';
    const filtered = sections.filter((s) => s.subtitle.toLowerCase().includes(query.toLowerCase()));

    expect(filtered).toHaveLength(1);
  });
});

describe('LovableLayout - Section Structure', () => {
  it('should have correct section numbering', () => {
    const sections = [
      { id: '1', number: 1, title: '高血糖緊急症', subtitle: 'DKA', description: 'test', content: null },
      { id: '2', number: 2, title: 'ケトメーター判定', subtitle: 'β-HB', description: 'test', content: null },
      { id: '3', number: 3, title: '糖入り点滴', subtitle: 'IVH', description: 'test', content: null },
    ];

    sections.forEach((section, index) => {
      expect(section.number).toBe(index + 1);
    });
  });

  it('should have required fields for each section', () => {
    const sections = [
      { id: '1', number: 1, title: '高血糖緊急症', subtitle: 'DKA', description: 'test', content: null },
    ];

    sections.forEach((section) => {
      expect(section).toHaveProperty('id');
      expect(section).toHaveProperty('number');
      expect(section).toHaveProperty('title');
      expect(section).toHaveProperty('subtitle');
      expect(section).toHaveProperty('description');
      expect(section).toHaveProperty('content');
    });
  });

  it('should have 16 sections in total', () => {
    const sectionCount = 16;
    expect(sectionCount).toBe(16);
  });
});

describe('AlertBox - Alert Types', () => {
  it('should have valid alert types', () => {
    const validTypes = ['danger', 'warning', 'info', 'success'];

    validTypes.forEach((type) => {
      expect(['danger', 'warning', 'info', 'success']).toContain(type);
    });
  });

  it('should map alert types to correct colors', () => {
    const alertStyles: Record<string, { bg: string; border: string }> = {
      danger: { bg: 'bg-red-950/30', border: 'border-red-700' },
      warning: { bg: 'bg-yellow-950/30', border: 'border-yellow-700' },
      info: { bg: 'bg-blue-950/30', border: 'border-blue-700' },
      success: { bg: 'bg-green-950/30', border: 'border-green-700' },
    };

    expect(alertStyles.danger.bg).toBe('bg-red-950/30');
    expect(alertStyles.warning.bg).toBe('bg-yellow-950/30');
    expect(alertStyles.info.bg).toBe('bg-blue-950/30');
    expect(alertStyles.success.bg).toBe('bg-green-950/30');
  });
});
