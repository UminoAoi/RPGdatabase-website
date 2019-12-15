let nextId = 1;
const allMonstersList = [];

class Monster {
    constructor(monsterName, attackpoints, defencepoints, image, level, id) {
        this.id = id;
        this.monsterName = monsterName;
        this.attackPoints = attackpoints;
        this.defencePoints = defencepoints;
        this.characterImage = image;
        this.creationDate = new Date();
        this.level = level;
        add(this);
    }

    static add(monster) {
        monster.id = nextId++;
        allMonstersList.push(player);
    }

    static initData() {
        new Monster("MarioMonster", 20, 20, "https://www.electronicbeats.net/app/uploads/sites/5/2018/02/mario.png");
    }
}

Monster.initData();

module.exports = Monster;
