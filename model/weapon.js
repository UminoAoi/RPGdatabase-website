let nextId = 1;

class Weapon {
    constructor(weaponName, bonusattack, bonusdefence, player) {
        this.id = nextId++;
        this.weaponName = weaponName;
        this.bonusAttack = bonusattack;
        this.bonusDefence = bonusdefence;
        this.level = 1;
        this.creationDate = new Date();
        this.player = player;
    }

    static edit(weaponId, weaponName, bonusattack, bonusdefence, weapons) {
        var weapon = null;
        
        for (var i = 0; i < weapons.length; i++) {
            if (weapons[i].id == weaponId) {
                weapon = weapons[i];
            }
        }
        
        weapon.weaponName = weaponName;
        weapon.bonusAttack = bonusattack;
        weapon.bonusDefence = bonusdefence;
    }
}

module.exports = Weapon;
