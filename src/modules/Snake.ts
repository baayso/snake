/**
 * 蛇
 */
export default class Snake {
  /** 蛇的容器 */
  element: HTMLElement;
  /** 表示蛇头的元素 */
  head: HTMLElement;
  /** 蛇的身体（包括蛇头） */
  bodies: HTMLCollectionOf<HTMLElement>;

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

    // 修改蛇的水平坐标时表示蛇正在向左或向右移动，
    // 此时，如果蛇正在向左移动，则不能向右掉头。反之亦然
    // 如果蛇头的位置与后面一节身体的位置相等（重合），则表示发生了掉头
    if (this.bodies[1] && this.bodies[1].offsetLeft === value) {
      // 水平方向发生了掉头，应该让蛇向反方向（即原来的方向）继续移动
      if (value > this.X) {
        // 新水平坐标大于旧水平坐标，说明蛇在向右移动，发生了掉头
        // 让蛇继续向左移动
        value = this.X - 10;
      } else {
        // 新水平坐标小于旧水平坐标，说明蛇在向左移动，发生了掉头
        // 让蛇继续向右移动
        value = this.X + 10;
      }
    }

    // 蛇水平移动的合法范围为0-290
    if (value < 0 || value > 290) {
      // 蛇撞墙了
      throw new Error("蛇撞墙了");
    }

    // 移动蛇的身体
    this.moveBody();

    this.head.style.left = value + "px";

    // 检查蛇头与蛇身是否相撞（重合）
    this.checkHeadAndBody();
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

    // 修改蛇的垂直坐标时表示蛇正在向上或向下移动，
    // 此时，如果蛇正在向上移动，则不能向下掉头。反之亦然
    // 如果蛇头的位置与后面一节身体的位置相等（重合），则表示发生了掉头
    if (this.bodies[1] && this.bodies[1].offsetTop === value) {
      // 垂直方向发生了掉头，应该让蛇向反方向（即原来的方向）继续移动
      if (value > this.Y) {
        // 新垂直坐标大于旧垂直坐标，说明蛇在向下移动，发生了掉头
        // 让蛇继续向上移动
        value = this.Y - 10;
      } else {
        // 新垂直坐标小于旧垂直坐标，说明蛇在向上移动，发生了掉头
        // 让蛇继续向下移动
        value = this.Y + 10;
      }
    }

    // 蛇垂直移动的合法范围为0-290
    if (value < 0 || value > 290) {
      // 蛇撞墙了
      throw new Error("蛇撞墙了");
    }

    // 移动蛇的身体
    this.moveBody();

    this.head.style.top = value + "px";

    // 检查蛇头与蛇身是否相撞（重合）
    this.checkHeadAndBody();
  }

  /** 增加蛇的身体 */
  addBody() {
    // 向element中添加一个div
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }

  /** 移动蛇的身体 */
  moveBody() {
    /*
     * 将蛇后面的身体位置修改为前面身体的位置
     * 例如：
     * 第4节 => 第3节的位置
     * 第3节 => 第2节的位置
     * 第2节 => 蛇头的位置
     * 蛇头  => 移动到的位置
     */
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前面身体的位置
      let x = this.bodies[i - 1].offsetLeft;
      let y = this.bodies[i - 1].offsetTop;

      // 将当前身体的位置修改为前面身体的位置
      this.bodies[i].style.left = x + "px";
      this.bodies[i].style.top = y + "px";
    }
  }

  /** 检查蛇头与蛇身是否相撞（重合） */
  checkHeadAndBody() {
    // 下标为0的元素是蛇头，下标从1开始的元素是蛇身
    for (let i = 1; i < this.bodies.length; i++) {
      const body = this.bodies[i];
      if (this.X === body.offsetLeft && this.Y === body.offsetTop) {
        throw new Error("撞到自己了");
      }
    }
  }
}
