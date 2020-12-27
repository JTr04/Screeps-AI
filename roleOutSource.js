/**
*@param room 外矿房间
*@param ids 矿床id
*@param stuta true/false 是否预定
*/
var roleOutSource = {
	run : function(room,ids,stuta){
		for(var i in mainRoom){
			for(var j in Memory.roomResource){
				if(mainRoom[i] == Memory.roomResource[j].roomName){
					var spawnList = Memory.roomResource[j].roomSpawn
					var num = Memory.roomResource[j].spawnResourceIndex;
					for(var s in spawnList){
						isCreepExist('outHar',room,spawnList[s],num,ids)
						if (stuta){
							isCreepExist('outRe',room,spawnList[s],num,ids)
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
            
		}
	}
}

module.exports = roleOutSource;

var mainRoom = ['E51N41']

/*
 *筛选相应的creep
 *return creep
 */
function isCreepExist(role,roomName,spawnName,num,ids){
	if((_.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.room == roomName)) == 0){
        generateCreep(role,roomName,spawnName,num,ids);
		console.log(spawnName+' Spawning new '+roomName +' : '+role);
    }
}

function generateCreep(role,roomName,spawnName,num,ids){
	var sto = Memory.memorySource[num].stoId;
	var name = Game.spawns[spawnName].room.name;
	var pbcreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.room == roomName)
	if(role == 'outHar' && pbcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 
			name, {memory: {role: role, room: roomName,worksto:sto,workloc:ids}});
    }else if(role == 'outRe' && pbcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([CALIM,MOVE,MOVE], 
			role, {memory: {role: role, room: roomName}});
    }else{
		console.log('【没有role的类型】');
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
			creep.moveTo(new RoomPosition( 22, 5, mainRoom) , {reusePath:50});
		}
		
		var ids = Memory.creeps[creep.name].worksto;
		var sto = Game.getObjectById(ids);
		if(sto.store.getFreeCapacity(RESOURCE_ENERGY)>0){
			if(creep.transfer(sto, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sto, {visualizePathStyle: {stroke: '#ffffff'}});
			} 
		}
				
	}else {
		if(creep.pos.roomName != targetRoom){
			creep.moveTo( new RoomPosition( 22, 5, targetRoom), {reusePath:50});
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

/**
*移动优化
*因为没有设置异常处理所以在给定目标时要注意观察有空间可以过去
*@param {creep:Creep}相应的creep
*@param {target:targetObject}目标对象
*@return path
*/
function moveOp(creep,target) {
	var path = creep.pos.findPathTo(target,{maxOps:200});
	if( !path.length) {
		path = creep.pos.findPathTo(target,
			{maxOps: 1000, ignoreCreeps: true});
	}
	return path
}
