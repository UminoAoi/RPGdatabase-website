class Fight {
    constructor(character1, character2, world, result) {
        this.you = character1;
        this.enemy = character2;
        this.world = world;
        this.result = result;
        this.fightDate = new Date();
    }
}

module.exports = Fight;
