import { BaseUi } from './base-ui.js';
import chalk from 'chalk';

export class ScrollList extends BaseUi {
  curSelectedIndex = 0;
  scrollTop = 0;

  constructor(private list: string[] = []) {
    super();
    this.render()
  }

  onKeyInput(name: string) {
    if(name !== 'up' && name !== 'down') {
      return;
    }
    const action = this.KEYS[name]
    action()
    this.render()
  }

  private readonly KEYS = {
    up: () => this.cursorUp(),
    down: () => this.cursorDown()
  }

  cursorUp() {
    this.moveCursor(-1)
  }
  cursorDown() {
    this.moveCursor(1)
  }

  private moveCursor(index: number) {
    this.curSelectedIndex += index
    if (this.curSelectedIndex < 0) {
      this.curSelectedIndex = 0
    }
    if (this.curSelectedIndex >= this.list.length) {
      this.curSelectedIndex = this.list.length - 1
    }
    // 判断移动完后还是否需要滚动
    this.fitScroll()
  }

  fitScroll() {
    const shouldUpScroll = this.curSelectedIndex < this.scrollTop
    const shouldDownScroll = this.curSelectedIndex > this.scrollTop + this.terminalSize.rows - 2
    if (shouldUpScroll) {
      this.scrollTop -= 1
    }
    if (shouldDownScroll) {
      this.scrollTop += 1
    }
    this.clear()
  }

  clear() {
    for (let i = 0; i < this.terminalSize.rows; i++) {
      this.clearLine(i)
    }
  }

  bgRow(text: string) {
    return chalk.bgBlue(text + ' '.repeat(this.terminalSize.columns - text.length))
  }
  render() {
    const renderList = this.list.slice(this.scrollTop, this.scrollTop + this.terminalSize.rows);
    renderList.forEach((item: string, index: number) => {
      const row = index
      this.clearLine(row)
      let content = item
      if (this.curSelectedIndex === this.scrollTop + index) {
        // 当前选中的一项
        content = this.bgRow(content)
      }
      // 渲染每一行
      this.printAt(content, { x: 0, y: row })
    })
  }

}