var maxCreep = {
    run :function(){
		if(Memory.depositTask && Memory.depositTask.length ==0)delete Memory.depositTask
		if(Memory.depositTask){
			for(var i in Memory.depositTask){
				var flagName = 'dep' + Memory.depositTask[i].targetRoom
				var stuta = Game.flags[flagName]
				if(stuta){
					var roomResource = Memory.roomResource
					for(var r in roomResource){
						if(roomResource[r].roomName == Memory.depositTask[i].mainRoom){
							var spawnList = roomResource[r].roomSpawn
							var num = Memory.depositTask[i].num
							for(var s in spawnList){
								isCreepExist('maxcreep',roomResource[r].roomName,spawnList[s],num,flagName,i)
							}
						}
					}
					
				}
			}
		}
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'maxcreep'){
                action(creep)
            }
        }
    }
}      

module.exports = maxCreep;

function isCreepExist(role,roomName,spawnName,num,flagName,i){
	if((_.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.roomSign == roomName)) == 0){
        generateCreep(role,roomName,spawnName,num,flagName,i);
		console.log(spawnName+' Spawning new '+roomName +' : '+role);
    }
}

/*
 *生产相应的creep
 */
function generateCreep(role,roomName,spawnName,num,flagName,i){
	var sto 
    if(Memory.memorySource[num].terminalId != ''){
	    sto = Memory.memorySource[num].terminalId;
    }else{
        sto = Memory.memorySource[num].stoId;
    }
    
    var name = role+flagName;
	var pbcreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.roomSign == roomName)
	if(role == 'maxcreep' && pbcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY], 
			name, {memory: {role: role, roomSign: roomName,worksto:sto,flagname:flagName,index:i}});
    }else{
		console.log('【没有role的类型】');
    }

}

function action(creep){
    var t = creep.ticksToLive
    var num = creep.store.getCapacity()
    var source 
    var flagName = creep.memory.flagname
    var ROOM = creep.name.substr(11,creep.name.length)
    var mainRoom = creep.memory.roomSign
    var tlevel = (Game.map.getRoomLinearDistance(ROOM,mainRoom) + 1)*50
    if(t < tlevel){
    	if(creep.store.getFreeCapacity() == num){
    		creep.suicide()
    	}else{
    	    
    	    var target = Game.getObjectById(Memory.creeps[creep.name].worksto)
    		for(var i in Object.keys(creep.store)){
    			source = Object.keys(creep.store)[i]
    		}
    		try{
    		    if(creep.transfer(target,source) == ERR_NOT_IN_RANGE){
        			creep.moveTo(target)
        		}
    		}catch(err){
    		    console.log(err.message)
    		}
    		
    	}
    }else{
        var source
        for(var i in Object.keys(creep.store)){
			source = Object.keys(creep.store)[i]
		}
        if(creep.memory.traing && creep.store[RESOURCE_MIST] == 0) {
            creep.memory.traing = false;
        }
        if(!creep.memory.traing && creep.store.getFreeCapacity() == 0) {
            creep.memory.traing = true;
        }
        if(creep.memory.traing){
            var target = Game.getObjectById(Memory.creeps[creep.name].worksto)
            if(target.store.getFreeCapacity() == 0){
                target = creep.room.terminal;
            }
            
            if(creep.transfer(target,source) == ERR_NOT_IN_RANGE){
                // var path = moveOp(creep,target)
                creep.moveTo(target)
            }
        }else{
            try{
                if(creep.room.name != ROOM){
                    creep.moveTo(Game.flags[flagName])
                    return;
                }
            }catch(err){
                console.log('【deposits task finish】:'+err.message)
                if(creep.store.getFreeCapacity() == num){
            		creep.suicide()
            	}
            }
            
            var mist = creep.room.find(FIND_DEPOSITS,{
                filter : (t) => t.lastCooldown <= 10
            })
            if(mist.length){
               if(creep.harvest(mist[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(mist[0])
                } 
            }else{
				var index = creep.memory.index
                try{
                    Game.flags[flagName].remove()
                    delete Memory.depositTask.splice(index,1)
        		}catch(err){
        		    creep.suicide();
        		    console.log(err.message)
        		}
            }
            
        }
    }
    
}



global.depositTask = function(mainRoom,targetRoom,num){
	if(!Memory.depositTask)Memory.depositTask = []
	var ids = mainRoom + targetRoom
	if(!checkDepositTask(ids,Memory.warTask)){
		var task = {}
		task.mainRoom = mainRoom
		task.targetRoom = targetRoom
		task.num = num
		Memory.depositTask.push(task)
		return '<text style="color:green;font-size:13px;">【deposit任务添加成功】</text> 目标房间：'+targetRoom
	}else{
		return '<text style="color:green;font-size:13px;">【deposit任务已存在】</text>'
	}
}
global.checkDepositTask = function(ids,taskList){
	var stuta = false;
	for(var i in taskList){
		var ID =taskList[i].mainRoom + taskList[i].targetRoom
		if(ID == ids){
			stuta = true
		}
	}
	return stuta
}