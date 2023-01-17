/**
 * 蛇
 */
export default class Snake {
  /** 蛇的容器 */
  element: HTMLElement;
  /** 表示蛇头的元素 */
  head: HTMLElement;
  /** 蛇的身体（包括蛇头） */
  bodies: HTMLCollection;

  constructor() {
    this.element = document.getElementById("snake")!;
    this.head = document.querySelector("#snake > div") as HTMLElement;
    this.bodies = this.element.getElementsByTagName("div");
  }

  /**
   * 获取蛇的（蛇头）水平轴（X轴）坐标
   */
  get X() {
    return this.head.offsetLeft;
  }

  /** 设置蛇的（蛇头）水平轴（X轴）坐标 */
  set X(value: number) {
    if (this.X === value) {
      return;
    }

    // 蛇水平移动的合法范围为0-290
    if (value < 0 || value > 290) {
      // 蛇撞墙了
      throw new Error("蛇撞墙了");
    }

    this.head.style.left = value + "px";
  }

  /**
   * 获取蛇的（蛇头）垂直轴（Y轴）坐标
   */
  get Y() {
    return this.head.offsetTop;
  }

  /** 设置蛇的（蛇头）垂直轴（Y轴）坐标 */
  set Y(value: number) {
    if (this.Y === value) {
      return;
    }

    // 蛇垂直移动的合法范围为0-290
    if (value < 0 || value > 290) {
      // 蛇撞墙了
      throw new Error("蛇撞墙了");
    }

    this.head.style.top = value + "px";
  }

  /** 增加蛇的身体 */
  addBody() {
    // 向element中添加一个div
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }
}
