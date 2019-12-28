//PROBLEM Z HASHOWANIEM HASEŁ, PRZYPISYWANIEM ID Z BAZY DANYCH, ZWRACANIEM WYNIKU DZIAŁAŃ Z BAZY DANYCH

const db = require('../db/mysql');
let nextId = 1;
//const playerList = [];

const bcrypt = require('bcryptjs');

const Character = require('../model/character');
const Weapon = require('../model/weapon');
const World = require('../model/world');

class Player {
    constructor(userName, password, email, id) {
        this.id = id;
        this.userName = userName;
        Player.hashPassword(password) // NIE DZIAŁA CZEMU?? UNDEFINED, W BAZIE DANYCH NULL
          .then(hash => {
            //this.password = password;
          })
          .catch(err => {
            console.log(err);
          });
        this.password = password;
        this.email = email;
        this.rank = 1;
        this.registrationDate = new Date();
        this.characterList = [];
        this.weaponList = [];
        this.worldList = [];
        this.fights = [];
        this.monsterFights = [];

        this.id = this.add(); //.then(data => this id = data), zwracanie promise, NIC NIE DZIAŁA???
        
        //this.addCharacter(new Character("FirstCharacter", "human", 10, 10, "https://www.eldarya.pl/static/img/pet/icon/c3e90397c7eea26193f843341f7374db~1525252185.png", new Date(), null, this.id));
        //this.addWeapon(new Weapon("CoolWeapon", 5, 5, this.id));
        //this.addWorld(new World("Amazing World of Coolness", 5, this.id));
        
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

    async add() {
        //player.id = nextId++;
        //playerList.push(player);
        //return player;
        
        var result = null;
        var r = null;
        
        var sql = "SELECT @id := COUNT(*)+1 id FROM user; " +
            "Insert into user (UserId, Username, Password, Email, UserRank, RegistrationDate, Nationality) " +
            "values (@id, ?, ?, ?, 1, CURDATE(), 'None');" 
        await db.query(sql,[this.userName, this.password, this.email], (err, rows, fields) => {
            if(err)
                console.log(err);
            else{
                console.log("Added player.");
                var objectValue = JSON.stringify(rows[0][0]);
                var id = JSON.parse(objectValue).id;
                r = id;
            }
        });
        result = await r;
        return result;
    }

    static getList() {
        return playerList;
    }

    static getPlayer(id) {
        var sql = "SELECT * FROM user WHERE UserId = " + id;
        db.query(sql,[id], (err, rows, fields) => {
            if(err)
                console.log(err);
            else
                console.log(rows);
        });
        return null;
    }

    static checkAndGetPlayer(userName, password) {
        var player = null;
        for (var i = 0; i < playerList.length; i++) {
            if (playerList[i].userName == userName) {
                player = playerList[i];
                player.comparePassword(password).then(result => {
                    if(result)
                        return player;
                    });
            }
            player = null;
        }        
        return player;
    }

    addCharacter(character) {
        this.characterList.push(character);
    }

    getCharacters() {
        return this.characterList;
    }
    
    deleteCharacter(characterId){
       for (var i = 0; i < this.characterList.length; i++) {
            if (this.characterList[i].id == characterId) {
                this.characterList.splice(i, 1);
                i--;
            }
        } 
        Character.delete(characterId);
    }

    getStrongestCharacter() {
        var char = null;
        var level = 0;
        for (var i = 0; i < this.characterList.length; i++) {
            if (this.characterList[i].level >= level) {
                char = this.characterList[i].characterName;
            }
        }
        return char;
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

    static initData() {

    }

}



Player.initData();

module.exports = Player;
