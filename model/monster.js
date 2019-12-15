let nextId = 1;
const allMonstersList = [];

class Monster {
    constructor(monsterName, attackpoints, defencepoints, image, level, id) {
        this.id = id;
        this.monsterName = monsterName;
        this.attackPoints = attackpoints;
        this.defencePoints = defencepoints;
        this.monsterImage = image;
        this.creationDate = new Date();
        this.level = level;
        Monster.add(this);
    }

    static add(monster) {
        monster.id = nextId++;
        allMonstersList.push(monster);
    }
    
    static getMonsters(){
        return allMonstersList;
    }
    
    static getMonster(monsterId) {
        var monster = null;
        for (var i = 0; i < allMonstersList.length; i++) {
            if (allMonstersList[i].id == monsterId) {
                return allMonstersList[i];
            }
        }
        return monster;
    }

    static initData() {
        new Monster("MarioMonster", 20, 20, "https://www.electronicbeats.net/app/uploads/sites/5/2018/02/mario.png", 3);
    }
}

Monster.initData();

module.exports = Monster;
