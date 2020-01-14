const db = require('../db/mysql');

class Character {
    constructor(characterName, species, attackpoints, defencepoints, image, date, weapon, player, id, level, fightPoints) {
        this.id = id;
        this.characterName = characterName;
        this.species = species;
        this.attackPoints = attackpoints;
        this.defencePoints = defencepoints;
        this.characterImage = image;
        if (date == undefined)
            this.creationDate = new Date();
        else
            this.creationDate = date;
        if(level == null)
            this.level = 1;
        else
            this.level = level;
        if(fightPoints == null)
            this.fightPoints = 0;
        else
            this.fightPoints = fightPoints;
        
        if(weapon != null)
            this.weapon = weapon;
        else 
            this.weapon = null;
        this.player = player;
    }

    static add(character) {
        var sql =
            "Insert into rpgdb.character (CharacterName, Species, AttackPoints, DefencePoints, Level, FightPoints, CharacterImage, CharacterCreationDate, User_UserId, Weapon_WeaponId) " +
            "values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
        
        var weaponId = null;
        if(character.weapon != null)
            weaponId = character.weapon.id;
        return new Promise((resolve, reject) => {
           db.query(sql, [character.characterName, character.species, character.attackPoints, character.defencePoints, character.level, character.fightPoints, character.characterImage, character.creationDate, character.player, weaponId], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    static delete(characterId) {
        var sql = "DELETE FROM rpgdb.character WHERE characterId = ?;";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[characterId], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    
    static getAllCharacters() {
        var sql = "SELECT * FROM rpgdb.character;";
        
        return new Promise((resolve, reject) => {
            db.query(sql,(err, rows) => {
                if (err)
                    return reject(err);
                var charactersList = [];
                var arr = rows;
                for (var i = 0; i < rows.length; i++){
                  var obj = arr[i];
                    var character = null;
                  for (var key in obj){
                    character = new Character(obj["CharacterName"], obj["Species"], obj["AttackPoints"], obj["DefencePoints"], obj["CharacterImage"], obj["CharacterCreationDate"], obj["Weapon_WeaponId"], obj["User_UserId"], obj["CharacterId"], obj["Level"], obj["FightPoints"]);
                  }
                    charactersList.push(character);
                }
                resolve(charactersList);
            });
        });
    }

    static getCharacter(characterId) {
        var sql = "SELECT * FROM rpgdb.character WHERE characterId = ?;";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[characterId], (err, rows) => {
                if (err)
                    return reject(err);
                var character = null;
                var obj = rows[0];
                var character = new Character(obj["CharacterName"], obj["Species"], obj["AttackPoints"], obj["DefencePoints"], obj["CharacterImage"], obj["CharacterCreationDate"], obj["Weapon_WeaponId"], obj["User_UserId"], obj["CharacterId"], obj["Level"], obj["FightPoints"]);
                resolve(character);
            });
        });
    }
    
    static edit(characterId, characterName, species, attackpoints, defencepoints, image, date, weapon) {
            
        var sql = "UPDATE rpgdb.character " + 
        "SET CharacterName = ?, Species = ?, AttackPoints = ?, DefencePoints = ?, CharacterImage =?, CharacterCreationDate = ?, Weapon_WeaponId = ? " +
        "WHERE characterId = ?;";
        
        var weaponId = null;
        if(weapon != null)
            weaponId = weapon.id;
        
        return new Promise((resolve, reject) => {
            db.query(sql,[characterName, species, attackpoints, defencepoints, image, date, weaponId, characterId], (err, rows) => {
                  if (err)
                     return reject(err);
                 resolve(rows);
            });
        })
    }
    
    static enemyList(playerId){
        var sql = "SELECT * FROM rpgdb.character WHERE User_UserId != ? OR isnull(User_UserId);";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[playerId],(err, rows) => {
                if (err)
                    return reject(err);
                var charactersList = [];
                var arr = rows;
                for (var i = 0; i < rows.length; i++){
                  var obj = arr[i];
                    var character = null;
                  for (var key in obj){
                    character = new Character(obj["CharacterName"], obj["Species"], obj["AttackPoints"], obj["DefencePoints"], obj["CharacterImage"], obj["CharacterCreationDate"], obj["Weapon_WeaponId"], obj["User_UserId"], obj["CharacterId"], obj["Level"], obj["FightPoints"]);
                  }
                    charactersList.push(character);
                }
                resolve(charactersList);
            });
        });
    }

    returnDate() {
        var d = this.creationDate.toISOString().slice(0, 10).split('-');
        return d[1] + '-' + d[2] + '-' + d[0];
    }
}

module.exports = Character;
