const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      winner: null,
      gameOver: false,
      logMessages: [],
    };
  },
  methods: {
    startGame() {
      this.gameOver = false;
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackvalue = getRandomValue(5, 12);
      this.monsterHealth -= attackvalue;
      this.addLogMessage("player", "attack", attackvalue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackvalue = getRandomValue(8, 15);
      this.playerHealth -= attackvalue;
      this.addLogMessage("monster", "attack", attackvalue);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackvalue = getRandomValue(10, 25);
      this.monsterHealth -= attackvalue;
      this.addLogMessage("player", "attack", attackvalue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healvalue = getRandomValue(8, 20);
      this.playerHealth += healvalue;
      this.addLogMessage("player", "heal", healvalue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
      this.gameOver = true;
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
    gameResult() {
      switch (this.winner) {
        case "monster":
          return "You Lost!";
        case "player":
          return "You Win!";
        case "draw":
          return "It's a draw!";
        default:
          return "";
      }
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
        this.gameOver = true;
      } else if (value <= 0) {
        this.winner = "monster";
        this.gameOver = true;
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
        this.gameOver = true;
      } else if (value <= 0) {
        this.winner = "player";
        this.gameOver = true;
      }
    },
  },
});
app.mount("#game");
