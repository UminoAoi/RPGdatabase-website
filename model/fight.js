const db = require('../db/mysql');

class Fight {
    constructor(character1, character2, world, result) {
        this.you = character1;
        this.enemy = character2;
        this.world = world;
        this.result = result;
        this.fightDate = new Date();
    }

    static add(fight) {
            var sql =
                "Insert into fight (FightDate, CharacterId_1, CharacterId_2, WorldId, Result) " +
                "values (?, ?, ?, ?, ?);"

            return new Promise((resolve, reject) => {
                db.query(sql, [fight.fightDate, fight.you, fight.enemy, fight.world, fight.result], (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(rows);
                });
            });
    }
    
    static delete(date, you, enemy) {
        var sql = "DELETE FROM fight WHERE FightDate = ? && CharacterId_1 = ? && CharacterId_2 = ?;";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[date, you, enemy], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
}

module.exports = Fight;
