/**
 * 给container运输energy
 */
var roleNewHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // var start = Game.cpu.getUsed()
        if(creep.memory.having && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.having = false;
	    }
	    if(!creep.memory.having && creep.store.getFreeCapacity() == 0) {
	        creep.memory.having = true;
	    }
        
        var x = Memory.creeps[creep.name].sx;
        var y = Memory.creeps[creep.name].sy;
        
        var ids = Memory.creeps[creep.name].workloc;
        var sourcea = Game.getObjectById(ids);
        
        if(creep.memory.having){
            var targets = Game.getObjectById(Memory.creeps[creep.name].con);
            if(targets.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                creep.transfer(targets,RESOURCE_ENERGY)
            }else{
                if(creep.room.controller.level >= 5 && Memory.creeps[creep.name].worklink !=''){
                    var link = Game.getObjectById(Memory.creeps[creep.name].worklink);
                    creep.transfer(link,RESOURCE_ENERGY)
                    // if(creep.transfer(link,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    //     creep.moveTo(link)
                    // }
                }
            }  
        }else{
            if(creep.pos.isEqualTo(x,y)){
                creep.harvest(sourcea);
            }else{
                creep.moveTo(x,y);
            }
        }
        // var end = Game.cpu.getUsed()
        // console.log(end-start)        
        // var targets = Game.getObjectById(Memory.creeps[creep.name].con);
        // if(targets.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
        //     if(creep.pos.isEqualTo(x,y)){
        //         creep.harvest(sourcea);
        //         creep.say('007');
        //     }else{
        //         creep.moveTo(x,y);
        //     }
        // }else{
        //     creep.say('link?');
        // }
	}
};

module.exports = roleNewHarvester;
