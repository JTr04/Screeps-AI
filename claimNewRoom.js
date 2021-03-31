var roleBuilder = require('role.builder');
var roleBuildera = require('role.buildera');
var moveToTarget = require('moveToTarget');
var claimNewRoom = {
	run : function(spawnName , roomName){
	    
		if(!Game.rooms[roomName]){
		  //  if(Game.time % 4000)return
		    isCreepExist('see',roomName,spawnName)
		}
		if(Game.rooms[roomName]){
		    if(Game.rooms[roomName].controller.level < 5 && Game.rooms[roomName].controller.owner.username == 'verp_T'){
                if(controllerFindConstructionSites(roomName)){
    			    isCreepExist('newbuilder',roomName,spawnName)
    				isCreepExist('newbuildera',roomName,spawnName)
    			
    			}
            }
		}
		
		
		for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'see'){
                if(creep.room.name != roomName){
                    moveToTarget.run(creep)
                }else{
					var c = creep.room.controller
					if(creep.signController(c,'it will be claimed by verp_T')== ERR_NOT_IN_RANGE) {
							creep.moveTo(c);
					}
					if(roomMsg(roomName,creep)){
						isCreepExist('newattack',roomName,spawnName)
					}else{
						if(Game.rooms[roomName] && Game.rooms[roomName].controller.level == 0){
							isCreepExist('claim',roomName,spawnName)
						}
						
					}
                }
                
            }
            if(creep.memory.role == 'newattack'){
            	newRoomFunctionAndCreep(roomName,creep)
            }
            if(creep.memory.role == 'claim'){
            	claimRoom(roomName,creep)
            }
            if(creep.memory.role == 'newbuilder'){
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'newbuildera'){
            	roleBuildera.run(creep);
            }
		}
		
	}
}
module.exports = claimNewRoom;

/*
 *筛选相应的creep
 *return creep
 */
function isCreepExist(role,roomName,spawnName){
	if((_.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.room == roomName)) == 0){
        generateCreep(role,roomName,spawnName);
        console.log(spawnName+' Spawning new '+roomName +' :'+role);
    }
}

/*
 *生产相应的creep
 */
function generateCreep(role,roomName,spawnName){
	var claimcreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.room == roomName)
    if(role == 'claim' && claimcreeps.length < 1 ){
		Game.spawns[spawnName].spawnCreep([MOVE,CLAIM], role, 
            {memory: {role: role, room: roomName}});
    }else if(role == 'see' && claimcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([MOVE,MOVE], 
			role, {memory: {role: role, room: roomName}});
    }else if(role == 'newattack' && claimcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 
			role, {memory: {role: role, room: roomName}});
    }else if(role == 'newbuilder' && claimcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 
			role, {memory: {role: role, room: roomName}});
    }else if(role == 'newbuildera' && claimcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 
			role, {memory: {role: role, room: roomName}});
    }else{
		console.log('【没有role的类型】');
    }

}


/*
 *查看新房中的建筑与creep情况
 */
function newRoomFunctionAndCreep(roomName,creep){

    // console.log(creep.name)
    
	if(creep.room.name != roomName){
        moveToTarget.run(creep)
        
        return;
    }
        
	const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
	if(targets.length > 0) {
		creep.rangedAttack(targets[0]);
	}
	
	var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS)
	if(!target){
		target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES
//             ,{
// 				filter: (structure) => 
// 					(structure.structureType == STRUCTURE_SPAWN ||
// 					structure.structureType == STRUCTURE_TOWER
// 				    || structure.structureType == STRUCTURE_EXTENSION
// 					)
			
// 			}
		)
	}
	if(target){
		if(!creep.pos.isNearTo(target)){
			creep.moveTo(target);
		}else{
			creep.attack(target)
		}
		if(creep.pos.inRangeTo(target, 3)) {
			creep.rangedAttack(target);
		}
	}else{
			// creep.attackController(creep.room.controller);
		if(creep.signController(creep.room.controller,'目标：星辰 大海 cliamed by verp_T') == ERR_NOT_IN_RANGE){
			creep.moveTo(creep.room.controller);
		}
	}
}

/*
 *占领相应的房子
 */
