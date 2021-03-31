var roleS2t = {
    run:function(creep){
        var t = creep.ticksToLive
        var num = creep.store.getCapacity()
        var source 
        if(t < 3){
        	if(creep.store.getFreeCapacity() == num){
        		creep.suicide()
        	}else{
        	    var target = Game.getObjectById(Memory.creeps[creep.name].workter);
        		for(var i in Object.keys(creep.store)){
        			source = Object.keys(creep.store)[i]
        		}
        		if(!target){
        		    target = Game.getObjectById(Memory.creeps[creep.name].worksto)
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
            if(Memory.s2tTask && Memory.s2tTask.length == 0) delete Memory.s2tTask
            
            if(Memory.s2tTask){
    			var s2t = Memory.s2tTask
    			for(var i in s2t){
    				if(s2t[i].room1 == creep.room.name){
    					s2tTaskAction(creep,s2t[i],i)
    				}else{
    					s2tAction(creep)
    				}
    			}
            }else{
    			s2tAction(creep)
            }
        }
    }
}

module.exports = roleS2t;

function s2tTaskAction(creep,task,i){
	var fromS = Game.getObjectById(Game.creeps[creep.name].memory[task.fromS])
	var toS = Game.getObjectById(Game.creeps[creep.name].memory[task.toS])
	var source = task.source
	var num = task.num
	if(creep.store[source] == 0 && creep.store.getFreeCapacity() >= 200){
		if(fromS && fromS.store.getUsedCapacity(source) > 0 && toS && toS.store.getUsedCapacity(source) < num){
			if(creep.withdraw(fromS,source,Math.min(200,fromS.store[source])) == ERR_NOT_IN_RANGE){
				creep.moveTo(fromS)
			}
		}else{
			Memory.s2tTask.splice(i,1)
		}
	}else{
	    for(var i in Object.keys(creep.store)){
	        source = Object.keys(creep.store)[i]
	    }
	    if(toS.store.getFreeCapacity(source) == 0){
	        toS = creep.room.terminal;
	    }
        if(creep.transfer(toS,source) == ERR_NOT_IN_RANGE){
			creep.moveTo(toS)
		}
	}
	
}

function s2tAction(creep){
	if(creep.memory.traning && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.traning = false;
	    }
	    if(!creep.memory.traning && creep.store.getFreeCapacity() == 0) {
	        creep.memory.traning = true;
	    }
        try{
            if(creep.memory.traning){
                if(Game.rooms[creep.pos.roomName].controller.level >= 7){
                    
                    var target = Game.getObjectById(Memory.creeps[creep.name].worksto);
                    if(target && target.store.getUsedCapacity(RESOURCE_ENERGY) < 1000000){
                        if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(target);
                        }
                    }else{
                        var target = Game.getObjectById(Memory.creeps[creep.name].workter);
                        if(target && target.store.getUsedCapacity(RESOURCE_ENERGY) < 50000 ){
                            if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                creep.moveTo(target);
                            }
                        }else{
                            var fac = Game.getObjectById(Memory.creeps[creep.name].workfac)
                            if(Memory.creeps[creep.name].workfac != '' && fac && fac.store.getUsedCapacity(RESOURCE_ENERGY) < 20000){
                                if(creep.transfer(fac,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                    creep.moveTo(fac);
                                } 
                            }
                            // else{
                            //     var roomName = creep.room.name
                            //     Game.rooms[roomName].terminal.send(RESOURCE_ENERGY, 20000, 'E51N41');
                            //     console.log('【'+roomName+'向E51N41发送 20000 energy】');
                            //     // Game.rooms['E59N31'].terminal.send(RESOURCE_ENERGY, 20000, 'E59N39');
                            //     // console.log('【E59N31 向E51N41发送 20000 energy】');
                            // }
                            
                        }
                    }
                }else{
                    var targetS = Game.getObjectById(Memory.creeps[creep.name].worksto);
                    if(targetS && targetS.store.getUsedCapacity(RESOURCE_ENERGY) < 700000){
                        if(creep.transfer(targetS,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(targetS);
                        }
                    }
                }
            }
            else{
                var ter = Game.getObjectById(Memory.creeps[creep.name].workter);
                if(Game.rooms[creep.pos.roomName].controller.level < 7 &&Memory.creeps[creep.name].workter !='' && ter && ter.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                    if(creep.withdraw(ter, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            			creep.moveTo(ter);
            			creep.say('007');		
                	}
                }
               if(Memory.creeps[creep.name].worklink != ''){
                   
                    var link2 = Game.getObjectById(Memory.creeps[creep.name].worklink);
                    var ter = Game.getObjectById(Memory.creeps[creep.name].workter);
                    var fac = Game.getObjectById(Memory.creeps[creep.name].workfac);
                    if(link2 && link2.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                        if(creep.withdraw(link2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                			creep.moveTo(link2 ,{visualizePathStyle: {stroke: '#ffaa00'}});
                			creep.say('996');		
                    	}
                    }else if(ter && ter.store.getUsedCapacity(RESOURCE_ENERGY) > 55000){
                        if(creep.withdraw(ter, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                			creep.moveTo(ter);
                			creep.say('996');		
                    	}
                    }else if(fac && fac.store.getUsedCapacity(RESOURCE_ENERGY) >= 20200){
                        if(creep.withdraw(fac, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                			creep.moveTo(fac);
                			creep.say('996');		
                    	}
                    }
               }
            }
        }catch(err){
            console.log(err.message)
        }
        
}


/**
*@param {roomName1} 任务房间
*@param {fromS} 资源获取建筑（workter）
*@param {toS} 资源去向建筑（worksto）
*@param {sour} 资源类型
*@param {num} 去向建筑资源总数目
*/
global.s2tTsou = function(roomName1,fromS,toS,sour,num){
	if(!Memory.s2tTask)Memory.s2tTask = []
	var ids = roomName1 + sour + num
	if(!checks2tTask(ids,Memory.s2tTask)){
		var task = {}
		task.room1 = roomName1
		task.fromS = fromS
		task.toS = toS
		task.source = sour
		task.num = num
		Memory.s2tTask.push(task)
		return 'ok'
	}else{
	    return '任务已存在'
	}
	
}
global.checks2tTask = function (ids,terTs){
	var stuta = false
	for(var i in terTs){
		var ID = terTs[i].room1 + terTs[i].source + terTs[i].num
		if(ids == ID){
			stuta = true
		}
	}
	return stuta
}