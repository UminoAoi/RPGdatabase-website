let nextId = 1;

class World {
    constructor(worldName, difficulty, player, id) {
        this.id = id;
        this.worldName = worldName;
        this.difficulty = difficulty;
        this.fightsNumber = 0;
        this.favourites = 0;
        this.creationDate = new Date();
        this.player = player;
    }
    
    edit(character){
        
    }
}

module.exports = World;
