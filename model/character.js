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
    }

    static add(character) {
        character.id = nextId++;
        allCharactersList.push(character);
        return character;
    }

    static delete() {

    }

    edit(character) {

    }
}

module.exports = Character;
