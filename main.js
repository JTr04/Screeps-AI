var roleHarvester = require('role.harvester');
var roleUpgradera = require('role.upgradera');
var roleBuilder = require('role.builder');
var roleTransfer = require('role.transfer');
var LinkandTower = require('LinkandTower');
// var roleClaim = require('role.claim');
var roleBuildera = require('role.buildera');
var roleNewHarvester= require('role.newharvester');
var roleS2t = require('role.s2t');
var roleAttacker = require('role.attack');
var newTransfer = require('role.newtransfer')

var tt = require('tt');

var maxCreep = require('role.maxcreep');

var powerCreepAction = require('powerCreepAction');

var Mhar = require('Mhar');
var remote = require('Power');
// var lookForSource = require('lookForSource');
var claimNewRoom = require('claimNewRoom');
var labWorkAction = require('labWorkAction');
var roleOutSource = require('roleOutSource');

var SpawnFunction = require('Spawn');
var Link = require('Link');
var roleTower = require('role.tower');
var newSpawn = require('newSpawm');
var factory = require('factory');
var marketAction = require('market');
var terminalWorkAction = require('terminalWorkAction');
var defensive = require('defensive');
var ObserverAction = require('ObserverAction');

var memoryFunction = require('memory');

require('console')
 
module.exports.loop = function () {
    
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory :', name);
        }
    }
    
    // remote.run();
    // if(Game.rooms.length !=3){
        // claimNewRoom.run('Spawn3','E43N42');
    // }
    // lookForSource.run();
    memoryFunction.run();
    
    defensive.run();
    
    powerCreepAction.run();
    
    var num;
    var spawnList ;
    var creepList ;
    var roomList = ['E59N31','E59N39','E51N41','E46N43','E49N38','E43N42'];
    var roomCreepsType ;
    for (var r in roomList){
    	for(var i in Memory.roomResource){
    		if(Memory.roomResource[i].roomName == roomList[r]){
    			spawnList = Memory.roomResource[i].roomSpawn;
    			for (var s in spawnList){
    			    if(!spawnList[s])return
    				num = Memory.roomResource[i].spawnResourceIndex;
    				roomCreepsType = Game.spawns[spawnList[s]].room.controller.level;
    				creepList = Memory.creepsList[roomCreepsType];
    				if(roomCreepsType >= 7){
    				    SpawnFunction.run(spawnList[s],num,creepList);
    				}else{
    				    newSpawn.run(spawnList[s],num,creepList);
    				}
    				if(roomCreepsType > 4){
    				    Link.run(num);
    				}
    				
    			}
    		}
    	}
    }
    // console.log(Memory.memorySource[1].link1)
    
    Mhar.run();
    //labWorkAction.run();
    
    // maxCreep.run(false)
    
    // roleOutSource.run('E51N39','5bbcb00c9099fc012e63b84f',false,false)
    
    // factory.run()
    
    // marketAction.run();
    
    // terminalWorkAction.run();
    
    // ObserverAction.run();
    
    roleTower.run();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            // num = 
            roleHarvester.run(creep);
            // console.log(num);
        }
        if(creep.memory.role == 'upgradera'){
            roleUpgradera.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'transfer') {
            roleTransfer.run(creep);
        }
        if(creep.memory.role == 'linkandtower'){
            LinkandTower.run(creep);
        }
        // if(creep.memory.role == 'claim'){
        //     roleClaim.run(creep);
        // }
        if(creep.memory.role == 'buildera'){
            roleBuildera.run(creep);
        }
        if(creep.memory.role == 'newharvester') {
            roleNewHarvester.run(creep);
        }
        if(creep.memory.role == 's2t') {
            roleS2t.run(creep);
        }
        if(creep.memory.role == 'attack'){
            roleAttacker.run(creep);
        }
        if(creep.memory.role == 'tt'){
            tt.run(creep);
        }
        if(creep.memory.role == 'newtransfer') {
            newTransfer.run(creep);
        }
    }

// 	var towerList = _.filter(Game.structures, s =>s.structureType == STRUCTURE_TOWER);

	    
// 	for(var tower of towerList){
// 		roleTower.run(tower);
// 	}




}