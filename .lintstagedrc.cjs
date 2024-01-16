module.exports = {
    '*.ts': ['prettier --write', 'tsc --noEmit', 'lint'],
    '*.tsx': ['prettier --write', 'tsc --noEmit', 'lint'],
    '*.scss': 'prettier --write',
}
