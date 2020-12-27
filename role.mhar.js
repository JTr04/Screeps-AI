var roleMhar = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var mName ;
        for(var i in Memory.roomResource){
            if(creep.room.name == Memory.roomResource[i].roomName){
                mName = Memory.roomResource[i].mineralName
            }
        }

        if(creep.memory.having && creep.store[mName] == 0) {
            creep.memory.having = false;
	    }
	    if(!creep.memory.having && creep.store.getFreeCapacity() == 0) {
	        creep.memory.having = true;
	        creep.say('having');
	    }
        
	    if(creep.memory.having) {
	        //下边矿种的工作
			    var targets = Game.getObjectById(Memory.creeps[creep.name].workter);
			    if(targets.store.getUsedCapacity(mName) > 100000 && Memory.creeps[creep.name].workfac != ''){
			        var fac = Game.getObjectById(Memory.creeps[creep.name].workfac)
			        if(creep.transfer(fac, mName) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(fac, {visualizePathStyle: {stroke: '#ffffff'}});
                    } 
			    }else{
			        if(creep.transfer(targets, mName) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                    }  
			    }
                
                
                
                    

	        
		}else {
            // var ids = Memory.creeps[creep.name].workloc;
            var sourcea = Game.getObjectById(Memory.creeps[creep.name].workmin);
            if(creep.harvest(sourcea) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sourcea, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            
        }
        
	}
};


module.exports = roleMhar
