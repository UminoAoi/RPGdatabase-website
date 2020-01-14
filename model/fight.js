const db = require('../db/mysql');

class Fight {
    constructor(character1, character2, world, result, fightDate) {
        this.you = character1;
        this.enemy = character2;
        this.world = world;
        this.result = result;
        if(fightDate == null)
            this.fightDate = new Date();
        else
            this.fightDate= fightDate;
    }

    static add(fight) {
            var sql =
                "Insert into fight (FightDate, CharacterId_1, CharacteId_2, WorldId, Result) " +
                "values (?, ?, ?, ?, ?);"

            return new Promise((resolve, reject) => {
                db.query(sql, [fight.fightDate, fight.you.id, fight.enemy.id, fight.world.id, fight.result], (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(rows);
                });
            });
    }
    
    static delete(date, you, enemy) {
        var d = new Date(date);
        var properDate = d.toISOString().slice(0,19).replace("T", " ");
        var sql = "DELETE FROM fight WHERE FightDate = ? && CharacterId_1 = ? && CharacteId_2 = ?;";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[properDate, you, enemy], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
}

module.exports = Fight;
