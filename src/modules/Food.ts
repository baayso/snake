/**
 * 食物
 */
export default class Food {
  /** 食物所对应的元素 */
  private element: HTMLElement;

  constructor() {
    // 获取页面中的food元素
    this.element = document.getElementById("food")!;
  }

  /**
   * 获取食物水平轴（X轴）坐标
   */
  get X() {
    return this.element.offsetLeft;
  }

  /**
   * 获取食物垂直轴（Y轴）坐标
   */
  get Y() {
    return this.element.offsetTop;
  }

  /**
   * 修改食物的位置
   */
  change() {
    // 生成食物的随机位置
    // 食物的位置最小是0，最大是290
    // 蛇移动一次为一格，一格的大小是10px，所以要求食物的坐标必须是10的倍数
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;

    this.element.style.left = left + "px";
    this.element.style.top = top + "px";
  }
}
