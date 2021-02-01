var lookForSource = {
	run : function(){
		if(Game.time % 1 == 0){
			for(var i in mainRoom){
				for(var j in Memory.roomResource){
					if(mainRoom[i] == Memory.roomResource[j].roomName){
						var spawnList = Memory.roomResource[j].roomSpawn
						var num = Memory.roomResource[j].spawnResourceIndex;
						for(var s in spawnList){
							isCreepExist('lookfor',mainRoom[i],spawnList[s],num)
						}
							
					}
					
				}
				
			}

		}
		for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'lookfor'){
				var r = Memory.creeps[creep.name].room
				for(var i in Memory.mainRoomOfAround){
					if(Memory.mainRoomOfAround[i].beginRoom == r){
						lookForRoom(creep,Memory.mainRoomOfAround[i].aroundRoom)
						//检查pb任务
						const scoopPowerBankList = Memory.pbResource;
						for(var i in scoopPowerBankList){
							if(scoopPowerBankList[i].flag){
								//getResourceOfSpawnCreep('pbattack',scoopPowerBankList[i])
								//getResourceOfSpawnCreep('pbheal',scoopPowerBankList[i])
								Memory.pbResource[i].flag = false;
							}else{
								Memory.pbResource[i].flag = true;
							}
						}
						const scoopDepositList = Memory.DepositResource;
						for(var i in scoopDepositList){
							if(scoopDepositList[i].flag){
								//getResourceOfSpawnCreep('maxcreep',scoopDepositList[i])
								Memory.DepositResource[i].flag = false;
							}else{
								Memory.DepositResource[i].flag = true;
							}
						}
					}
				}
                
            }
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
module.exports = lookForSource;

var mainRoom = ['E51N41'];

Memory.mainRoomOfAround = [
							{
							 beginRoom:'E59N31',
							 aroundRoom:[
										{
										 targetRoom:'E60N32',
										 targetRoomFlag:true
										},{
										 targetRoom:'E58N30',
										 targetRoomFlag:true
										},{
										 targetRoom:'E60N29',
										 targetRoomFlag:true
										}
										]
							},{
							 beginRoom:'E59N39',
							 aroundRoom:[
										{
										 targetRoom:'E60N41',
										 targetRoomFlag:true
										},{
										 targetRoom:'E58N40',
										 targetRoomFlag:true
										},{
										 targetRoom:'E60N39',
										 targetRoomFlag:true
										}
										]
							},{
							 beginRoom:'E51N41',
							 aroundRoom:[
										{
										 targetRoom:'E51N40',
										 targetRoomFlag:true
										},{
										 targetRoom:'E49N40',
										 targetRoomFlag:true
										},{
										 targetRoom:'E50N42',
										 targetRoomFlag:true
										}
										]   
							}
								
						  ]

Memory.pbResource = [
]
Memory.DepositResource = [
]

/*
 *筛选相应的creep
 *return creep
 */
function isCreepExist(role,roomName,spawnName,num){
	if((_.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.room == roomName)) == 0){
        generateCreep(role,roomName,spawnName,num);
		console.log(spawnName+' Spawning new '+roomName +' : '+role);
    }
}

/*
 *生产相应的creep
 */
function generateCreep(role,roomName,spawnName,num){
    var sto = Memory.memorySource[num].stoId;
	var pbcreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.room == roomName)
	var name = Game.spawns[spawnName].room.name+'_'+roomName
	var num = 3;
	var Dtype;
	for(var i in Memory.pbResource){
		if(roomName == Memory.pbResource[i].room){
			num = Math.ceil(Memory.pbResource[i].power / 1500)
		}
	}
	for(var i in Memory.DepositResource){
		if(roomName == Memory.DepositResource[i].room){
			Dtype = Memory.DepositResource[i].type
		}
	}
    if(role == 'lookfor' && pbcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([MOVE,MOVE], 
			role, {memory: {role: role, room: roomName}});
    }else if(role == 'pbattack' && pbcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 
			role, {memory: {role: role, room: roomName}});
    }else if(role == 'pbheal' && pbcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 
			role, {memory: {role: role, room: roomName}});
    }else if(role == 'pbcarry' && pbcreeps.length < 3){
		Game.spawns[spawnName].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 
			name, {memory: {role: role, room: roomName}});
    }else if(role == 'maxcreep' && pbcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([MOVE,MOVE,WORK,WORK,CARRY,CARRY], 
            name, {memory: {role: role, room: roomName, worksto:sto , DepositType:Dtype}});
    }else{
		console.log('【没有role的类型】');
    }

}

