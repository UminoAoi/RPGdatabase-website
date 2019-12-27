const db = require('../db/mysql');
let nextId = 1;
const allCharactersList = [];

class Character {
    constructor(characterName, species, attackpoints, defencepoints, image, date, weapon, player, id) {
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
        this.level = 1;
        this.fightPoints = 0;
        if(weapon != null)
            this.weapon = weapon;
        else 
            this.weapon = null;
        this.player = player;
        Character.add(this);
    }

    static add(character) {
        character.id = nextId++;
        allCharactersList.push(character);
        return character;
    }

    static delete(characterId) {
         for (var i = 0; i < allCharactersList.length; i++) {
            if (allCharactersList[i].id == characterId) {
                allCharactersList.splice(i, 1);
                i--;
            }
        }
    }

    static edit(characterId, characterName, species, attackpoints, defencepoints, image, date, weapon) {
        var character = null;
        for (var i = 0; i < allCharactersList.length; i++) {
            if (allCharactersList[i].id == characterId) {
                character = allCharactersList[i];
            }
        }
        
        character.characterName = characterName;
        character.species = species;
        character.attackPoints = attackpoints;
        character.defencePoints = defencepoints;
        character.characterImage = image;
        if (date == undefined)
            character.creationDate = new Date();
        else
            character.creationDate = date;
        if(weapon != null)
            character.weapon = weapon;
        else 
            character.weapon = null;
    }

    static getCharacter(characterId) {
        var character = null;
        for (var i = 0; i < allCharactersList.length; i++) {
            if (allCharactersList[i].id == characterId) {
                return allCharactersList[i]
            }
        }
        return character;
    }
    
    static enemyList(player){
        var enemyList = [];
        for (var i = 0; i < allCharactersList.length; i++) {
            if (allCharactersList[i].player == null || allCharactersList[i].player != player.id) {
                enemyList.push(allCharactersList[i]);
            }
        }
        return enemyList;
    }

    returnDate() {
        var d = this.creationDate.toISOString().slice(0, 10).split('-');
        return d[1] + '-' + d[2] + '-' + d[0];
    }
    
    static initData() {
        new Character("Spongebob", "cartoon", 15, 5, "https://vignette.wikia.nocookie.net/encyklopedia-spongebobia/images/c/cb/SpongeBob_SquarePants_Render.png/revision/latest?cb=20190606152207&path-prefix=pl", new Date(), null);
        new Character("Cute Robot", "robot", 20, 0, "https://photonrobot.com/wp-content/uploads/photon-render-%E2%80%94-kopia.png", new Date(), null);
        new Character("Dexter", "human", 5, 15, "http://19wnx83qh5jk1qlxu63q22fj-wpengine.netdna-ssl.com/wp-content/uploads/2012/10/DEXTER-FROM-DEXTERS-LABORATORY.png", new Date(), null);
    }
}

Character.initData();

module.exports = Character;
