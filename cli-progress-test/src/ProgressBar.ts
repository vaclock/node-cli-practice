import ansiEscapes from 'ansi-escapes';
import { EOL } from 'os';
import chalk from 'chalk';

const write = process.stdout.write.bind(process.stdout);

export default class ProgressBar {

  private total: number = 0;
  private value: number = 0;

  start(total: number, initValue: number = 0) {
    this.total = total;
    this.value = initValue;
    write(ansiEscapes.cursorHide)
    write(ansiEscapes.cursorSavePosition)
    this.render()
  }

  render() {
    let progress = this.value / this.total
    if (progress < 0) {
      progress = 0
      this.value = 0
    }
    if (progress > 1) {
      progress = 1
      this.value = this.total
    }
    const barSize = 60
    const curSize = Math.floor(progress * barSize)
    const resetSize = barSize - curSize
    write(ansiEscapes.cursorRestorePosition)
    write(chalk.blue('█').repeat(curSize));
    // write('█'.repeat(curSize));
    write('░'.repeat(resetSize));
    write(` ${this.value} / ${this.total}`)

  }

  getTotalSize() {
    return this.total
  }

  update(value: number) {
    this.value = value
    this.render()
  }

  stop() {
    write(ansiEscapes.cursorShow)
    write(EOL)
  }
}