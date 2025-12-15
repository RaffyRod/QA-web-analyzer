/**
 * @author RaffyRod (https://github.com/RaffyRod)
 */

/**
 * Escapes HTML special characters
 */
export function escapeHtml(text: string | null | undefined): string {
  if (text === null || text === undefined) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
