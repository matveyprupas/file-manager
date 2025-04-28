// ANSI color codes
export const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blueBold: '\x1b[1;34m',
};

export function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}