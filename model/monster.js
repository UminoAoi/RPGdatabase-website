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
    }

    static add(monster) {
        monster.id = nextId++;
        allMonstersList.push(player);
    }

    static initData() {
        Monster.add(new Monster("MarioMonster", 20, 20, "https://www.eldarya.pl/static/img/pet/icon/c3e90397c7eea26193f843341f7374db~1525252185.png"));
    }
}

Monster.initData();

module.exports = Monster;