/*
*目标房间资源
*/
function lookForRoom(creep,roomList){
	var targetRoom ;
	for(var i in roomList){
		if(roomList[i].targetRoomFlag){
			targetRoom = roomList[i].targetRoom
			break;
		}
	}
	if(targetRoom){
		lookPbCreepAction(creep,targetRoom)
	}else{
		restartPbTask()
	}
}

/*
*巡逻行为
*/
function lookPbCreepAction(creep,targetRoom){
	const r = Memory.creeps[creep.name].room
    if(creep.room.name != targetRoom){
        isPowerBank(creep);
        isDeposit(creep);
        creep.moveTo(new RoomPosition( 22, 5, targetRoom))
    }else{
		for(var i in Memory.mainRoomOfAround){
			if(Memory.mainRoomOfAround[i].beginRoom == r){
				for(var j in Memory.mainRoomOfAround[i].aroundRoom){
					if(Memory.mainRoomOfAround[i].aroundRoom[j].targetRoom == targetRoom){
						Memory.mainRoomOfAround[i].aroundRoom[j].targetRoomFlag = false;
					}
				}	
			}
		}

    }
}

/**
  * 重置 寻找 pb 的任务
  */
function restartPbTask(){
    const taskList = Memory.mainRoomOfAround;
    for(var r in mainRoom){
		for(var i in taskList){
			if(taskList[i].beginRoom == mainRoom[r]){
				for(var t in taskList[i].aroundRoom){
					var status = false;
					if(taskList[i].aroundRoom[t].targetRoomFlag){
						status = true;
					}
					if(!status){
						var mainRoomOfAround = [
							{
							 beginRoom:'E59N31',
							 aroundRoom:[
										{
										 targetRoom:'E60N32',
										 targetRoomFlag:true
										},{
										 targetRoom:'E58N30',
										 targetRoomFlag:true
										},{
										 targetRoom:'E60N29',
										 targetRoomFlag:true
										}
										]
							},{
							 beginRoom:'E59N39',
							 aroundRoom:[
										{
										 targetRoom:'E60N41',
										 targetRoomFlag:true
										},{
										 targetRoom:'E58N40',
										 targetRoomFlag:true
										},{
										 targetRoom:'E60N39',
										 targetRoomFlag:true
										}
										]
							  },{
    							 beginRoom:'E51N41',
    							 aroundRoom:[
    										{
    										 targetRoom:'E51N40',
    										 targetRoomFlag:true
    										},{
    										 targetRoom:'E50N40',
    										 targetRoomFlag:true
    										},{
    										 targetRoom:'E50N42',
    										 targetRoomFlag:true
    										}
    										]   
    							}
								
						  ]
						Memory.mainRoomOfAround[i].aroundRoom[t] = mainRoomOfAround[i].aroundRoom[t]
					}
				}
			}
		}
    }
}

/**
 * 判断pb是否存在
 * @param {creep} creep 
 */
function isPowerBank(creep){
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_POWER_BANK);
        }
     });
     if(targets.length > 0){
        recordPowerBankSource(creep , targets[0]);
     }
}

/**
 * 判断deposit是否存在
 * @param {creep} creep 
 */
function isDeposit(creep){
    var targets = creep.room.find(FIND_DEPOSITS);
     if(targets.length > 0){
        recordDepositSource(creep , targets[0]);
     }
}

/**
 * 记录powerbank资源
 * @param {相应creep} creep
 * @param {powerbank 资源} target 
 */
function recordPowerBankSource(creep ,target){ 
	if(target.ticksToDecay > 1000){
		if(!isPbSourceExist(target,Memory.pbResource)){
			const source = {};
			source.room = target.room.name;
			source.generateRoom = Memory.creeps[creep.name].room
			source.ticksToDecay = target.ticksToDecay;
			source.power = target.power;
			source.hits = target.hits;
			source.flag = true;
			Memory.pbResource.push(source)
		}
	}
    
}

/**
 * 记录Deposit资源
 * @param {相应creep} creep
 * @param {powerbank 资源} target 
 */
