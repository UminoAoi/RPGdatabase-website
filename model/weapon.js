const db = require('../db/mysql');

class Weapon {
    constructor(weaponName, bonusattack, bonusdefence, player, id, level, creationDate) {
        this.id = id;
        this.weaponName = weaponName;
        this.bonusAttack = bonusattack;
        this.bonusDefence = bonusdefence;
        if(level == null)
            this.level = 1;
        else
            this.level = level;
        if(creationDate == null)
            this.creationDate = new Date();
        else
            this.creationDate = creationDate;
        this.player = player;
    }
    
    static getWeapon(weaponId) {
        var sql = "SELECT * FROM weapon WHERE weaponId = ?;";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[weaponId], (err, rows) => {
                if (err)
                    return reject(err);
                var weapon = null;
                var obj = rows[0];
                if(Object.entries(rows).length > 0)
                    var weapon = new Weapon(obj["WeaponName"], obj["BonusAttackPoints"], obj["BonusDefencePoints"], obj["User_UserId"], obj["WeaponId"], obj["Level"], obj["WeaponCreationDate"]);
                console.log(weapon);
                resolve(weapon);
                });
        });
    }
    
    static add(weapon) {
        var sql = "Insert into weapon (WeaponName, BonusAttackPoints, BonusDefencePoints, Level, WeaponCreationDate, User_UserId) " +
            "values (?,?,?,?,?,?)"
            
        return new Promise((resolve, reject) => {
            db.query(sql, [weapon.weaponName, weapon.bonusAttack, weapon.bonusDefence, weapon.level, weapon.creationDate, weapon.player], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    
    static delete(weaponId) {
        var sql = "DELETE FROM weapon WHERE weaponId = ?;";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[weaponId], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    static edit(weaponId, weaponName, bonusattack, bonusdefence) {
           
        var sql = "UPDATE weapon " + 
        "SET WeaponName = ?, BonusAttackPoints = ?, BonusDefencePoints = ? " +
        "WHERE weaponId = ?;";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[weaponName, bonusattack, bonusdefence, weaponId], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        })
    }
}

module.exports = Weapon;
