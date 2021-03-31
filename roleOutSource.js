/**
* @param {room} 外矿房间
* @param {ids} 矿床id
* @param {stuta} true/false 是否预定
* @param {outhelp} 是否援助
* @param {creepnum} creep num
*/
var roleOutSource = {
	run : function(room,ids,stuta,outhelp,creepnum){
		for(var i in mainRoom){
			for(var j in Memory.roomResource){
				if(mainRoom[i] == Memory.roomResource[j].roomName){
					var spawnList = Memory.roomResource[j].roomSpawn
					var num = Memory.roomResource[j].spawnResourceIndex;
					for(var s in spawnList){
					    for(var n=0;n<creepnum;n++){
						  //  isCreepExist('outHar',room,spawnList[s],num,ids,n)
					    }
				        if(outhelp){
    				        generateCreep('outbuilder',room,spawnList[s],num,ids,1);
    				        generateCreep('outbuildera',room,spawnList[s],num,ids,1);
				            
				        }
						if (stuta){
							isCreepExist('outRe',room,spawnList[s],num,ids,1)
						}
					}
				}
				
			}
		}

		for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'outHar'){
                outCreepAction(creep)
            }
            if(creep.memory.role == 'outRe'){
                reAction(creep)
            }
            if(creep.memory.role == 'outbuilder'){
                builderAction(creep)
            }
            if(creep.memory.role == 'outbuildera'){
                upAction(creep)
            }
            
		}
	}
}

module.exports = roleOutSource;

var mainRoom = ['E49N41']

/*
 *筛选相应的creep
 *return creep
 */
function isCreepExist(role,roomName,spawnName,num,ids,creepnum){
	if((_.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.room == roomName && creep.memory.creepnum == creepnum)) == 0){
        generateCreep(role,roomName,spawnName,num,ids,creepnum);
		console.log(spawnName+' Spawning new '+roomName +' : '+role);
    }
}

function generateCreep(role,roomName,spawnName,num,ids,creepnum){
	var sto = Memory.memorySource[num].stoId;
	var name = Game.spawns[spawnName].room.name + ' ' + role + ' ' + creepnum;
	var pbcreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.room == roomName && creep.memory.creepnum == creepnum)
	if(role == 'outHar' && pbcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 
			name, {memory: {role: role, room: roomName,worksto:sto,workloc:ids,creepnum:creepnum}});
    }else if(role == 'outRe' && pbcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([CLAIM,MOVE,MOVE], 
			role, {memory: {role: role, room: roomName,creepnum:creepnum}});
    }else if(role == 'outbuilder' && pbcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 
			role, {memory: {role: role, room: roomName,worksto:sto,creepnum:creepnum}});
    }else if(role == 'outbuildera' && pbcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 
			role, {memory: {role: role, room: roomName,worksto:sto,creepnum:creepnum}});
    }else{
		
    }
}

function outCreepAction(creep){
    
	var mainRoom = creep.name
	var targetRoom = Memory.creeps[creep.name].room
	if(creep.memory.having && creep.store[RESOURCE_ENERGY] == 0) {
		creep.memory.having = false;
	}
	if(!creep.memory.having && creep.store.getFreeCapacity() == 0) {
		creep.memory.having = true;
	}
	
	if(creep.memory.having) {
		//下边矿种的工作
		if(creep.pos.roomName != mainRoom){
			creep.moveTo(new RoomPosition( 22, 5, mainRoom));
		}
		
		var ids = Memory.creeps[creep.name].worksto;
		var sto = Game.getObjectById('6040bca4ce685621c7a4b11f');
		if(sto.store.getFreeCapacity(RESOURCE_ENERGY)>0){
			if(creep.transfer(sto, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sto, {visualizePathStyle: {stroke: '#ffffff'}});
			} 
		}
				
	}else {
		if(creep.pos.roomName != targetRoom){
			creep.moveTo( new RoomPosition( 22, 5, targetRoom));
		}
		var ids = Memory.creeps[creep.name].workloc;
		var sourcea = Game.getObjectById(ids);
		if(creep.harvest(sourcea) == ERR_NOT_IN_RANGE) {
			creep.moveTo(sourcea, {visualizePathStyle: {stroke: '#ffaa00'}});
		}
		
	}
}

function reAction(creep){
	var room = Memory.creeps[creep.name].room
	if (creep.room.name != room){
		creep.moveTo(new RoomPosition( 22, 5, room), {reusePath:50})
		return ;
	}
	if(creep.room.controller) {
		if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
			creep.moveTo(creep.room.controller);
		}
	}
}

function builderAction(creep){
     

    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.building = false;
        creep.say('🔄 harvest');
    }
    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
        creep.memory.building = true;
        creep.say('🚧 build');
    }

    if(creep.memory.building) {
        
        if(creep.room.name != 'E51N39'){
            creep.moveTo(Game.flags.Flag10);
            return;
        }
        var target = Game.getObjectById('5feed62ba3fb08961c3ecc6f')
        if(target.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
            if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(target)
            }
        }
        
        // if(creep.pos.isEqualTo(41,14)){
        //     creep.drop(RESOURCE_ENERGY);
        // }else{
        //     creep.moveTo(41,15);
        // }
                
        
    }else {
        
        var ids = Memory.creeps[creep.name].worksto;
		var sto = Game.getObjectById(ids);
		if(sto.store.getFreeCapacity(RESOURCE_ENERGY)>0){
			if(creep.withdraw(sto, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sto, {visualizePathStyle: {stroke: '#ffffff'}});
			} 
		}
    }
}

function upAction(creep){
    
    
     if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.building = false;
        creep.say('🔄 harvest');
    }
    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
        creep.memory.building = true;
        creep.say('🚧 build');
    }

    if(creep.memory.building) {
        
        if(creep.room.name != 'E51N39'){
            creep.moveTo(Game.flags.Flag10);
            return;
        }
        var target = Game.getObjectById('5feed62ba3fb08961c3ecc6f')
        if(target.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
            if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(target)
            }
        }
        // if(creep.pos.isEqualTo(41,15)){
        //     creep.drop(RESOURCE_ENERGY);
        // }else{
        //     creep.moveTo(41,15);
        // }
    }else {
        var ids = Memory.creeps[creep.name].worksto;
		var sto = Game.getObjectById(ids);
		if(sto.store.getFreeCapacity(RESOURCE_ENERGY)>0){
			if(creep.withdraw(sto, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sto, {visualizePathStyle: {stroke: '#ffffff'}});
			} 
		}
  
        
    }
}