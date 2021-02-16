var tt = {
    run:function(creep){
        
        if(creep.memory.traning && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.traning = false;
	    }
	    if(!creep.memory.traning && creep.store.getFreeCapacity() == 0) {
	        creep.memory.traning = true;
	    }
        if(creep.memory.traning){
    
            var targetS = Game.getObjectById('602800c236d8b33dc944e2fa');
            if(targetS && targetS.store.getFreeCapacity('energy') > 0){
                if(creep.transfer(targetS,'energy') == ERR_NOT_IN_RANGE){
                    creep.moveTo(targetS);
                }
            }
            
        }else{
            var ter = Game.getObjectById('5fd06df40c0e64ddba02702d');
            if(ter && ter.store.getUsedCapacity('energy') > 0){
                if(creep.withdraw(ter, 'energy') == ERR_NOT_IN_RANGE) {
        			creep.moveTo(ter);
            	}
            }
        }
    }
}
module.exports= tt;