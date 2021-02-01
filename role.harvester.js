/**
 * 给Spawn与extension运输energy
 */
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // var start = Game.cpu.getUsed();
        if(creep.memory.having && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.having = false;
	    }
	    if(!creep.memory.having && creep.store.getFreeCapacity() == 0) {
	        creep.memory.having = true;
	        creep.say('having');
	    }
        
	    if(creep.memory.having) {
            var target = creep.room.find(FIND_STRUCTURES,{
				filter: (structure) => {
					return(structure.structureType == STRUCTURE_SPAWN ||
					structure.structureType == STRUCTURE_EXTENSION) &&
						structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
				}
			});
			if(target.length > 0){
                if(creep.transfer(target[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target[0],{visualizePathStyle: {stroke: '#ffaa00'}});
                }        
			}else{
			    if(target.length == 0){
			        var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE)
                            && structure.store.getFreeCapacity() > 0;
                        }
                    });
                	if(targets.length > 0){
        			    if(creep.transfer(targets[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        			        creep.moveTo(targets[0],{visualizePathStyle: {stroke: '#FFFFFF'}});
        		        }
                	}else{
                	    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE
                // 			||creep.signController(creep.room.controller,"逍遥半生酒中意，一剑碎影向征程") == ERR_NOT_IN_RANGE
            	        ) {
                            creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#ffaa00'}});
                        } 
                	}
			    }
			}

	        
		}else {
            var ids = Memory.creeps[creep.name].workloc;
            var sourcea = Game.getObjectById(ids);
            if(creep.harvest(sourcea) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sourcea, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            
        }
        // var end = Game.cpu.getUsed();
        // console.log(start,end,end-start)
	}
};

module.exports = roleHarvester;