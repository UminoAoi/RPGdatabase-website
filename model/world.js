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
    
    static edit(worldId, worldName, difficulty){
        var world = null;
        for (var i = 0; i < allWorldList.length; i++) {
            if (allWorldList[i].id == worldId) {
                world = allWorldList[i];
            }
        }
        
        world.worldName = worldName;
        world.difficulty = difficulty;
    }
    
    static getWorld(worldId) {
        var world = null;
        for (var i = 0; i < allWorldList.length; i++) {
            if (allWorldList[i].id == worldId) {
                return allWorldList[i]
            }
        }
        return world;
    }
    
    static getWorlds(){
        return allWorldList;
    }
    
    like(){
        this.favourites += 1;
    }
    
}

module.exports = World;
