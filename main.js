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

var maxCreep = require('role.maxcreep');

var Mhar = require('Mhar');
var remote = require('Power');
var lookForSource = require('lookForSource');
var claimNewRoom = require('claimNewRoom');
var labWorkAction = require('labWorkAction');
var roleOutSource = require('roleOutSource');

var SpawnFunction = require('Spawn');
var Link = require('Link');
var roleTower = require('role.tower');
var newSpawn = require('newSpawm');
var factory = require('factory');
var marketAction = require('market');

var memoryFunction = require('memory');

require('console')
 
module.exports.loop = function () {
    
    //清除死掉的creep内存
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory :', name);
        }
    }
    
    // remote.run();
    // if(Game.rooms.length !=3){
        // claimNewRoom.run('Spawn3','E46N43');
    // }
    // lookForSource.run();
    //房间资源缓存（手动）
    memoryFunction.run();
    
    
    //日常生产
    var num;
    var spawnList ;
    var creepList ;
    var roomList = ['E59N31','E59N39','E51N41','E46N43'];
    var roomCreepsType ;
    for (var r in roomList){
    	for(var i in Memory.roomResource){
    		if(Memory.roomResource[i].roomName == roomList[r]){
    			spawnList = Memory.roomResource[i].roomSpawn;
    			for (var s in spawnList){
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
    
    //房间元素采集
    Mhar.run();
    
    //lab元素资源填充
    //labWorkAction.run();
    
    //Deposit过道资源采集
    maxCreep.run(false)
    
    
    
    // roleOutSource.run('E51N39','5bbcb00c9099fc012e63b84f',false)
    
    //工厂工作
    factory.run()
    
    //市场工作
    marketAction.run();

    //creep各司其职
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
        if(creep.memory.role == 'power'){
            // powerBank.run(creep);
        }
    }
  
  //tower的工作
	for(var t in Memory.towerList){
	    var tower = Game.getObjectById(Memory.towerList[t]);
	    roleTower.run(tower);
	}




}
