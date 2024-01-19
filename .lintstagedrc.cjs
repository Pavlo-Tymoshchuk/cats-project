module.exports = {
    '*.{ts,tsx}': ['prettier --write', 'tsc --noEmit', 'eslint . --report-unused-disable-directives --max-warnings 0'],
    '*.scss': 'prettier --write',
}
