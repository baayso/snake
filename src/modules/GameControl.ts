import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

/**
 * 游戏控制器
 */
export default class GameControl {
  /** 蛇 */
  private snake: Snake;
  /** 食物 */
  private food: Food;
  /** 记分牌 */
  private scorePanel: ScorePanel;

  /** 蛇的移动方向，即按键方向 */
  private direction: string = "Right";
  /** 游戏是否结束 */
  private isLive = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
  }

  /** 初始化游戏，开始游戏 */
  init() {
    // 绑定键盘按下的事件
    document.addEventListener("keydown", this.keydownHandler.bind(this));

    this.run();
  }

  /** 键盘按下的响应函数 */
  private keydownHandler(event: KeyboardEvent) {
    // 检查event.key的值是否合法，也就是用户是否按了正确的按钮（键盘的方向键）
    this.direction = event.key;
  }

  /** 控制蛇的移动 */
  run() {
    // 获取蛇的坐标
    let x = this.snake.X;
    let y = this.snake.Y;

    /*
     * 根据方向（this.direction）来改变蛇的位置
     * 向上移动  top  减少
     * 向下移动  top  增加
     * 向左移动  left 减少
     * 向右移动  left 增加
     */
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        // 向上移动  top  减少
        y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        // 向下移动  top  增加
        y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        // 向左移动  left 减少
        x -= 10;
        break;
      case "ArrowRight":
      case "Right":
        // 向右移动  left 增加
        x += 10;
        break;
      default:
        break;
    }

    // 检测蛇是否吃到了食物
    if (this.checkEat(x, y)) {
      // 重置食物的位置
      this.food.change();
      // 增加分数
      this.scorePanel.addScore();
      // 给蛇的身体增加一节
      this.snake.addBody();
    }

    try {
      this.snake.X = x;
      this.snake.Y = y;
    } catch (error: any) {
      // 游戏结束
      this.isLive = false;
      alert(`${(<Error>error).message}, GAME OVER!`);
    }

    // 根据等级计算蛇的移动速度
    let speed = 300 - (this.scorePanel.Level - 1) * 30;
    // 定时调用，将蛇自己移动
    this.isLive && setTimeout(this.run.bind(this), speed);
  }

  /** 检测蛇是否吃到了食物 */
  private checkEat(x: number, y: number) {
    return x === this.food.X && y === this.food.Y;
  }
}
