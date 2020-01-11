const db = require('../db/mysql');

class Monster {
    constructor(monsterName, attackpoints, defencepoints, image, level, id) {
        this.id = id;
        this.monsterName = monsterName;
        this.attackPoints = attackpoints;
        this.defencePoints = defencepoints;
        this.monsterImage = image;
        this.creationDate = new Date();
        this.level = level;
        //Monster.add(this);
    }

    static add(monster) {
            var sql =
                "Insert into monster (MonsterName, AttackPoints, DefencePoints, MonsterImage, Level, MonsterCreationDate) " +
                "values (?, ?, ?, ?, ?, ?, ?);"

            return new Promise((resolve, reject) => {
                db.query(sql, [monster.monsterName, monster.attackPoints, monster.defencePoints, monster.monsterImage, monster.level,monster.creationDate], (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(rows);
                });
            });
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

//Monster.initData();

module.exports = Monster;
