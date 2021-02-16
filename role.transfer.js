var roleTransfer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        try{
            if(creep.memory.traning && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.traning = false;
            }
    	    if(!creep.memory.traning && creep.store.getFreeCapacity() == 0) {
    	        creep.memory.traning = true;
    	    }
    	    
    	    if(!creep.memory.traning) {
                var targets = Game.getObjectById(Memory.creeps[creep.name].con);
    	        if(Game.rooms[creep.pos.roomName].controller.level == 8){
    	            var sto = Game.getObjectById(Memory.creeps[creep.name].worksto)
    	            if(targets && targets.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
    	                if(creep.withdraw(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        					creep.moveTo(targets ,{visualizePathStyle: {stroke: '#ffaa00'}});
        				}
    	            }else{
    	                if(sto && sto.store.getUsedCapacity(RESOURCE_ENERGY)> 0) {
    	                    if(creep.withdraw(sto, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        					    creep.moveTo(sto ,{visualizePathStyle: {stroke: '#ffaa00'}});
    	                    }
        				}
    	            }
    	        }else{
    	            if(targets && targets.store.getUsedCapacity(RESOURCE_ENERGY) > 1000){
                    // if(targets.length > 0){
        				// if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        				// 	creep.moveTo(targets[0] ,{visualizePathStyle: {stroke: '#ffaa00'}});
        					
        				// }
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
            else {
    			var target = creep.room.find(FIND_STRUCTURES,{
    				filter: (structure) => {
    					return(structure.structureType == STRUCTURE_SPAWN ||
    					    structure.structureType == STRUCTURE_EXTENSION ||
    					    structure.structureType == STRUCTURE_POWER_SPAWN) &&
    						structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    				}
    			});
    			if(target.length > 0 && creep.transfer(target[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
    				creep.moveTo(target[0],{visualizePathStyle: {stroke: '#FFFFFF'}});	
    			}else{
    				if(target.length == 0){
    				    // if(creep.room.controller.level == 8){
    				    //     for(var i in Memory.needEnergyTower){
            //                     if(creep.room.name == Memory.needEnergyTower[i].roomName){
            //     					var towerList = Memory.needEnergyTower[i].towerList;
            //     					if(checkAllStuta(towerList)){
            //     						for(var j in Memory.needEnergyTower[i].towerList){
            //     							if(Memory.needEnergyTower[i].towerList[j].towerStuta){
            //     								var target = Game.getObjectById(Memory.needEnergyTower[i].towerList[j].towerId)
            //     								if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            //     								   creep.moveTo(target);
            //     								   creep.say('tower');
            //     								}
            //     								if(target.store.getUsedCapacity(RESOURCE_ENERGY) == 1000){
            //     									Memory.needEnergyTower[i].towerList[j].towerStuta = false;
            //     								}
            //     							}
            //     						}
            //     					}else{
            //     					    var warNuck = Game.getObjectById(Memory.creeps[creep.name].worknuk)
            //     			            if(warNuck && warNuk.store.getFreeCapacity(RESOURCE_ENERGY) > 0 ){
            //     			                if(creep.transfer(warNuck,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            //     			                    creep.moveTo(warNuck);
            //     			                }
            //     			            }
            //     					}
            //                     }
    				    //     }
    			     //   }
    			    
    				    var tar = creep.room.find(FIND_CONSTRUCTION_SITES);
                        if(tar.length) {
                            if(creep.build(tar[0]) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(tar[0], {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }else{
                            try{
                                if(tar.length == 0 && Game.rooms[creep.pos.roomName].controller.level <= 7){
                                    if(Memory.creeps[creep.name].worklink != ''){
                                        var link3 = Game.getObjectById(Memory.creeps[creep.name].worklink);
                                        if(link3 && link3.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && creep.transfer(link3,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                            creep.moveTo(link3);
                                            creep.say('link');
                                        }
                                    }else{
                                        var targets = creep.room.storage
                            			if(targets.store.getUsedCapacity(RESOURCE_ENERGY) < 1000000){
                            			    if(creep.transfer(targets,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            			        creep.moveTo(targets,{visualizePathStyle: {stroke: '#FF66CC'}});
                            			    }
                            			}else{
                        			        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                                                creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#ffaa00'}});
                                            }
                            			}
                                    }
                                    
                                }
                            }catch(err){
                    	        console.log(err.message)
                    	    }
                        }
    				    
    				}
    			}
                
            }
    	    
        }catch(err){
            console.log(err.message)
        }
        
        
	    
	}
};

module.exports = roleTransfer;

// function checkAllStuta(towerList){
// 	var stuta = false
// 	for(var i in towerList){
// 		if(towerList[i].towerStuta){
// 			stuta = true
// 		}
// 	}
// 	return stuta
// }
