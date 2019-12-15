let nextId = 1;
const allCharactersList = [];

class Character {
    constructor(characterName, species, attackpoints, defencepoints, image, player, id) {
        this.id = id;
        this.characterName = characterName;
        this.species = species;
        this.attackPoints = attackpoints;
        this.defencePoints = defencepoints;
        this.characterImage = image;
        this.creationDate = new Date();
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

    static edit(characterId) {
        
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

    returnDate() {
        var d = this.creationDate.toISOString().slice(0, 10).split('-');
        return d[1] + '-' + d[2] + '-' + d[0];
    }
}

module.exports = Character;
