var roleAttacker = {
    run: function(creep) {
        
        if(creep.room.name != 'E59N21'){
            creep.moveTo(Game.flags.Flag1)
            return;
        }
        
        const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
        if(targets.length > 0) {
            creep.rangedAttack(targets[0]);
        }
        
        var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS)
        if(!target){
            target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES
//             ,{
// 				filter: (structure) => 
// 					(structure.structureType == STRUCTURE_SPAWN ||
// 					structure.structureType == STRUCTURE_TOWER
// 				    || structure.structureType == STRUCTURE_EXTENSION
// 					)
				
// 			}
			)
        }
        if(target){
            if(!creep.pos.isNearTo(target)){
                creep.moveTo(target);
            }else{
                creep.attack(target)
            }
            if(creep.pos.inRangeTo(target, 3)) {
                creep.rangedAttack(target);
            }
        }else{
            if(!creep.pos.isNearTo(24,40))
                creep.moveTo(24,40)
                // creep.attackController(creep.room.controller);
                if(creep.signController(creep.room.controller,'目标：星辰 大海') == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.controller);
                }
        }
	}
};

module.exports = roleAttacker;