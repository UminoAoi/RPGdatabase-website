let nextId = 1;
const allCharactersList = [];

class Character {
    constructor(characterName, species, attackpoints, defencepoints, image, date, player, id) {
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
        this.player = player;
        this.weapon = null;
        Character.add(this);
    }

    static add(character) {
        character.id = nextId++;
        allCharactersList.push(character);
        return character;
    }

    static delete(characterId) {

    }

    static edit(characterId, characterName, species, attackpoints, defencepoints, image, date) {
        var character = null;
        for (var i = 0; i < allCharactersList.length; i++) {
            if (allCharactersList[i].id == characterId) {
                character = allCharactersList[i]
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
        character.weapon = null;
    }

    static getCharacter(characterId) {
        for (var i = 0; i < allCharactersList.length; i++) {
            if (allCharactersList[i].id == characterId) {
                return allCharactersList[i]
            }
        }
        return character;
    }

    returnDate() {
        var d = this.creationDate.toISOString().slice(0, 10).split('-');
        return d[1] + '-' + d[2] + '-' + d[0];
    }
}

module.exports = Character;
