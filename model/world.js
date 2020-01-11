const db = require('../db/mysql');
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
    }
    
    static add(world){
        var sql =
            "Insert into world (WorldName, Difficulty, WorldCreationDate, FightsNumber, Favourites, User_UserId) " +
            "values (?,?,?,?,?,?)"

        return new Promise((resolve, reject) => {
            db.query(sql, [world.worldName, world.difficulty, world.creationDate, world.fightsNumber, world.favourites, world.player], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    
    static edit(worldId, worldName, difficulty){
        var sql = "UPDATE world " + 
        "SET WorldName = ?, Defficulty = ? " +
        "WHERE worldId = ?;";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[worldName, difficulty, worldId], (err, rows) => {
                  if (err)
                     return reject(err);
                 resolve(rows);
            });
        })
    }
    
    static getWorld(worldId) {
        var sql = "SELECT * FROM world WHERE worldId = ?;";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[worldId], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    
    static getWorlds(){
        var sql = "SELECT * FROM world;";
        
        return new Promise((resolve, reject) => {
            db.query(sql,(err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    
    like(){
        this.favourites += 1;
    }
    
    static delete(worldId) {
         var sql = "DELETE FROM world WHERE worldId = ?;";
        
        return new Promise((resolve, reject) => {
            db.query(sql,[worldId], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    
}

module.exports = World;
