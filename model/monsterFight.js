const db = require('../db/mysql');

class MonsterFight {
    constructor(character, monster) {
        this.you = character;
        this.monster = monster;
    }
    
    static add(monsterFight) {
            var sql =
                "Insert into monsterfight (MonsterId, CharacterId) " +
                "values (?, ?);"

            return new Promise((resolve, reject) => {
                db.query(sql, [monsterFight.monster.id, monsterFight.you.id], (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(rows);
                });
            });
    }
}

module.exports = MonsterFight;
