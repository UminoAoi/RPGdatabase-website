const db = require('../db/mysql');
let nextId = 1;
//const playerList = [];

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
        
        //this.characterList = [];
        //this.weaponList = [];
        //this.worldList = [];
        //this.fights = [];
        //this.monsterFights = [];

        
        //this.addCharacter(new Character("FirstCharacter", "human", 10, 10, "https://www.eldarya.pl/static/img/pet/icon/c3e90397c7eea26193f843341f7374db~1525252185.png", new Date(), null, this.id));
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
            "Insert into user (Username, Password, Email, UserRank, RegistrationDate, Nationality) " +
            "values (?, ?, ?, 1, CURDATE(), 'None');"

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
        character.add().then(result =>{
            console.log(result);
        })
    }

    getCharacters() {
        var sql = "SELECT * FROM rpgdb.character WHERE User_UserId = ?";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[this.id], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
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
        this.weaponList.push(weapon);
    }
    
    getWeapon(weaponId){
        var weapon = null;
        for (var i = 0; i < this.weaponList.length; i++) {
            if (this.weaponList[i].id >= weaponId) {
                weapon = this.weaponList[i];
            }
        }
        return weapon;
    }

    getWeapons() {
        return this.weaponList;
    }
    
    deleteWeapon(weaponId){
        for (var i = 0; i < this.weaponList.length; i++) {
            if (this.weaponList[i].id == weaponId) {
                this.weaponList.splice(i, 1);
                i--;
            }
        } 
    }

    addWorld(world) {
        this.worldList.push(world);
    }

    getWorlds() {
        return this.worldList;
    }
    
    deleteWorld(worldId){
       for (var i = 0; i < this.worldList.length; i++) {
            if (this.worldList[i].id == worldId) {
                this.worldList.splice(i, 1);
                i--;
            }
        } 
        World.delete(worldId);
    }
    
    addFight(fight){
        this.fights.push(fight);
    }
    
    deleteFight(fightId){
        for (var i = 0; i < this.fights.length; i++) {
            if (this.fights[i].id == fightId) {
                this.fights.splice(i, 1);
                i--;
            }
        } 
    }
    
    addMonsterFight(fight){
        this.monsterFights.push(fight);
    }
}

module.exports = Player;
