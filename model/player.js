let nextId = 1;
const playerList = [];

const bcrypt = require('bcryptjs');

const Character = require('../model/character');
const Weapon = require('../model/weapon');
const World = require('../model/world');

class Player {
    constructor(userName, password, email, id) {
        this.id = id;
        this.userName = userName;
        Player.hashPassword(password)
          .then(hash => {
            this.password = password;
          })
          .catch(err => {
            console.log(err);
          });
        this.email = email;
        this.rank = 1;
        this.registrationDate = new Date();
        this.characterList = [];
        this.weaponList = [];
        this.worldList = [];
        this.fights = [];
        this.monsterFights = [];

        Player.add(this);
        
        this.addCharacter(new Character("FirstCharacter", "human", 10, 10, "https://www.eldarya.pl/static/img/pet/icon/c3e90397c7eea26193f843341f7374db~1525252185.png", new Date(), null, this.id));
        this.addWeapon(new Weapon("CoolWeapon", 5, 5, this.id));
        this.addWorld(new World("Amazing World of Coolness", 5, this.id));
        
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

    static add(player) {
        player.id = nextId++;
        playerList.push(player);
        return player;
    }

    static getList() {
        return playerList;
    }

    static getPlayer(id) {
        for (var i = 0; i < playerList.length; i++) {
            if (playerList[i].id == id) {
                return playerList[i];
            }
        }
        return null;
    }

    static checkAndGetPlayer(userName, password) {
        var player = null;
        for (var i = 0; i < playerList.length; i++) {
            if (playerList[i].userName == userName &&
                playerList[i].comparePassword(password)) {
                player = playerList[i];
                return player;
            }
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
