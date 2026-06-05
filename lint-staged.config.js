module.exports = {
  'src/**/*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  'prisma/**/*.ts': ['prettier --write'],
  '*.{json,md,css}': ['prettier --write'],
}
