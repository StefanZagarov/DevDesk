function toCamelCase(str: string): string {
  return str.replace(/_[a-z]/g, (_, letter) => letter.toUpperCase());
}

export function mapRow(row: Record<string, any>): Record<string, any> {
  const mapped: Record<string, any> = {};
  for (const [key, value] of Object.entries(row)) {
    mapped[toCamelCase(key)] = value;
  }
  return mapped;
}
