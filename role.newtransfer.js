var newTransfer = {
	run : function(creep){
	    var t = creep.ticksToLive
        var num = creep.store.getCapacity()
        var source 
        if(t < 20){
        	if(creep.store.getFreeCapacity() == num){
        		creep.suicide()
        	}else{
        	    var target = creep.room.terminal
        		for(var i in Object.keys(creep.store)){
        			source = Object.keys(creep.store)[i]
        		}
        		if(!target){
        		    target = creep.room.storage
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
            if(creep.memory.traning && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.traning = false;
    	    }
    	    if(!creep.memory.traning && creep.store.getFreeCapacity() == 0) {
    	        creep.memory.traning = true;
    	    }
    		if(!creep.memory.traning) {
    			var sto = Game.getObjectById(Memory.creeps[creep.name].worksto)
    			var ter = Game.getObjectById(Memory.creeps[creep.name].workter)
    			if(sto && sto.store.getUsedCapacity(RESOURCE_ENERGY)> 0) {
    				if(creep.withdraw(sto, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
    					creep.moveTo(sto ,{visualizePathStyle: {stroke: '#ffaa00'}});
    				}
    			}else{
    				if(ter && ter.store.getUsedCapacity(RESOURCE_ENERGY)> 0) {
    					if(creep.withdraw(ter, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
    						creep.moveTo(ter ,{visualizePathStyle: {stroke: '#ffaa00'}});
    					}	
    				}
    			}
    		}else{
    			var target = creep.room.find(FIND_STRUCTURES,{
    				filter: (structure) => {
    					return(structure.structureType == STRUCTURE_SPAWN ||
    						structure.structureType == STRUCTURE_EXTENSION ||
    						structure.structureType == STRUCTURE_POWER_SPAWN) &&
    						structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    				}
    			});
    			if(target.length > 0 ){
    				if( creep.transfer(target[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
    					creep.moveTo(target[0],{visualizePathStyle: {stroke: '#FFFFFF'}});	
    				}
    			}else{
    				if(target.length == 0){
    					for(var i in Memory.needEnergyTower){
    						if(creep.room.name == Memory.needEnergyTower[i].roomName){
    							var towerList = Memory.needEnergyTower[i].towerList;
    							if(checkAllStuta(towerList)){
    								for(var j in Memory.needEnergyTower[i].towerList){
    									if(Memory.needEnergyTower[i].towerList[j].towerStuta){
    										var target = Game.getObjectById(Memory.needEnergyTower[i].towerList[j].towerId)
    										if(target){
    											if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
    											   creep.moveTo(target);
    											   creep.say('tower');
    											}
    											if(target.store.getUsedCapacity(RESOURCE_ENERGY) == target.store.getCapacity(RESOURCE_ENERGY)){
    												Memory.needEnergyTower[i].towerList[j].towerStuta = false;
    											}
    										}
    									}
    								}
    							}else{
    								var tar = creep.room.find(FIND_CONSTRUCTION_SITES);
    								if(tar.length) {
    									if(creep.build(tar[0]) == ERR_NOT_IN_RANGE) {
    										creep.moveTo(tar[0], {visualizePathStyle: {stroke: '#ffffff'}});
    									}
    								}else{
    									var warNuck = Game.getObjectById(Memory.creeps[creep.name].worknuk)
    									if(warNuck && warNuck.store.getFreeCapacity(RESOURCE_ENERGY) > 0 ){
    										if(creep.transfer(warNuck,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
    											creep.moveTo(warNuck);
    										}
    									}
    								}
    							}
    						}
    					}
    				}
    			}
    		}
        }
		
	}
}

module.exports = newTransfer;

function checkAllStuta(towerList){
	var stuta = false
	for(var i in towerList){
		if(towerList[i].towerStuta){
			stuta = true
		}
	}
	return stuta
}