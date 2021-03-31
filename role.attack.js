var roleAttacker = {
    run: function() {
		if(Memory.mixwWarTask && Memory.mixwWarTask.length == 0)delete Memory.mixwWarTask
		if(Memory.mixwWarTask){
			var task = Memory.mixwWarTask
			var roomMsg = Memory.roomResource
			for(var i in task){
				for(var r in roomMsg){
					if(task[i].mainRoom == roomMsg[r].roomName){
						var spawnList = roomMsg[r].roomSpawn
						for(var s in spawnList){
						//	for(var n=0;n<task[i].num;n++){
								generateCreep('RA',task[i].mainRoom,spawnList[s],bodyFree(task[i].body),task[i].boost)
						//	}	
						}
					}
				}
			}
		}
		
		for(var name in Game.creeps){
		    var creep = Game.creeps[name]
		    if(creep.memory.role == 'RA'){
		        workAction(creep)
		    }
		}
	}
};

module.exports = roleAttacker;

var boostLabMsg = {
    'sim':[
        {
            boostLabId:'53dd2ef607bf095762b707da',
            boostLabMin:'UO'
        },{
            boostLabId:'6dcb4fbe1801023b727b87d7',
            boostLabMin:'KO'
        }   
    ]

}
/*
 *生产相应的creep
 */
function generateCreep(role,roomName,spawnName,body,boost){

	var Gcreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.roomSign == roomName)
	var name = role + '_' + targetRoom +'_'+ roomName
	if(role == 'RA' && Gcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep(body, 
			name, {memory: {role: role, roomSign: roomName,boost:boost}});
    }else{
		console.log('【没有role的类型】');
    }

}
function workAction(creep){
    var warFlag = Game.flags.attack
	if(warFlag){
	    if(creep.memory.boost){
            var boostFlag = Game.flags['boost'+creep.room.name];
            if(boostFlag){
                if(!creep.pos.isEqualTo(boostFlag)){
                   creep.moveTo(boostFlag)
                }else{
                    var boostLabList = boostLabMsg[creep.room.name]
                    for(var l in boostLabList){
                        var target = Game.getObjectById(boostLabList[l].boostLabId)
                        if(target){
                            target.boostCreep(creep)
                        }
                    }
                    creep.memory.boost = false;
                } 
            }else{
                creep.say('boostFlag?')
            }
            
        }else{
            if(creep.room.name != warFlag.pos.roomName){
    			creep.moveTo(Game.flags.attack)
    			creep.heal(creep)
    			return;
    		}
        }
		
	}else{
		creep.say('🏴‍☠️呢?')
	}
    
    
    const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
    if(targets.length > 0) {
        creep.rangedAttack(targets[0]);
		creep.heal(creep)
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
        if(creep.pos.inRangeTo(target, 3)) {
            creep.rangedAttack(target);
			creep.heal(creep)
        }
    }else{
		if(creep.signController(creep.room.controller,'目标：星辰 大海') == ERR_NOT_IN_RANGE){
			creep.moveTo(creep.room.controller);
		}
    }
}

global.mixwWarTask = function(mainRoom,targetRoom,body,boolean){
	if(!Memory.mixwWarTask)Memory.mixwWarTask = []
	var ids = mainRoom + targetRoom
	if(!checMixkWarTask(ids,Memory.mixwWarTask)){
		var task = {}
		task.mainRoom = mainRoom
		task.targetRoom = targetRoom
		task.body = body
		task.boost = boolean
		Memory.mixwWarTask.push(task)
		return '<text style="color:red;font-size:13px;">【战争任务添加成功】</text> 目标房间：'+targetRoom+' 战争等级：一体机'
	}else{
		return '<text style="color:red;font-size:13px;">【任务已存在】</text>'
	}
}
global.checkMixwWarTask = function(ids,taskList){
	var stuta = false;
	for(var i in taskList){
		var ID =taskList[i].mainRoom + taskList[i].targetRoom
		if(ID == ids){
			stuta = true
		}
	}
	return stuta
}