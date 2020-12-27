var roleS2t = {
    run:function(creep){
        
        if(creep.memory.traning && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.traning = false;
	    }
	    if(!creep.memory.traning && creep.store.getFreeCapacity() == 0) {
	        creep.memory.traning = true;
	    }
        
        if(creep.memory.traning){
            if(creep.room.controller.level >= 7){
                
                var target = Game.getObjectById(Memory.creeps[creep.name].worksto);
                if(target.store.getUsedCapacity(RESOURCE_ENERGY) < 700000){
                    if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(target);
                    }
                }else{
                    var target = Game.getObjectById(Memory.creeps[creep.name].workter);
                    if(target.store.getUsedCapacity(RESOURCE_ENERGY) < 50000 ){
                        if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(target);
                        }
                    }else{
                        var fac = Game.getObjectById(Memory.creeps[creep.name].workfac)
                        if(Memory.creeps[creep.name].workfac != '' && fac.store.getUsedCapacity(RESOURCE_ENERGY) < 20000){
                            if(creep.transfer(fac,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                creep.moveTo(fac);
                            } 
                        }
                        else{
                            // var roomName = creep.room.name
                            // Game.rooms[roomName].terminal.send(RESOURCE_ENERGY, 10000, 'E51N41');
                            // console.log('【'+roomName+'向E51N41发送 10000 energy】');
                            Game.rooms['E59N31'].terminal.send(RESOURCE_ENERGY, 20000, 'E51N41');
                            console.log('【E59N31 向E51N41发送 20000 energy】');
                        }
                        
                    }
                }
            }else{
                var targetS = Game.getObjectById(Memory.creeps[creep.name].worksto);
                if(targetS.store.getUsedCapacity(RESOURCE_ENERGY) < 400000){
                    if(creep.transfer(targetS,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(targetS);
                    }
                }
            }
        }
        else{
            var ter = Game.getObjectById(Memory.creeps[creep.name].workter);
            if(creep.room.controller.level < 7 &&Memory.creeps[creep.name].workter !='' && ter.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                if(creep.withdraw(ter, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        			creep.moveTo(ter);
        			creep.say('007');		
            	}
            }
           if(Memory.creeps[creep.name].worklink != ''){
               
                var link2 = Game.getObjectById(Memory.creeps[creep.name].worklink);
                var ter = Game.getObjectById(Memory.creeps[creep.name].workter);
                if(link2.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                    if(creep.withdraw(link2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            			creep.moveTo(link2 ,{visualizePathStyle: {stroke: '#ffaa00'}});
            			creep.say('996');		
                	}
                }else if(ter && ter.store.getUsedCapacity(RESOURCE_ENERGY) > 55000){
                    if(creep.withdraw(ter, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            			creep.moveTo(ter);
            			creep.say('996');		
                	}
                }
           }
        }
    }
}

module.exports = roleS2t;
