import { describe, it, expect } from 'vitest';
import { escapeHtml } from '../../src/utils/html';

describe('html utils', () => {
  describe('escapeHtml', () => {
    it('should escape HTML special characters', () => {
      expect(escapeHtml('<div>test</div>')).toBe('&lt;div&gt;test&lt;/div&gt;');
      expect(escapeHtml('&amp;')).toBe('&amp;amp;');
      // Note: textContent doesn't escape quotes, but that's fine for our use case
      expect(escapeHtml("'apostrophe'")).toBe("'apostrophe'");
    });

    it('should handle null values', () => {
      expect(escapeHtml(null)).toBe('');
    });

    it('should handle undefined values', () => {
      expect(escapeHtml(undefined)).toBe('');
    });

    it('should handle empty strings', () => {
      expect(escapeHtml('')).toBe('');
    });

    it('should handle plain text without special characters', () => {
      expect(escapeHtml('Hello World')).toBe('Hello World');
    });

    it('should handle complex HTML strings', () => {
      const input = '<script>alert("XSS")</script>';
      const output = escapeHtml(input);
      expect(output).not.toContain('<script>');
      expect(output).not.toContain('</script>');
      expect(output).toContain('&lt;');
      expect(output).toContain('&gt;');
    });

    it('should handle strings with newlines', () => {
      expect(escapeHtml('line1\nline2')).toBe('line1\nline2');
    });
  });
});
