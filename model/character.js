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

        return new Promise((resolve, reject) => {
            db.query(sql, [character.characterName, character.species, character.attackPoints, character.defencePoints, character.level, character.fightPoints, character.characterImage, character.creationDate, character.player, character.weapon], (err, rows) => {
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
                resolve(rows);
            });
        });
    }

    static getCharacterJSON(characterId) {
        var sql = "SELECT * FROM rpgdb.character WHERE characterId = ?;";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[characterId], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    
    static getCharacter(characterId) {
        var character = null;
        Character.getCharacterJSON(characterId).then(result => {
            var obj = result[0];
            var character = new Character(obj["CharacterName"], obj["Species"], obj["AttackPoints"], obj["DefencePoints"], obj["CharacterImage"], obj["CharacterCreationDate"], obj["Weapon_WeaponId"], obj["User_UserId"], obj["CharacterId"], obj["Level"], obj["FightPoints"]);
            return character;
        });
    }
    
    static edit(characterId, characterName, species, attackpoints, defencepoints, image, date, weapon) {
            
        var sql = "UPDATE rpgdb.character " + 
        "SET CharacterName = ?, Species = ?, AttackPoints = ?, DefencePoints = ?, CharacterImage =?, CharacterCreationDate = ?, Weapon_WeaponId = ? " +
        "WHERE characterId = ?;";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[characterName, species, attackpoints, defencepoints, image, date, weapon, characterId], (err, rows) => {
                  if (err)
                     return reject(err);
                 resolve(rows);
            });
        })
    }
    
    static enemyList(player){
        
        Character.getAllCharacters().then(result => {
            var charactersList = result;
            
            var enemyList = []; //OGARNĄĆ CZY DZIAŁA (BO COŚ TAM Z JSONEM)
            
            for (var i = 0; i < charactersList.length; i++) {
                if (charactersList[i].player == null || charactersList[i].player != player.id) {
                    enemyList.push(charactersList[i]);
                }
            }
            return enemyList;
        });
    }

    returnDate() {
        var d = this.creationDate.toISOString().slice(0, 10).split('-');
        return d[1] + '-' + d[2] + '-' + d[0];
    }
}

module.exports = Character;
