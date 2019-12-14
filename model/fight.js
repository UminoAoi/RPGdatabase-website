class Fight {
    constructor(character1, character2, world, result) {
        this.character1 = character1;
        this.character2 = character2;
        this.world = world;
        this.result = result;
        this.fightDate = new Date();
    }
}

module.exports = Fight;