function recordDepositSource(creep ,target){ 
	if(target.ticksToDecay > 1000){
		if(!isDepositSourceExist(target,Memory.DepositResource)){
			const source = {};
			source.room = target.room.name;
			source.id = target.id
			source.generateRoom = Memory.creeps[creep.name].room
			source.ticksToDecay = target.ticksToDecay;
			source.type = target.depositType;
			source.flag = true;
			Memory.DepositResource.push(source)
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
        if(sourceList[i].room == target.room.name){
            status = true;
        }   
    }
    return status;
 }
 
 /**
 * 判断资源是否存在
 * @param {资源} target 
 * @param {资源列表} sourceList 
 */
 function isDepositSourceExist(target,sourceList){
    var status = false;
    for(var i in sourceList){
        if(sourceList[i].room == target.room.name && sourceList[i].id == target.id ){
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
			for(var s in spawnList){
				isCreepExist(role,sourceList.room,spawnList[s],Memory.roomResource[j].spawnResourceIndex)
			}
		}
	}

 }

/**
 * 攻击powerbank
 * @param {creep} creep 
 */
function pbattackCreepAction(creep){
	var targetRoom = Memory.creeps[creep.name].room
	if(creep.room.name != targetRoom){
		creep.moveTo(new RoomPosition( 22, 5, targetRoom));
		return;
	}
	var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_POWER_BANK);
        }
    });
    // todo 更新 更新 这个房间中 powerbank 的信息
    if(targets.length >0){
        judgeSourceMessage(targets[0]);
        if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
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
    if(target.hits < 40000){
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
	var targetRoom = Memory.creeps[creep.name].room
	if(creep.room.name != targetRoom){
		creep.moveTo(new RoomPosition( 22, 5, targetRoom));
		return;
	}
    const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
        filter: function(object) {
            return object.hitsMax > object.hits ;
        }
    });
    if(target) {
        if(creep.heal(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }else{
        // 没有受伤对象就向 powerbank 移动
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_POWER_BANK);
            }
        });
        if(targets.length>0){
            creep.moveTo(targets[0]);
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
	
    if(creep.store.getUsedCapacity(RESOURCE_POWER) == 0) {
        var targetRoom = Memory.creeps[creep.name].room
		if(creep.room.name != targetRoom){
			creep.moveTo(new RoomPosition( 22, 5, targetRoom));
			return;
		}
        const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if(target) {
            if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }else{
            // const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            //     filter: function(object) {
            //         return object.hitsMax > object.hits ;
            //     }
            // });
            creep.moveTo(25,25)
        }
    }else{
        var ROOM = creep.name.split('_')[0]
        if (creep.room.visual.roomName != ROOM) {
            creep.moveTo(ROOM)
        }else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE
                    );
                }
            });
            if(targets.length > 0){
                if(creep.transfer(targets[0], RESOURCE_POWER) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
     }
}

function DepositAction(creep){
    var type = Memory.creeps[creep.name].DepositType
    if(creep.memory.traing && creep.store[type] == 0) {
        creep.memory.traing = false;
    }
    if(!creep.memory.traing && creep.store.getFreeCapacity() == 0) {
        creep.memory.traing = true;
    }
    if(creep.memory.traing){
        var targetRoom = creep.name.slice('_')[0]
    	if(creep.pos.roomName != targetRoom){
    		creep.moveTo(new RoomPosition(22,5,targetRoom));
    		return;
    	}
        var target = Game.getObjectById(Memory.creeps[creep.name].worksto)
        
        if(creep.transfer(target,type) == ERR_NOT_IN_RANGE){
            // var path = moveOp(creep,target)
            creep.moveTo(target)
        }
    }else{
        var targetRoom = Memory.creeps[creep.name].room
    	if(creep.pos.roomName != targetRoom){
    		creep.moveTo(new RoomPosition(22,5,targetRoom));
    		return;
    	}
        var mist = creep.room.find(FIND_DEPOSITS)
        if(mist.ticksToDecay > 100){
            if(creep.harvest(mist[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(mist[0])
            }
        }else{
            deleteDepositTask(creep.room.name);
            suicide(creep);
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

 /**
 * 删除过期的任务
 * @param {目标房间} room 
 */
function deleteDepositTask(room){
    const scoopDepositList =  Memory.DepositResource
    for(var i in scoopDepositList){
        if(room == scoopDepositList[i].room){
            Memory.DepositResource.splice(i,1);
        }      
    }
}