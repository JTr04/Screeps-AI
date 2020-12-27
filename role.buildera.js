var roleBuildera = {
    
    /** @param {Creep} creep **/
    run: function(creep) { 
        
		if(creep.room.name != 'E46N43'){
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
    		
    			if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE 
    // 			||creep.signController(creep.room.controller,"逍遥半生酒中意，一剑碎影向征程") == ERR_NOT_IN_RANGE
    			) {
    				creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#ffaa00'}});
    				// creep.signController(creep.room.controller,'逍遥半生酒中意，一剑碎影向征程');
    			}
            }else{
                var ids = Memory.creeps[creep.name].workloc;
                // var target = Game.getObjectById(ids);
                var target = Game.getObjectById('5bbcafb99099fc012e63b0f6');
                if(creep.harvest(target) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
            }
            
       
    }
};

module.exports = roleBuildera;
