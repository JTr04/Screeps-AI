var ObserverAction = {
	run : function(){
		if(Game.time % 500 == 0){
			for(var i in mainRoom){
				for(var j in Memory.roomResource){
					if(mainRoom[i] == Memory.roomResource[j].roomName){
						var num = Memory.roomResource[j].spawnResourceIndex;
						var OB = Game.getObjectById(Memory.memorySource[num].OBid)
						var roomList = mainRoomObAround[num]
						if(Memory.memorySource[num].OBid != '' && OB){
						    obWork(OB,roomList,mainRoom[i])
						}
					}
				}
			}
			
		}

		const scoopPowerBankList = Memory.pbResource;
		for(var i in scoopPowerBankList){
			if(scoopPowerBankList[i].flag){
				// getResourceOfSpawnCreep('pbattack',scoopPowerBankList[i])
				// getResourceOfSpawnCreep('pbheal',scoopPowerBankList[i])
				Memory.pbResource[i].flag = false;
			}else{
				Memory.pbResource[i].flag = true;
			}
		}

		for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'pbattack'){
            	pbattackCreepAction(creep)
            }
            if(creep.memory.role == 'pbheal'){
            	pbhealCreepAction(creep)
            }
            if(creep.memory.role == 'pbcarry'){
            	pbcarryCreepAction(creep)
            }
            if(creep.memory.role == 'maxcreep'){
                DepositAction(creep)
            }
            
		}
	}
}
module.exports = ObserverAction;

var mainRoom = ['E59N39']

var mainRoomObAround = {
	0:['E60N31','E60N32','E60N30','E59N30','E58N30'],
	1:['E60N40','E59N40','E58N40','E60N39','E60N38']
}

Memory.pbResource = [
]


/*
 *生产相应的creep
 */
function generateCreep(role,roomName,spawnName,mainRoom,num,ids){
    var sto = Memory.memorySource[num].stoId;
	var pbcreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.sourceid == ids)
	var name = mainRoom+'_'+roomName+'_'+ids+'_'+role
	var creepNum = 3;
	var Dtype;
	for(var i in Memory.pbResource){
		if(roomName == Memory.pbResource[i].room){
			creepNum = Math.ceil(Memory.pbResource[i].power / 1500)
		}
	}
    if(role == 'pbattack' ){
		if(pbcreeps.length < 1){
			Game.spawns[spawnName].spawnCreep([ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
            ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            ], 
			name, {memory: {role: role, sourceid:ids}});
		}
    }else if(role == 'pbheal'){
		if(pbcreeps.length < 1){
			Game.spawns[spawnName].spawnCreep([HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
            HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
            HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 
			name, {memory: {role: role, sourceid:ids}});
		}
		
    }else if(role == 'pbcarry' ){
		if(pbcreeps.length < creepNum){
			Game.spawns[spawnName].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
				CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
				CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
				MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 
			name, {memory: {role: role, sourceid:ids,stuta:true,roomNum:num}});
		}
		
    }else{
		console.log('【没有role的类型】');
    }

}

/*
*ob工作日志
*/
function obWork(ob,roomList,mainRoom){

    const n = roomList.length;
    const k = Game.time % n;
    ob.observeRoom(roomList[k])
    let watchedRoom = Game.rooms[roomList[(k+n-1)%n]]

    if(!watchedRoom){
	    console.log(mainRoom + ' ob '+watchedRoom + '失败 !')
	}else{
		var targets = watchedRoom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_POWER_BANK);
            }
         });
         if(targets.length > 0){
            recordPowerBankSource(targets[0],mainRoom);
    		console.log(mainRoom+'附近的'+watchedRoom+'OB完成，发现'+targets.length+'pb！');
         }
	}
    
}

// /**
//  * 判断pb是否存在
//  */
// function isPowerBank(ROOM,mainRoom){
//     var targets = Game.rooms[ROOM].find(FIND_STRUCTURES, {
//         filter: (structure) => {
//             return (structure.structureType == STRUCTURE_POWER_BANK);
//         }
//      });
//      if(targets.length > 0){
//         recordPowerBankSource(targets[0],mainRoom);
// 		console.log(mainRoom+'附近的'+ROOM+'OB完成，发现'+targets.length+'pb！');
//      }
// }

/**
 * 记录powerbank资源
 */
function recordPowerBankSource(target,mainRoom){ 
	if(target.power > 1000){
		if(!isPbSourceExist(target,Memory.pbResource)){
			const source = {};
			source.id = target.id
			source.room = target.room.name;
			source.generateRoom = mainRoom
			source.ticksToDecay = target.ticksToDecay;
			source.power = target.power;
			source.hits = target.hits;
			source.flag = true;
			Memory.pbResource.push(source)
		}
	}
    
}