function claimRoom(roomName,creep){
	if(creep.room.name != roomName){
        moveToTarget.run(creep)
    }else{
		var c = creep.room.controller
		if(creep.claimController(c) == ERR_NOT_IN_RANGE || creep.signController(c,'逍遥半生酒中意，一剑碎影向征程')== ERR_NOT_IN_RANGE) {
			creep.moveTo(c);
			console.log('【'+roomName+'`controller had been claimed 】')
		}
	}
	
}


/*
 *查看前房间主人的建筑与等级的情况
 */
function roomMsg(roomName,creep){
	var stuta = false;
	var target = creep.room.find(FIND_HOSTILE_STRUCTURES,{
		filter: (structure) => structure.structureType != STRUCTURE_WALL 
		&& structure.structureType != STRUCTURE_CONTROLLER
	})
	var c = creep.room.controller.level
// 	console.log(c)
	if(target.length > 0 && c != 0 ){
		stuta = true
	}
	return stuta
}

/*
 *占领房间后委托controller查看房间的建筑与等级
 */
function controllerFindConstructionSites(roomName){
	var b = false
	var target = Game.rooms[roomName].controller.room.find(FIND_CONSTRUCTION_SITES
	//,{
	//	filter: (structure) => structure.structureType == STRUCTURE_SPAWN
//	}
	)
	if(target && Game.rooms[roomName].controller.level < 5){
		b=true
	}
	return b
}
/*
*占领房间后修建筑
*/
// function builderNewRoom(roomName,creep){
	
// 	if(creep.room.name != 'E51N41'){
        //     creep.moveTo(Game.flags.Flag1)
        //     return;
        // }

// 	if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
// 		creep.memory.building = false;
// 		creep.say('🔄 harvest');
// 	}
// 	if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
// 		creep.memory.building = true;
// 		creep.say('🚧 build');
// 	}

// 	if(creep.memory.building) {
		
// 		var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
// 		if(targets.length) {
// 			if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
// 				creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
// 			}
// 		}else{
// 			if(targets.length == 0){
// 				const target = creep.room.find(FIND_STRUCTURES, {
// 					filter: (structure) => {
// 						return (structure.structureType == STRUCTURE_WALL ||
// 								structure.structureType == STRUCTURE_RAMPART)	&&
// 							structure.hits < 100000;
// 					}
// 				});
// 				target.sort((a,b) => a.hits-b.hits);
				
// 				if(target.length > 0){
// 					if(creep.repair(target[0]) == ERR_NOT_IN_RANGE) {
// 						creep.moveTo(target[0], {visualizePathStyle: {stroke: '#66FF33'}});
// 					}
// 				}else{
// 					if(target.length == 0){
						
// 						if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
// 							creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#ffaa00'}});
// 							creep.say('Bc');
// 						}   
					
// 					}
// 				}
// 			}
// 		}
// 	}
// 	else {
// 		var ids = Memory.creeps[creep.name].workloc;
// 		// var sourcea = Game.getObjectById(ids);
// 		var sourcea = Game.getObjectById('5bbcb00c9099fc012e63b849');
// 		if(creep.harvest(sourcea) == ERR_NOT_IN_RANGE) {
// 			creep.moveTo(sourcea, {visualizePathStyle: {stroke: '#ffaa00'}});
// 		}
// 	}
// }

// /*
// *占领房间后升级controller
// */
// function upgraderNewRoom(roomName,creep){
	
        // if(creep.room.name != 'E51N41'){
        //     creep.moveTo(Game.flags.Flag1)
        //     return;
        // }
	
// 	if(creep.memory.buding && creep.store[RESOURCE_ENERGY] == 0) {
//             creep.memory.buding = false;
// 	}
// 	if(!creep.memory.buding && creep.store.getFreeCapacity() == 0) {
// 		creep.memory.buding = true;
// 		creep.say('BU');
// 	}
	
// 	if(creep.memory.buding){
	
// 		if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE 
// // 			||creep.signController(creep.room.controller,"逍遥半生酒中意，一剑碎影向征程") == ERR_NOT_IN_RANGE
// 		) {
// 			creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#ffaa00'}});
// 		}
// 	}else{
// 		var ids = Memory.creeps[creep.name].workloc;
// 		// var target = Game.getObjectById(ids);
// 		var target = Game.getObjectById('5bbcb00c9099fc012e63b849');
// 		if(creep.harvest(target) == ERR_NOT_IN_RANGE){
// 			creep.moveTo(target);
// 		}
// 	}
// }