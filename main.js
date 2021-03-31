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


var maxCreep = require('role.maxcreep');

var powerCreepAction = require('powerCreepAction');

var Mhar = require('Mhar');
var claimNewRoom = require('claimNewRoom');
var roleOutSource = require('roleOutSource');
var group = require('group');

var SpawnFunction = require('Spawn');
var Link = require('Link');
var roleTower = require('role.tower');
var newSpawn = require('newSpawm');
var terminalWorkAction = require('terminalWorkAction');
var factory = require('factory');
var labWorkAction = require('labWorkAction');

var defensive = require('defensive');

var memoryFunction = require('memory');

var overShard = require('overShard');

require('console')
 
module.exports.loop = function () {
    
    if(Game.shard.name == 'shard3'){
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory :', name);
            }
        }
        
        // remote.run();
        // if(Game.rooms.length !=3){
            // claimNewRoom.run('Spawn1','W39N6');
        // }
        // lookForSource.run();
        memoryFunction.run();
        
        // defensive.run();
        
        // powerCreepAction.run();
        group.run()
        
        var num;
        var spawnList ;
        var creepList ;
        var roomList = ['W36N9','W39N6'];
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
        
        // Mhar.run();
        // labWorkAction.run();
        
        maxCreep.run()
        
        // roleOutSource.run('E48N41','59f1a63a82100e1594f3fc0a',false,false,1)
        
        // factory.run()
        
        // marketAction.run();
        
        // terminalWorkAction.run();
        
        // ObserverAction.run();
        
        roleTower.run();
        overShard.run();
        roleAttacker.run();
    }
    

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
        // if(creep.memory.role == 'tt'){
        //     tt.run(creep);
        // }
        if(creep.memory.role == 'ov') {
            overShard.run(creep);
        }
    }

// 	var towerList = _.filter(Game.structures, s =>s.structureType == STRUCTURE_TOWER);

	    
// 	for(var tower of towerList){
// 		roleTower.run(tower);
// 	}




}