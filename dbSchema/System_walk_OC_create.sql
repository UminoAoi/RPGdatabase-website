-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2020-01-11 21:33:04.471

-- tables
-- Table: Character
CREATE TABLE `Character` (
    CharacterId int NOT NULL AUTO_INCREMENT,
    CharacterName varchar(30) NOT NULL,
    Species varchar(30) NOT NULL,
    AttackPoints int NOT NULL,
    DefencePoints int NOT NULL,
    Level int NOT NULL,
    FightPoints double(2,2) NOT NULL,
    CharacterImage varchar(300) NOT NULL,
    CharacterCreationDate date NOT NULL,
    User_UserId int NULL,
    Weapon_WeaponId int NULL,
    CONSTRAINT Character_pk PRIMARY KEY (CharacterId)
);

-- Table: Fight
CREATE TABLE Fight (
    FightDate datetime NOT NULL,
    CharacterId_1 int NOT NULL,
    CharacteId_2 int NOT NULL,
    WorldId int NOT NULL,
    Result varchar(10) NOT NULL,
    CONSTRAINT Fight_pk PRIMARY KEY (FightDate,CharacterId_1,CharacteId_2)
);

-- Table: Monster
CREATE TABLE Monster (
    MonsterId int NOT NULL AUTO_INCREMENT,
    MonsterName varchar(30) NOT NULL,
    AttackPoints int NOT NULL,
    DefencePoints int NOT NULL,
    MonsterImage varchar(300) NOT NULL,
    Level int NOT NULL,
    MonsterCreationDate date NOT NULL,
    CONSTRAINT Monster_pk PRIMARY KEY (MonsterId)
);

-- Table: MonsterFight
CREATE TABLE MonsterFight (
    MonsterId int NOT NULL,
    CharacterId int NOT NULL,
    CONSTRAINT MonsterFight_pk PRIMARY KEY (MonsterId,CharacterId)
);

-- Table: User
CREATE TABLE User (
    UserId int NOT NULL AUTO_INCREMENT,
    Username varchar(15) NOT NULL,
    Password varchar(15) NOT NULL,
    UserRank int NOT NULL,
    RegistrationDate date NOT NULL,
    Email varchar(30) NOT NULL,
    CONSTRAINT User_pk PRIMARY KEY (UserId)
);

-- Table: Weapon
CREATE TABLE Weapon (
    WeaponId int NOT NULL AUTO_INCREMENT,
    WeaponName varchar(20) NOT NULL,
    BonusAttackPoints int NOT NULL,
    BonusDefencePoints int NOT NULL,
    Level int NOT NULL,
    WeaponCreationDate date NOT NULL,
    User_UserId int NOT NULL,
    CONSTRAINT Weapon_pk PRIMARY KEY (WeaponId)
);

-- Table: World
CREATE TABLE World (
    WorldId int NOT NULL AUTO_INCREMENT,
    WorldName varchar(20) NOT NULL,
    Difficulty int NOT NULL,
    WorldCreationDate date NOT NULL,
    FightsNumber int NOT NULL,
    Favourites int NOT NULL,
    User_UserId int NOT NULL,
    CONSTRAINT World_pk PRIMARY KEY (WorldId)
);

-- foreign keys
-- Reference: Character_User (table: Character)
ALTER TABLE `Character` ADD CONSTRAINT Character_User FOREIGN KEY Character_User (User_UserId)
    REFERENCES User (UserId);

-- Reference: Character_Weapon (table: Character)
ALTER TABLE `Character` ADD CONSTRAINT Character_Weapon FOREIGN KEY Character_Weapon (Weapon_WeaponId)
    REFERENCES Weapon (WeaponId);

-- Reference: Fight_Character1 (table: Fight)
ALTER TABLE Fight ADD CONSTRAINT Fight_Character1 FOREIGN KEY Fight_Character1 (CharacterId_1)
    REFERENCES `Character` (CharacterId);

-- Reference: Fight_Character2 (table: Fight)
ALTER TABLE Fight ADD CONSTRAINT Fight_Character2 FOREIGN KEY Fight_Character2 (CharacteId_2)
    REFERENCES `Character` (CharacterId);

-- Reference: Fight_World (table: Fight)
ALTER TABLE Fight ADD CONSTRAINT Fight_World FOREIGN KEY Fight_World (WorldId)
    REFERENCES World (WorldId);

-- Reference: MonsterFight_Character (table: MonsterFight)
ALTER TABLE MonsterFight ADD CONSTRAINT MonsterFight_Character FOREIGN KEY MonsterFight_Character (CharacterId)
    REFERENCES `Character` (CharacterId);

-- Reference: MonsterFight_Monster (table: MonsterFight)
ALTER TABLE MonsterFight ADD CONSTRAINT MonsterFight_Monster FOREIGN KEY MonsterFight_Monster (MonsterId)
    REFERENCES Monster (MonsterId);

-- Reference: Weapon_User (table: Weapon)
ALTER TABLE Weapon ADD CONSTRAINT Weapon_User FOREIGN KEY Weapon_User (User_UserId)
    REFERENCES User (UserId);

-- Reference: World_User (table: World)
ALTER TABLE World ADD CONSTRAINT World_User FOREIGN KEY World_User (User_UserId)
    REFERENCES User (UserId);
	
		
Insert into user (Username, Password, Email, UserRank, RegistrationDate)
values ("Test123", "password", "aa123@pl.pl", 1, CURDATE());
	
Insert into rpgdb.character (CharacterName, Species, AttackPoints, DefencePoints, Level, FightPoints, CharacterImage, CharacterCreationDate, User_UserId, Weapon_WeaponId)
values ("Spongebob", "cartoon", 15, 5, 1, 0, "https://vignette.wikia.nocookie.net/encyklopedia-spongebobia/images/c/cb/SpongeBob_SquarePants_Render.png/revision/latest?cb=20190606152207&path-prefix=pl", CURDATE(), 1, null);

Insert into rpgdb.character (CharacterName, Species, AttackPoints, DefencePoints, Level, FightPoints, CharacterImage, CharacterCreationDate, User_UserId, Weapon_WeaponId)
values ("Cute Robot", "robot", 20, 0, 1, 0,"https://photonrobot.com/wp-content/uploads/photon-render-%E2%80%94-kopia.png", CURDATE(), null, null);

Insert into rpgdb.character (CharacterName, Species, AttackPoints, DefencePoints, Level, FightPoints, CharacterImage, CharacterCreationDate, User_UserId, Weapon_WeaponId)
values ("Dexter", "human", 5, 15, 1,0, "http://19wnx83qh5jk1qlxu63q22fj-wpengine.netdna-ssl.com/wp-content/uploads/2012/10/DEXTER-FROM-DEXTERS-LABORATORY.png", CURDATE(), null, null);

Insert into monster (MonsterName, AttackPoints, DefencePoints, MonsterImage, Level, MonsterCreationDate) 
values ("MarioMonster", 20, 20, "https://www.electronicbeats.net/app/uploads/sites/5/2018/02/mario.png", 3, CURDATE());

-- End of file.

