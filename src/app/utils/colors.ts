export const PRESET_COLORS = [
  { name: 'Ocean Blue', primary: '#0ea5e9', secondary: '#06b6d4' },
  { name: 'Forest Green', primary: '#10b981', secondary: '#059669' },
  { name: 'Royal Purple', primary: '#8b5cf6', secondary: '#7c3aed' },
  { name: 'Sunset Orange', primary: '#f97316', secondary: '#ea580c' },
  { name: 'Cherry Red', primary: '#ef4444', secondary: '#dc2626' },
  { name: 'Indigo Night', primary: '#6366f1', secondary: '#4f46e5' },
];

export function getColorScheme(schemeName: string, customColors: Array<{ name: string; primary: string; secondary: string }> = []) {
  const allSchemes = [...PRESET_COLORS, ...customColors];
  return allSchemes.find(c => c.name === schemeName) || PRESET_COLORS[0];
}
