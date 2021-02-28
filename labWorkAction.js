var labWorkAction = {
	run : function(){
		if(Game.time % 1000 == 0){		
// 			checkLabResourceOfMineraltype()
		}
		var LABTask = Memory.labTask
		if(LABTask.length > 0){
			for(var i in LABTask){
				for(var j in Memory.roomResource){
					if(LABTask[i].roomName == Memory.roomResource[j].roomName){
						var spawnList = Memory.roomResource[j].roomSpawn
						var num = Memory.roomResource[j].spawnResourceIndex;
						for(var s in spawnList){
				// 			isCreepExist('labCreep',Memory.roomResource[j].roomName,spawnList[s],num)
						}
					}
					
				}
			}
		}
		var inLABTask = Memory.inLabTask
		if(inLABTask.length > 0){
			for(var i in inLABTask){
				for(var j in Memory.roomResource){
					if(inLABTask[i].roomName == Memory.roomResource[j].roomName){
						var spawnList = Memory.roomResource[j].roomSpawn
						var num = Memory.roomResource[j].spawnResourceIndex;
						for(var s in spawnList){
				// 			isCreepExist('inlabCreep',Memory.roomResource[j].roomName,spawnList[s],num)
						}
					}
					
				}
			}
		}
		for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'labCreep'){
                creepDelete(creep)
                addMineral(creep)
            }
            if(creep.memory.role == 'inlabCreep'){
                creepDelete(creep)
                transferMineral(creep)
            }
            
		}
		
		inLabRun();
	}
}
module.exports = labWorkAction;

Memory.labTask = [
]

Memory.inLabTask = [
]

var workRoom = ['E59N31']

/*
 *筛选相应的creep
 */
function isCreepExist(role,roomName,spawnName,num){
	if((_.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.roomSign == roomName)) == 0){
        generateCreep(role,roomName,spawnName,num);
		console.log(spawnName+' Spawning new '+roomName +' : '+role);
    }
}

/*
 *生产相应的creep
 */
function generateCreep(role,roomName,spawnName,num){
	var ter = Memory.memorySource[num].terminalId;
	var sto = Memory.memorySource[num].stoId;

	var pbcreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.roomSign == roomName)
	if(role == 'labCreep' && pbcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], 
			role, {memory: {role: role, roomSign: roomName,workter:ter,worksto:sto}});
    }else if(role == 'inlabCreep' && pbcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], 
			role, {memory: {role: role, roomSign: roomName,workter:ter,worksto:sto}});
    }else{
		console.log('【没有role的类型】');
    }

}

/*
*检查lab中对应资源是否存在
*/
function checkLabResourceOfMineraltype(){
	var Task = {}
	var LABTask
	for(var l in Memory.roomResource){
	    for(var r in workRoom){
	        if( Memory.roomResource[l].roomName == workRoom[i]){
	            LABTask = Memory.roomResource[l].labId
	        }
	    }
		for(var i in LABTask){
		    var labT = LABTask[i].type
		    if(labT == 'out'){
		        var Wlab = Game.getObjectById(LABTask[i].id)
    			var minType = LABTask[i].mineralType
    			if(Wlab.store.getUsedCapacity(minType) < 100){
    			    if(!isSourceExist(LABTask[i].id,Memory.labTask)){
    			        Task.roomName = Memory.roomResource[l].roomName;
        				Task.labId = LABTask[i].id;
        				Task.minType = LABTask[i].mineralType;
        				Memory.labTask.push(Task);
    			    }
    			}
		    }
		    if(labT == 'maxin' || labT == 'minin'){
		        var Wlab = Game.getObjectById(LABTask[i].id)
		        var minType = Wlab.mineralType
    			if(Wlab.store.getUsedCapacity(minType) == 3000){
    			    if(!isSourceExist(LABTask[i].id,Memory.inLabTask)){
    			        Task.roomName = Memory.roomResource[l].roomName;
        				Task.labId = LABTask[i].id;
        				Task.minType = minType;
        				Memory.inLabTask.push(Task);
    			    }
    			}
		    }
			
		}
	}
}
/**
 * 判断资源是否存在
 * @param {资源} target 
 * @param {资源列表} sourceList 
 */
