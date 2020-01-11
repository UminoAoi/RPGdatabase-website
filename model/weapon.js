const db = require('../db/mysql');

class Weapon {
    constructor(weaponName, bonusattack, bonusdefence, player, id) {
        this.id = id;
        this.weaponName = weaponName;
        this.bonusAttack = bonusattack;
        this.bonusDefence = bonusdefence;
        this.level = 1;
        this.creationDate = new Date();
        this.player = player;
    }
    
    static getWeapon(weaponId) {
        var sql = "SELECT * FROM weapon WHERE weaponId = ?;";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[weaponId], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
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
