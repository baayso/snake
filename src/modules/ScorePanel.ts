/**
 * 记分牌
 */
export default class ScorePanel {
  /** 默认最大等级 */
  private static DEFAULT_MAX_LEVEL: number = 10;
  /** 默认升级所需要的分数 */
  private static DEFAULT_LEVEL_UP_SCORE: number = 10;

  /** 分数 */
  private score = 0;
  /** 等级 */
  private level = 1;

  /** 等级上限 */
  private maxLevel: number;
  /** 升级所需要的分数 */
  private levelUpScore: number;

  /** 分数元素 */
  scoreElement: HTMLElement;
  /** 等级元素 */
  levelElement: HTMLElement;

  constructor(
    maxLevel: number = ScorePanel.DEFAULT_MAX_LEVEL,
    levelUpScore: number = ScorePanel.DEFAULT_LEVEL_UP_SCORE
  ) {
    this.scoreElement = document.getElementById("score")!;
    this.levelElement = document.getElementById("level")!;
    this.maxLevel = maxLevel;
    this.levelUpScore = levelUpScore;
  }

  /** 增加分数 */
  addScore() {
    this.score++;
    this.scoreElement.innerHTML = this.score + "";

    if (this.score % this.levelUpScore === 0) {
      this.levelUp();
    }
  }

  /** 提升等级 */
  levelUp() {
    if (this.level < this.maxLevel) {
      this.level++;
      this.levelElement.innerHTML = this.level + "";
    }
  }

  /** 获取分数 */
  get Score() {
    return this.score;
  }

  /** 获取等级 */
  get Level() {
    return this.level;
  }

  /** 获取等级上限 */
  get MaxLevel() {
    return this.maxLevel;
  }

  /** 设置等级上限 */
  set MaxLevel(maxLevel: number) {
    this.maxLevel = maxLevel;
  }

  /** 获取升级所需要的分数 */
  get LevelUpScore() {
    return this.maxLevel;
  }

  /** 设置升级所需要的分数 */
  set LevelUpScore(levelUpScore: number) {
    this.levelUpScore = levelUpScore;
  }
}
