let nextId = 1;
const allWorldList = [];

class World {
    constructor(worldName, difficulty, player) {
        this.id = null;
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
    
    static delete(worldId) {
         for (var i = 0; i < allWorldList.length; i++) {
            if (allWorldList[i].id == worldId) {
                allWorldList.splice(i, 1);
                i--;
            }
        }
    }
    
}

module.exports = World;
