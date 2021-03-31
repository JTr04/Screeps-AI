var labWorkAction = {
	run : function(){
	    if(Memory.labTask && Memory.labTask.length == 0)delete Memory.labTask
	    if(Memory.inLabTask && Memory.inLabTask.length == 0)delete Memory.inLabTask
		if(Game.time % 1000 == 0){		
			checkLabResourceOfMineraltype()
		}
		
		if(Memory.labTask){
		    var LABTask = Memory.labTask
			for(var i in LABTask){
				for(var j in Memory.roomResource){
					if(LABTask[i].roomName == Memory.roomResource[j].roomName){
						var spawnList = Memory.roomResource[j].roomSpawn
						var num = Memory.roomResource[j].spawnResourceIndex;
						for(var s in spawnList){
							isCreepExist('labCreep',Memory.roomResource[j].roomName,spawnList[s],num)
						}
					}
					
				}
			}
		}
		if(Memory.inLabTask){
		var inLABTask = Memory.inLabTask
			for(var i in inLABTask){
				for(var j in Memory.roomResource){
					if(inLABTask[i].roomName == Memory.roomResource[j].roomName){
						var spawnList = Memory.roomResource[j].roomSpawn
						var num = Memory.roomResource[j].spawnResourceIndex;
						for(var s in spawnList){
							isCreepExist('inlabCreep',Memory.roomResource[j].roomName,spawnList[s],num)
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

var roomMinSource = [
	{
		mainroom:'E59N31',
		min1:'',
		min2:''
	}
]

var workRoom = ['W36N9']

var roomLabMsg = [
	{
		roomName:'W36N9',
		spawnResourceIndex:0,
		labId:[
			{
				id:'605b8400015f301df043747d',
				type:'out',
				mineralType:'H'
			},{
				id:'605d7574c5078b7443456b0c',
				type:'out',
				mineralType:'O'
			},{
				id:'605c71bf6683ec20b1c22c03',
				type:'minin',
				out1:'605b8400015f301df043747d',
				out2:'605d7574c5078b7443456b0c'
			}
		]
	}
]

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
    var name = role+roomName
	var pbcreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.roomSign == roomName)
	if(role == 'labCreep' && pbcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], 
			name, {memory: {role: role, roomSign: roomName,workter:ter,worksto:sto}});
    }else if(role == 'inlabCreep' && pbcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], 
			name, {memory: {role: role, roomSign: roomName,workter:ter,worksto:sto}});
    }else{
		console.log('【没有role的类型】');
    }

}

/*
*检查lab中对应资源是否存在
*/
function checkLabResourceOfMineraltype(){
	if(!Memory.labTask)Memory.labTask = []
	if(!Memory.inLabTask)Memory.inLabTask = []
	var LABTask
	for(var l in roomLabMsg){
	    for(var r in workRoom){
	        if( roomLabMsg[l].roomName == workRoom[r]){
	            LABTask = roomLabMsg[l].labId
	            for(var i in LABTask){
        		    var labT = LABTask[i].type
        		    if(labT == 'out'){
        		        var Wlab = Game.getObjectById(LABTask[i].id)
            			var minType = LABTask[i].mineralType
            			var ter = Game.getObjectById(Memory.memorySource[roomLabMsg[l].spawnResourceIndex].terminalId)
            			if(Wlab && Wlab.store.getUsedCapacity(minType) < 100 && ter.store[minType] > 200){
            			    if(!isSourceExist(LABTask[i].id,Memory.labTask)){
        						var Task = {}
            			        Task.roomName = roomLabMsg[l].roomName;
                				Task.labId = LABTask[i].id;
                				Task.minType = LABTask[i].mineralType;
                				Memory.labTask.push(Task);
            			    }
            			}
        		    }
        		    if(labT == 'maxin' || labT == 'minin'){
        		        var Wlab = Game.getObjectById(LABTask[i].id)
        		        var minType = Wlab.mineralType
            			if(Wlab && Wlab.store.getUsedCapacity(minType) == 3000){
            			    if(!isSourceExist(LABTask[i].id,Memory.inLabTask)){
        						var Task = {}
            			        Task.roomName = roomLabMsg[l].roomName;
                				Task.labId = LABTask[i].id;
                				Task.minType = minType;
                				Memory.inLabTask.push(Task);
            			    }
            			}
        		    }
        			
        		}
	        }
	    }
		
	}
}

function addInlabTask(roomName,labObj,minType){
	if(!isSourceExist(labObj.id,Memory.inLabTask)){
		var Task = {}
		Task.roomName = roomName;
		Task.labId = labObj.id;
		Task.minType = minType;
		Memory.inLabTask.push(Task);
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
	if(Memory.labTask){
	    for(var i in LABTask){
    		if(creep.room.name == LABTask[i].roomName){
    			needMineralLab = Game.getObjectById(LABTask[i].labId)
    			minType = LABTask[i].minType
    			if(needMineralLab && needMineralLab.store.getUsedCapacity(minType) < 2000){
    				if(creep.store[minType] == 0){
    					var ter = Game.getObjectById(Memory.creeps[creep.name].workter)
    					if(ter && ter.store.getUsedCapacity(minType) > 0){
    						if(creep.withdraw(ter, minType,Math.min(200,ter.store[minType])) == ERR_NOT_IN_RANGE){
    							creep.moveTo(ter)
    						}
    					}else{
    	//					roomNeed(LABTask[i].roomName,minType)
    					}
    					
    				}else{
    				    var source
    				    for(var i in Object.keys(creep.store)){
                			source = Object.keys(creep.store)[i]
                		}
                		if(source == minType){
                		    if(creep.transfer(needMineralLab, minType) == ERR_NOT_IN_RANGE){
        						creep.moveTo(needMineralLab)
        					}
                		}else{
            		    	if(creep.transfer(ter, minType) == ERR_NOT_IN_RANGE){
        						creep.moveTo(ter)
        					}
                		}
    				
    				}	
    			}else{
    				deleteTask(i)
    			}
    		}
    	}
	}
}

function transferMineral(creep){
    var LABTask = Memory.inLabTask
	var needMineralLab;
	var minType ;
	if(Memory.inLabTask){
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
    				Memory.inLabTask.splice(i,1)
    			}
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
    for(var l in roomLabMsg){
        for(var r in workRoom){
	        if(roomLabMsg[l].roomName == workRoom[r]){
	            LABTask =roomLabMsg[l].labId
	            num = roomLabMsg[l].spawnResourceIndex
	            for(var s in roomMinSource){
	                if( roomLabMsg[l].roomName == roomMinSource[s].mainroom){
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
                if(sto && sto.store.getUsedCapacity(min1) < 30000){
                    inLab.runReaction(out1,out2)
                }else{
					if(inLab.store.getUsedCapacity(min1) > 0){
						addInlabTask(inLab.pos.roomName,inLab,min1)
					}else{
						if(sto.store.getUsedCapacity(min2) < 30000){
							inLab.runReaction(out1,out3)
						}
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
		haveSource:['Z','XZH2O','XZHO2'],
		needSource:['O','H','OH','X']
	}
]

function roomNeed(roomName,source){
	var sendRoom
	for(var i in roomMinSource){
		var haveSource = roomMinSource[i].haveSource
		for(var s of haveSource){
			if(s == source){
				sendRoom = roomMinSource[i].mainRoom
				var msg = terminalAddTask(sendRoom,roomName,source,10000)
				console.log('<text style="color:green;font-size:13px;">【lab资源调配:】</text>'+msg)
			}
		}
	}
}