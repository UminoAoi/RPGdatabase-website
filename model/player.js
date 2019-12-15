let nextId = 1;
var loggedPlayer;
const playerList = [];

const Character = require('../model/character');
const Weapon = require('../model/weapon');
const World = require('../model/world');

class Player {
    constructor(userName, password, email, id) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.rank = 1;
        this.registrationDate = new Date();
        this.characterList = [];
        this.weaponList = [];
        this.worldList = [];
        this.fights = [];
        this.monsterFights = [];

        Player.add(this);
        
        this.addCharacter(new Character("FirstCharacter", "human", 10, 10, "https://www.eldarya.pl/static/img/pet/icon/c3e90397c7eea26193f843341f7374db~1525252185.png", new Date(), this.id));
        Character.add(this.characterList[0]);
        this.addWeapon(new Weapon("CoolWeapon", 5, 5, this, this.weaponList.length));
        this.addWorld(new World("Amazing World of Coolness", 5, this, this.worldList.length));
        
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
                playerList[i].password == password) {
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

    getWeapons() {
        return this.weaponList;
    }

    addWorld(world) {
        this.worldList.push(world);
    }

    getWorlds() {
        return this.worldList;
    }
    
    addFight(fight){
        this.fights.push(fight);
    }
    
    addMonsterFight(fight){
        this.monsterFights.push(fight);
    }

    static initData() {

    }

}



Player.initData();

module.exports = Player;
