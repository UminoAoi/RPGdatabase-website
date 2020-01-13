const db = require('../db/mysql');

const bcrypt = require('bcryptjs');

const Character = require('../model/character');
const Weapon = require('../model/weapon');
const World = require('../model/world');

class Player {
    constructor(userName, password, email, id, rank, date) {
        this.id = id;
        this.userName = userName;
        Player.hashPassword(password) // NIE DZIAŁA CZEMU?? UNDEFINED, W BAZIE DANYCH NULL
          .then(hash => {
            //this.password = password; NIE DZIAŁA???
          })
          .catch(err => {
            console.log(err);
          });
        this.password = password;
        this.email = email;
        if(rank == null)
            this.rank = 1;
        else
            this.rank = rank;
        
        if(date == null)
            this.registrationDate = new Date();
        else
            this.registrationDate = date;

        //this.addWeapon(new Weapon("CoolWeapon", 5, 5, this.id));
        //this.addWorld(new World("Amazing World of Coolness", 5, this.id));
    }
    
    static makePlayerFrom(form){
        return new Player(form.userName, form.password, form.email, form.id, form.rank, form.date);
    }
    
    static hashPassword(password) {
      //wołanie asynchroniczne
      //zwraca promesę, a nie wynik bezpośrednio
      return bcrypt.hash(password, 12);
    }
    
    comparePassword(password) {
      //wołanie asynchroniczne
      //zwraca promesę, a nie wynik bezpośrednio
      return bcrypt.compare(password, this.password);
    }

    add() {
        var sql =
            "Insert into user (Username, Password, Email, UserRank, RegistrationDate) " +
            "values (?, ?, ?, 1, CURDATE());"

        return new Promise((resolve, reject) => {
            db.query(sql, [this.userName, this.password, this.email], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    static getList() {
        var sql =
            "SELECT * FROM user";
        return new Promise((resolve, reject) => {
            db.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    static getPlayer(id) {
        var sql = "SELECT * FROM user WHERE UserId = ?";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[id], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    static checkAndGetPlayer(userName, password) {
        var sql = "SELECT * FROM user WHERE UserName = ? && Password = ?";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[userName, password], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    addCharacter(character) {
        Character.add(character).then(result =>{
            console.log(result);
        })
    }

    getCharacters() {
        var sql = "SELECT * FROM rpgdb.character WHERE User_UserId = ?";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[this.id], (err, rows) => {
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
    
    deleteCharacter(characterId){
       Character.delete(characterId).then(result => {
           console.log(result);
       })
    }

    getStrongestCharacter() {
        var sql = "select CharacterName from rpgdb.character " +
            "where User_UserId = ? " +
            "group by level " +
            "having level = (select max(level) from rpgdb.character);";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[this.id], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    addWeapon(weapon) {
        Weapon.add(weapon).then(result =>{
            console.log(result);
        })
    }
    
    getWeapons(){
        var sql = "SELECT * FROM weapon WHERE User_UserId = ?";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[this.id], (err, rows) => {
                if (err)
                    return reject(err);
                var weaponsList = [];
                var arr = rows;
                var weapon = null;
                for (var i = 0; i < rows.length; i++){
                  var obj = arr[i];
                  for (var key in obj){
                    weapon = new Weapon(obj["WeaponName"], obj["BonusAttackPoints"], obj["BonusDefencePoints"], obj["User_UserId"], obj["WeaponId"], obj["Level"], obj["WeaponCreationDate"]);
                    
                  }
                    weaponsList.push(weapon);
                }
                    resolve(weaponsList);
                });
        });
    }
    
    deleteWeapon(weaponId){
        Weapon.delete(weaponId).then(result => {
           console.log(result);
       })
    }

    addWorld(world) {
         World.add(world).then(result =>{
            console.log(result);
        })
    }

    getWorlds() {
        var sql = "SELECT * FROM world WHERE User_UserId = ?";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[this.id], (err, rows) => {
                if (err)
                    return reject(err);
                var worldsList = [];
                var arr = rows;
                for (var i = 0; i < rows.length; i++){
                  var obj = arr[i];
                    var world = null;
                  for (var key in obj){
                    world = new World(obj["WorldName"], obj["Difficulty"], obj["User_UserId"], obj["WorldId"], obj["FightsNumber"], obj["Favourites"], obj["WorldCreationDate"]);
                  }
                    worldsList.push(world);
                }
                    resolve(worldsList);
                });
        });
    }
    
    deleteWorld(worldId){
       World.delete(worldId).then(result => {
           console.log(result);
       })
    }
    
    getEnemyFights() {
        var sql = "SELECT a.FightDate, a.CharacterId_1, a.CharacteId_2, a.WorldId, a.Result " +
            "FROM fight a " +
            "join rpgdb.character b on a.CharacterId_1 = b.CharacterId " +
            "join user c on b.User_UserId = c.UserId " +
            "where c.UserId = ?;";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[this.id], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    
    getMonsterFights() {
        var sql = "SELECT a.MonsterId, a.CharacterId " +
            "FROM monsterfight a " +
            "join rpgdb.character b on a.CharacterId = b.CharacterId " +
            "join user c on b.User_UserId = c.UserId " +
            "where c.UserId = ?;";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[this.id], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    
    addFight(fight){
        Fight.add(fight).then(result =>{
            console.log(result);
        })
    }
    
    deleteFight(date, you, enemy){
        Fight.delete(date, you, enemy).then(result => {
           console.log(result);
       })
    }
    
    addMonsterFight(fight){
        MonsterFight.add(fight).then(result =>{
            console.log(result);
        })
    }
}

module.exports = Player;
