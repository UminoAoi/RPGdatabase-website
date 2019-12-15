let nextId = 1;
const allWorldList = [];

class World {
    constructor(worldName, difficulty, player, id) {
        this.id = id;
        this.worldName = worldName;
        this.difficulty = difficulty;
        this.fightsNumber = 0;
        this.favourites = 0;
        this.creationDate = new Date();
        this.player = player;
        World.add(this);
    }
    
    static add(world){
        world.id = nextId++;
        allWorldList.push(world);
        return world;
    }
    
    edit(character){
        
    }
}

module.exports = World;
