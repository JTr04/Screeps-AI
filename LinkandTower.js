var LinkandTower = {
    run :function(creep){
        
        if(creep.memory.traing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.traing = false;
	    }
	    if(!creep.memory.traing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.traing = true;
	    }
	    
        
        if(creep.memory.traing){
            
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
						if(creep.room.controller.level >= 5 && creep.room.controller.level != 8 && Memory.creeps[creep.name].worklink != ''){
							var link0 = Game.getObjectById(Memory.creeps[creep.name].worklink);
							if(link0 && link0.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
								if(creep.transfer(link0,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
									creep.moveTo(link0);
								}
							}
						}else{
						    if(creep.room.controller.level != 8){
						        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
							       	creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#ffaa00'}});
							    } 
						    }else{
						        const target = creep.room.find(FIND_STRUCTURES, {
                                    filter: (structure) => {
                    					return (
                    					        structure.structureType == STRUCTURE_WALL ||
                    					        structure.structureType == STRUCTURE_RAMPART 
                    					       // structure.structureType == STRUCTURE_ROAD
                    					       )&&
                    						structure.hits < 1000000;
                    				}
                                });
                                target.sort((a,b) => a.hits-b.hits);
                    	        
                    	        if(target.length > 0){
                    	            if(creep.repair(target[0]) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(target[0], {visualizePathStyle: {stroke: '#66FF33'}});
                                    }
                    	        }
						    }
						}
					}
                }
            }
     
                
        }else{
            try{
                var sto = creep.room.storage
                if(creep.room.controller.level == 8){
                    if(sto && sto.store.getUsedCapacity(RESOURCE_ENERGY) > 1000){
                    	if(creep.withdraw(sto, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    					    creep.moveTo(sto ,{visualizePathStyle: {stroke: '#ffaa00'}});
    				    }   
                    }
                }else{
                    var targets = Game.getObjectById(Memory.creeps[creep.name].con);
                    if(Memory.creeps[creep.name].con != '' && targets && targets.store.getUsedCapacity(RESOURCE_ENERGY) > 1000){
        				if(creep.withdraw(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        					creep.moveTo(targets ,{visualizePathStyle: {stroke: '#ffaa00'}});
        					
        				}
                    }else{
                        var ids = Memory.creeps[creep.name].workloc;
                        var sourcea = Game.getObjectById(ids);
                        if(creep.harvest(sourcea) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sourcea, {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                        
                    }
                }
            }catch(err){
                console.log(err.message)
            }
        
        }
    }
        
}            
            
            

module.exports = LinkandTower;


function checkAllStuta(towerList){
	var stuta = false
	for(var i in towerList){
		if(towerList[i].towerStuta){
			stuta = true
		}
	}
	return stuta
}



