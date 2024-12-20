// console.log('12343\u001b[1K122')

import readline from 'node:readline'

const repeatCount = process.stdout.rows - 2
const blank = repeatCount > 0 ? '\n'.repeat(repeatCount) : ''
readline.cursorTo(process.stdout, 0, 0);
readline.clearScreenDown(process.stdout);
// console.log(process.stdout.rows)
// console.log(blank)

