var roleUpgradera = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.uping && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.uping = false;
	    }
	    if(!creep.memory.uping && creep.store.getFreeCapacity() == 0) {
	        creep.memory.uping = true;
	        creep.say('UP');
	    }
	    if(creep.memory.uping) {
	        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE
    // 			||creep.signController(creep.room.controller,"人不寐") == ERR_NOT_IN_RANGE
	        ) {
                creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#ffaa00'}});
            } 
        }
        else {
            var sto = Game.getObjectById(Memory.creeps[creep.name].worksto)
            var link4 = Game.getObjectById(Memory.creeps[creep.name].worklink)
            
            if(Memory.creeps[creep.name].worklink != '' && link4 && link4.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                if(creep.withdraw(link4,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(link4)
                }
            }else{
                if(Memory.creeps[creep.name].worksto!='' && sto && sto.store.getUsedCapacity(RESOURCE_ENERGY) > 200){
                    if(creep.withdraw(sto, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    					creep.moveTo(sto);
    				}
                }else{
                    var ids = Memory.creeps[creep.name].workloc;
                    var sourcea = Game.getObjectById(ids);
                    
                    if(creep.harvest(sourcea) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sourcea, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
            
        }
	}
};

module.exports = roleUpgradera;