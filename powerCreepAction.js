var powerCreepAction = {
	run : function(){
		checkRoomPower()
	}
}
module.exports = powerCreepAction;

var pcRoomMsg = [
	{
		PCRoom:'E59N39',
		PCName:'PC1'
	}
]

function checkRoomPower(){
	var pcname
	for(var i in pcRoomMsg){
		for(var j in Memory.roomResource){
			if(Memory.roomResource[j].roomName == pcRoomMsg[i].PCRoom){
				var num = Memory.roomResource[j].spawnResourceIndex
				var PS = Game.getObjectById(Memory.memorySource[num].PSid)
				pcname = pcRoomMsg[i].PCName
				var pc = Game.powerCreeps[pcname]
				//检测pc是否意外死亡或者第一次开启pc
				if(!pc){
					//在此之前请手动添加pc实例
					//PowerCreep.create('PC1', POWER_CLASS.OPERATOR);
					createPC(pcname,PS,num)	
				}else{
					//续命
					if(pc.ticksToLive < 2500){
						if(pc.renew(PS) == ERR_NOT_IN_RANGE){
							pc.moveTo(PS)
						}
					}else{
						//干活 先判断房间controller是否开启power
						if(!Game.rooms[pcRoomMsg[i].PCRoom].controller.isPowerEnabled){
							if(pc.enableRoom(pc.room.controller) == ERR_NOT_IN_RANGE){
								pc.moveTo(pc.room.controller)
							}
						}else{
							//007
							creep.usePower(PWR_GENERATE_OPS)
							var sto = pc.room.stroage
							if(sto.store.getUsedCapacity(RESOURCE_OPS) < 20000){
								transferOps(pc)
							}else{
								opExt(pc)
								opSto(pc)
							}
							
						}
					}
				}
			}
		}
	}
}

function createPC(pcname,PS){
	Game.powerCreeps[pcname].spawn(PS);
}


function transferOps(creep){

    var terminal = creep.room.terminal;
	var storage = creep.room.storage;
    
    if(creep.store[RESOURCE_OPS] >= 100 ){
		if(terminal.store.getUsedCapacity(RESOURCE_OPS) <= 1000){
			creep.moveTo(terminal)
			creep.transfer(terminal,RESOURCE_OPS)
		}else{
			if(stroage.store.getUsedCapacity(RESOURCE_OPS) <= 10000){
				creep.moveTo(storage)
				creep.transfer(storage,RESOURCE_OPS)
			}
		}
        
    }

}

function opExt(creep){
	var str = creep.room.terminal;
	if(str.store.getUsedCapacity(RESOURCE_OPS) < 100){
		str = creep.room.storage
	}
    let target = creep.room.terminal;
    if(!target || target.store.energy <= 10000){
        let storage = creep.room.storage;
        if(storage && storage.store.energy)target = storage;
        else target = null;
    }
    
    if(creep.room.energyAvailable <= 0.5* creep.room.energyCapacityAvailable && creep.powers[PWR_OPERATE_EXTENSION].cooldown == 0){
        if(creep.store[RESOURCE_OPS] >= 10){
			creep.moveTo(target,{range:3})
			creep.usePower(PWR_OPERATE_EXTENSION,target)
		}else{
			creep.moveTo(str)
			creep.withdraw(str,RESOURCE_OPS,Math.min(100,str.store[RESOURCE_OPS]))
		}
    }
    
}


function opSto(creep){
	var str = creep.room.terminal;
	if(str.store.getUsedCapacity(RESOURCE_OPS) < 100){
		str = creep.room.storage
	}
	var target = creep.room.storage

	if(target.effects.ticksRemaining <= 150 && creep.powers[PWR_OPERATE_STORAGE].cooldown == 0){
		if(creep.store[RESOURCE_OPS] >= 100){
			creep.moveTo(target,{range:3})
			creep.usePower(PWR_OPERATE_STORAGE,target)
		}else{
			creep.moveTo(str)
			creep.withdraw(str,RESOURCE_OPS,Math.min(100,str.store[RESOURCE_OPS]))
		}
	}
}