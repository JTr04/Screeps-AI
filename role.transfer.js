var roleTransfer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.traning && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.traning = false;
	    }
	    if(!creep.memory.traning && creep.store.getFreeCapacity() == 0) {
	        creep.memory.traning = true;
	    }
        
	    if(!creep.memory.traning) {
	        if(creep.room.controller.level == 8){
	            var sto = Game.getObjectById(Memory.creeps[creep.name].worksto)
	            if(targets.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
	                if(creep.withdraw(sto, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    					creep.moveTo(sto ,{visualizePathStyle: {stroke: '#ffaa00'}});
    					
    				}
	            }
	        }
    
            var targets = Game.getObjectById(Memory.creeps[creep.name].con);
            // var targets = creep.room.find(FIND_STRUCTURES,{
            //   filter : (structure) => {
            //       return (structure.structureType == STRUCTURE_CONTAINER) &&
            //         structure.store.getUsedCapacity() > 1000;
            //   }
            // });
            if(targets.store.getUsedCapacity(RESOURCE_ENERGY) > 1000){
            // if(targets.length > 0){
				// if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				// 	creep.moveTo(targets[0] ,{visualizePathStyle: {stroke: '#ffaa00'}});
					
				// }
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
        else {
			var target = creep.room.find(FIND_STRUCTURES,{
				filter: (structure) => {
					return(structure.structureType == STRUCTURE_SPAWN ||
					structure.structureType == STRUCTURE_EXTENSION) &&
						structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
				}
			});
			if(target.length > 0 && creep.transfer(target[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
				creep.moveTo(target[0],{visualizePathStyle: {stroke: '#FFFFFF'}});	
			}else{
				if(target.length == 0){
				    var tar = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if(tar.length) {
                        if(creep.build(tar[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(tar[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }else{
                        if(tar.length == 0){
                            if(creep.room.controller.level >= 6 && Memory.creeps[creep.name].worklink != ''){
                                var link3 = Game.getObjectById(Memory.creeps[creep.name].worklink);
                                if(link3.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && creep.transfer(link3,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                    creep.moveTo(link3);
                                    creep.say('link');
                                }
                            }else{
                                var targets = creep.room.find(FIND_STRUCTURES, {
                                filter: (structure) => {
                                    return (structure.structureType == STRUCTURE_STORAGE)
                                    && structure.store.getUsedCapacity() < 200000;
                                }
                                });
                    			if(targets.length > 0){
                    			    if(creep.transfer(targets[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    			        creep.moveTo(targets[0],{visualizePathStyle: {stroke: '#FF66CC'}});
                    			    }
                    			}else{
                    			    if(targets.length == 0){
                    			        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                                            creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#ffaa00'}});
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
};

module.exports = roleTransfer;
