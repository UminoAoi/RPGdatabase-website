let nextId = 1;

class Weapon {
    constructor(weaponName, bonusattack, bonusdefence, player, id) {
        this.id = id;
        this.weaponName = weaponName;
        this.bonusAttack = bonusattack;
        this.bonusDefence = bonusdefence;
        this.level = 1;
        this.creationDate = new Date();
        this.player = player;
    }

    edit(weapon) {

    }
}

module.exports = Weapon;
