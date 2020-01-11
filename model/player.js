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
        Weapon.add(weapon).then(result =>{
            console.log(result);
        })
    }

    getWeapons() {
        var sql = "SELECT * FROM weapons WHERE User_UserId = ?";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[this.id], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
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
        var sql = "SELECT * FROM worlds WHERE User_UserId = ?";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[this.id], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    
    deleteWorld(worldId){
       World.delete(worldId).then(result => {
           console.log(result);
       })
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
