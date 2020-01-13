const db = require('../db/mysql');

class Monster {
    constructor(monsterName, attackpoints, defencepoints, image, level, id, creationDate) {
        this.id = id;
        this.monsterName = monsterName;
        this.attackPoints = attackpoints;
        this.defencePoints = defencepoints;
        this.monsterImage = image;
        if(creationDate == null)
            this.creationDate = new Date();
        else 
            this.creationDate = creationDate;
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
        var sql = "SELECT * FROM monster;";
        
        return new Promise((resolve, reject) => {
            db.query(sql,(err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    
    static getMonster(monsterId) {
        var sql = "SELECT * FROM monster WHERE monsterId = ?;";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[monsterId], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
}


module.exports = Monster;