function isSourceExist(target,sourceList){
    var status = false;
    for(var i in sourceList){
        if(sourceList[i].labId == target)
            status = true;
    }
    return status;
 }

/*
*向lab中添加对应资源
*/
function addMineral(creep){
	var LABTask = Memory.labTask
	var needMineralLab;
	var minType ;
	for(var i in LABTask){
		if(creep.room.name == LABTask[i].roomName){
			needMineralLab = Game.getObjectById(LABTask[i].labId)
			minType = LABTask[i].minType
			if(needMineralLab.store.getUsedCapacity(minType) < 1000){
				if(creep.store[minType] == 0){
					var ter = Game.getObjectById(Memory.creeps[creep.name].workter)
					if(creep.withdraw(ter, minType) == ERR_NOT_IN_RANGE){
						creep.moveTo(ter)
					}
				}else{
					if(creep.transfer(needMineralLab, minType) == ERR_NOT_IN_RANGE){
						creep.moveTo(needMineralLab)
					}
				}	
			}else{
				deleteTask(i)
			}
		}
	}
	
}

function transferMineral(creep){
    var LABTask = Memory.inLabTask
	var needMineralLab;
	var minType ;
	for(var i in LABTask){
		if(creep.room.name == LABTask[i].roomName){
			needMineralLab = Game.getObjectById(LABTask[i].labId)
			minType = LABTask[i].minType
			if(needMineralLab.store.getUsedCapacity(minType) > 0){
				if(creep.store[minType] == 0){
					if(creep.withdraw(needMineralLab, minType) == ERR_NOT_IN_RANGE){
						creep.moveTo(needMineralLab)
					}
				}else{
				    var ter = Game.getObjectById(Memory.creeps[creep.name].workter)
				    var sto = Game.getObjectById(Memory.creeps[creep.name].worksto)
				    var target = ter
				    if(ter.store.getUsedCapacity(minType) >= 30000){
				       target = sto
				    }
			        if(creep.transfer(target, minType) == ERR_NOT_IN_RANGE){
						creep.moveTo(target)
					}
				}	
			}else{
				deleteTask(i)
			}
		}
	}
}

/*
*删除已完成的任务
*/
function deleteTask(num){
	Memory.labTask.splice(num,1)
}

function inLabRun(){
    var LABTask
    var min1
    var min2
    var num
    for(var l in Memory.roomResource){
        for(var r in workRoom){
	        if(Memory.roomResource[l].roomName == workRoom[r]){
	            LABTask = Memory.roomResource[l].labId
	            num = Memory.roomResource[l].spawnResourceIndex
	            for(var s in roomMinSource){
	                if( Memory.roomResource[l].roomName == roomMinSource[s].mainroom){
                        min1 = roomMinSource[s].min1
                        min2 = roomMinSource[s].min2
	                }
	            }
	            
	        }
	    }
		for(var i in LABTask){
		    var labT = LABTask[i].type
			var inLab 
			var out1
			var out2
			var out3
            if(labT == 'in' || labT == 'minin'){
                inLab = Game.getObjectById(LABTask[i].id)
                out1 = Game.getObjectById(LABTask[i].out1)
                out2 = Game.getObjectById(LABTask[i].out2)
                if(inLab.mineralType == undefined || inLab.store.getUsedCapacity(inLab.mineralType) !=3000){
                    inLab.runReaction(out1,out2)
                }
            }
            //maxin
            if(labT == 'maxin'){
                var sto = Game.getObjectById(Memory.memorySource[num].stoId)
                inLab = Game.getObjectById(LABTask[i].id)
                out1 = Game.getObjectById(LABTask[i].out1)
                out2 = Game.getObjectById(LABTask[i].out2)
                out3 = Game.getObjectById(LABTask[i].out3)
                if(sto.store.getUsedCapacity(min1) < 30000){
                    inLab.runReaction(out1,out2)
                }else{
                    if(sto.store.getUsedCapacity(min2) < 30000){
                        inLab.runReaction(out1,out3)
                    }
                }
            }
        }
    }
        
}

function creepDelete(creep){
	var t = creep.ticksToLive
	var num = creep.store.getCapacity()
	if(creep.store.getFreeCapacity() == num && t < 80){
		creep.suicide()
	}
}


var roomMinSource = [
	{
		mainroom:'E59N31',
		min1:'',
		min2:''
	}
]