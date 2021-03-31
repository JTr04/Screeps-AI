var moveToTarget = require('moveToTarget');
var roleBuildera = {
    
    /** @param {Creep} creep **/
    run: function(creep) { 
        
		if(creep.room.name != 'E47N46'){
            // moveToTarget.run(creep)
            creep.moveTo(Game.flags.Flag1)
            return;
        }

        if(creep.memory.buding && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.buding = false;
	    }
	    if(!creep.memory.buding && creep.store.getFreeCapacity() == 0) {
	        creep.memory.buding = true;
	        creep.say('BU');
	    }
        
            if(creep.memory.buding){
    		
    			if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
    				creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#ffaa00'}});
    			}
            }else{
    //             if(creep.signController(creep.room.controller,"it will be claimed by verp_T") == ERR_NOT_IN_RANGE) {
    // 				creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#ffaa00'}});
    // 			}
                var ids = Memory.creeps[creep.name].workloc;
                // var target = Game.getObjectById(ids);
                var target = Game.getObjectById('5bbcafca9099fc012e63b325');
                if(creep.harvest(target) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
            }
            
       
    }
};

module.exports = roleBuildera;