/**
 * 判断资源是否存在
 * @param {资源} target 
 * @param {资源列表} sourceList 
 */
function isPbSourceExist(target,sourceList){
    var status = false;
    for(var i in sourceList){
        if(sourceList[i].id == target.id){
            status = true;
        }   
    }
    return status;
 }
 
/**
 * 生产资源相应的creep
 * @param {creep.role} role
 * @param {资源} sourceList 
 */
function getResourceOfSpawnCreep(role,sourceList){
	for(var j in Memory.roomResource){
		if(sourceList.generateRoom == Memory.roomResource[j].roomName){
			var spawnList = Memory.roomResource[j].roomSpawn
			var num = Memory.roomResource[j].spawnResourceIndex;
			var ids = sourceList.id
			for(var s in spawnList){
				generateCreep(role,sourceList.room,spawnList[s],sourceList.generateRoom,num,ids)
			}
		}
	}
}

/**
 * 攻击powerbank
 * @param {creep} creep 
 */
function pbattackCreepAction(creep){
	var targetRoom = creep.name.split('_')[1]
	var targets = Game.getObjectById(creep.name.split('_')[2])
	if(creep.room.name != targetRoom){
		creep.moveTo(Game.flags.Flag6);
		return;
	}
    // todo 更新 更新 这个房间中 powerbank 的信息
    if(targets){
        judgeSourceMessage(targets);
        if(creep.attack(targets) != ERR_NOT_IN_RANGE) {
            creep.moveTo(targets);
        }
    }else{
        // 采集 pb 任务完成  删除 缓存中的任务
        deleteTask(creep.room.name);
        suicide(creep);
    }  
}

/**
 * 判断当前房间 powerbank 还有多少 hixs 
 * @param {资源} target 
 */
function judgeSourceMessage(target){
    if(target.hits < 100000){
        const scoopPowerBankList =  Memory.pbResource
        for(var i in scoopPowerBankList){
            if(target.room.name == scoopPowerBankList[i].room)
            getResourceOfSpawnCreep('pbcarry',scoopPowerBankList[i]);
        }
    }
}

/**
 * 治疗受伤的creep
 * @param {creep} creep 
 */
function pbhealCreepAction(creep){
	var targetRoom = creep.name.split('_')[1]
	if(creep.room.name != targetRoom){
		creep.moveTo(Game.flags.Flag6);
		return;
	}
	var targetName = creep.name.split('_')[0]+'_'+creep.name.split('_')[1]+'_'+creep.name.split('_')[2]+'_pbattack'
    const target = Game.creeps[targetName]
    if(target.hits < target.hitsMax ) {
        if(creep.heal(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }else{
        // 没有受伤对象就向 powerbank 移动
        var targets = Game.getObjectById(creep.name.split('_')[2])
        if(targets){
            creep.moveTo(targets);
        }else{
            suicide(creep);
        } 
    }
}

/**
 * 去采集资源 并带回
 * @param {采集资源的creep} creep 
 */
function pbcarryCreepAction(creep){
	var stuta = Memory.creeps[creep.name].stuta
	var ROOM = creep.name.split('_')[0]
    if(creep.store.getUsedCapacity(RESOURCE_POWER) == 0) {
        var targetRoom = creep.name.split('_')[1]
		if(creep.room.name != targetRoom){
			creep.moveTo(Game.flags.Flag6);
			return;
		}
        const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if(target) {
            if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }else{
            creep.moveTo(25,25)
        }
    }else{
        
        if (creep.room.visual.roomName != ROOM) {
            creep.moveTo(ROOM)
        }else {
            var targets = creep.room.terminal
            if(targets.store.getUsedCapacity(RESOURCE_POWER) > 10000){
                targets = creep.room.storage
            }
			if(creep.transfer(targets, RESOURCE_POWER) == ERR_NOT_IN_RANGE) {
				creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
				Memory.creeps[creep.name].stuta = false
			}
        }
    }
	if(!stuta){
		var flagName = 'recycleCreep'+ROOM
		var flagpos = Game.flags.flagName
		var num = Memory.creeps[creep.name].roomNum + 1
		var spawnName = 'Spawn'+num+'_3'
		if(creep.pos.isEqualTo(flagpos.pos)) {
			Game.spawns[spawnName].recycleCreep(creep)
		}
	}
}

/**
 * 自杀
 * @param {creep} creep 
 */
function suicide(creep){
    creep.suicide();
}

 /**
 * 删除过期的任务
 * @param {目标房间} room 
 */
function deleteTask(room){
    const scoopPowerBankList =  Memory.pbResource
    for(var i in scoopPowerBankList){
        if(room == scoopPowerBankList[i].room){
            Memory.pbResource.splice(i,1);
        }      
    }
}