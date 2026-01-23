export type ParsedItem = {
  slug: string;
  quantity: number;
  isValid: boolean;
};

const MAX_LINES = 5000;

export function parseBulkText(text: string): ParsedItem[] {
  if (!text) return [];

  // It ignores line breaks, commas, tabs, and spaces.
  const globalPattern = /([a-zA-Z0-9-_.]+)\s+(\d+)/g;

  const matches = [...text.matchAll(globalPattern)];

  // If find meaningful matches, return them
  if (matches.length > 0) {
    if (matches.length > MAX_LINES) {
      throw new Error(`Maximum ${MAX_LINES} items allowed`);
    }

    return matches.map((match) => ({
      slug: match[1] || "", // The Slug
      quantity: Number(match[2]), // The Qty
      isValid: true,
    }));
  }

  // Fallback to Line-by-Line (For weirdly formatted manual entries)
  const lines = text.split(/\r?\n/);
  return lines
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      return { slug: trimmed, quantity: 0, isValid: false };
    })
    .filter((item): item is ParsedItem => item !== null);
}
