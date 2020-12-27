var LinkandTower = {
    run :function(creep){
        
        checkTowerStuta();
        
        if(creep.memory.traing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.traing = false;
	    }
	    if(!creep.memory.traing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.traing = true;
	    }
	    
        
        if(creep.memory.traing){
            
            for(var i in Memory.needEnergyTower){
                if(creep.room.name == Memory.needEnergyTower[i].roomName){
					var towerList = Memory.needEnergyTower[i].towerList;
					if(checkAllStuta(towerList)){
						for(var j in Memory.needEnergyTower[i].towerList){
							if(Memory.needEnergyTower[i].towerList[j].towerStuta){
								var target = Game.getObjectById(Memory.needEnergyTower[i].towerList[j].towerId)
								if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
								   creep.moveTo(target);
								   creep.say('tower');
								}
								if(target.store.getUsedCapacity(RESOURCE_ENERGY) == 1000){
									Memory.needEnergyTower[i].towerList[j].towerStuta = false;
								}
							}
						}
					}else{
						if(creep.room.controller.level >= 5 && Memory.creeps[creep.name].worklink != ''){
							var link0 = Game.getObjectById(Memory.creeps[creep.name].worklink);
							if(link0.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
								if(creep.transfer(link0,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
									creep.moveTo(link0);
								}
							}
						}else{
							if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
								creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#ffaa00'}});
							} 
						}
					}
                }
            }
     
                
        }else{
            var targets = Game.getObjectById(Memory.creeps[creep.name].con);
                if(creep.room.controller.level > 4 && targets.store.getUsedCapacity(RESOURCE_ENERGY) > 1000){
    				if(creep.withdraw(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    					creep.moveTo(targets ,{visualizePathStyle: {stroke: '#ffaa00'}});
    					
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
            
            

module.exports = LinkandTower;

// ['5f9efa7c7dea8913c2ceb3ae','5fa51d4e0232ee132b9081dc','5fad7ddf75c5ec954679c03e','5fb618445c05c7873c508f24','5fcc90e159e7e15db3df2b4a','5fcc45e30569d6c66be132d0']


Memory.needEnergyTower = [
    {
        roomName:'E59N31',
        towerList:[
            {
                towerId:'5f9efa7c7dea8913c2ceb3ae',
                towerStuta:true
            },{
                towerId:'5fa51d4e0232ee132b9081dc',
                towerStuta:true
            },{
                towerId:'5fd2e503386773215b49aa72',
                towerStuta:true
            }   
        ]
    },{
        roomName:'E59N39',
        towerList:[
            {
                towerId:'5fad7ddf75c5ec954679c03e',
                towerStuta:true
            },{
                towerId:'5fb618445c05c7873c508f24',
                towerStuta:true
            },{
                towerId:'5fcc90e159e7e15db3df2b4a',
                towerStuta:true
            }    
        ]
    },{
        roomName:'E51N41',
        towerList:[
            {
                towerId:'5fcc45e30569d6c66be132d0',
                towerStuta:true
            },{
                towerId:'5fd5a0de5c1325a84721b000',
                towerStuta:true
            }
        ]
    }
]

function checkTowerStuta(){
    for(var i in Memory.needEnergyTower){
        for(var j in Memory.needEnergyTower[i].towerList){
            var target = Game.getObjectById(Memory.needEnergyTower[i].towerList[j].towerId)
            if(target.store.getUsedCapacity(RESOURCE_ENERGY) < 550){
                Memory.needEnergyTower[i].towerList[j].towerStuta = true;
            }
        }
    }
      
}

function checkAllStuta(towerList){
	var stuta = false
	for(var i in towerList){
		if(towerList[i].towerStuta){
			stuta = true
		}
	}
	return stuta
}



