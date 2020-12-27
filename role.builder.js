var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        
        if(creep.room.name != 'E46N43'){
            creep.moveTo(Game.flags.Flag1)
            return;
        }
         

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                if(targets.length == 0){
                    const target = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
        					return (
        					       // structure.structureType == STRUCTURE_WALL ||
        					       // structure.structureType == STRUCTURE_RAMPART ||
        					        structure.structureType == STRUCTURE_ROAD)	&&
        						structure.hits < structure.hitsMax;
        				}
                    });
                    target.sort((a,b) => a.hits-b.hits);
        	        
        	        if(target.length > 0){
        	            if(creep.repair(target[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target[0], {visualizePathStyle: {stroke: '#66FF33'}});
                        }
        	        }else{
                        if(target.length == 0){
                            
                            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#ffaa00'}});
                                creep.say('Bc');
                            }   
                        
                        }
                    }
                }
            }
	    }
	    else {
	       // if(creep.room.controller) {
        //         var c = Game.getObjectById('5bbcafb99099fc012e63b0f7');
        //         if(creep.claimController(c) == ERR_NOT_IN_RANGE || creep.signController(creep.room.controller,'逍遥半生酒中意，一剑碎影向征程')== ERR_NOT_IN_RANGE) {
        //             creep.moveTo(c);
        //         }
        //     }
	        var ids = Memory.creeps[creep.name].workloc;
            // var sourcea = Game.getObjectById(ids);
            var sourcea = Game.getObjectById('5bbcafb99099fc012e63b0f5');
            if(creep.harvest(sourcea) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sourcea, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;
