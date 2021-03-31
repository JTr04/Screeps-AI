var roleTower = {
    
    /** @param {Creep} creep **/
    run: function() { 
        checkTowerStuta();

		checkTowerEnmy();
        // if(Game.time % 100 == 0){
            checkTowerTarget();
        // }
        
        if(Memory.towerTarget && Memory.towerTarget.length == 0){
			delete Memory.towerTarget	    
		}
		if(Memory.towerEnmy && Memory.towerEnmy.length == 0){
		    delete Memory.towerEnmy
		}
		
	       //try{
	        for(var r in Memory.roomResource){
    		    if(Memory.towerEnmy && Memory.towerEnmy.length > 0){
    				for(var e in Memory.towerEnmy){
    					if(Memory.roomResource[r].roomName == Memory.towerEnmy[e].mainroom){
    						var towerList = Memory.roomResource[r].towerList
   	                   	    var HostileCreep = Game.getObjectById(Memory.towerEnmy[e].id)
    						for(var t in towerList){    		                   	
								var allTower = Game.getObjectById(towerList[t])
    		                   	if(allTower){
    							    if(HostileCreep){
    							        allTower.attack(HostileCreep);
    							    }else{
    								    Memory.towerEnmy.splice(e,1)
    							    }
    		                   	}
    		                }
    		            }
    		        }
    		    }else{
    		        
    		        if(Memory.towerTarget && Memory.towerTarget.length > 0){
    		            for(var i in Memory.towerTarget){
    				        if(Memory.roomResource[r].roomName == Memory.towerTarget[i].mainroom){
    				            var towerList = Memory.roomResource[r].towerList
    				            var repairStructurn = Game.getObjectById(Memory.towerTarget[i].id)
	                	        var maxHits = Memory.towerTarget[i].maxHit
    							for(var t in towerList){
    					        	var allTower = Game.getObjectById(towerList[t])
    			                	if(allTower && allTower.store.getUsedCapacity(RESOURCE_ENERGY) > 500){
    									if(repairStructurn && repairStructurn.hits < maxHits){
    									   // if(allTower.pos.roomName == repairStructurn.pos.roomName){
    									        allTower.repair(repairStructurn);
    									   // }
    									}else{
    										Memory.towerTarget.splice(i,1)
    									}
    			                	}	
    				            }
    				        }
    		            }
    		        }
    		    }
    		}
	   // }catch(err){
	   //     console.log(err.message)
	   // }
		
    }
    
    
};

module.exports = roleTower;

Memory.needEnergyTower = [
    {
        roomName:'W36N9',
        towerList:[
            {
                towerId:'604773a8434e3b067fba0255',
                towerStuta:true
            },{
                towerId:'6050d35e07d2697a225f700f',
                towerStuta:true
            }
        ]
    },{
        roomName:'W39N6',
        towerList:[
            {
                towerId:'60596643780122efba180e78',
                towerStuta:true
            },{
                towerId:'605fe00b9a82e81bfcee014c',
                towerStuta:true
            }
        ]
    }
]

function checkTowerStuta(){
    for(var i in Memory.needEnergyTower){
        for(var j in Memory.needEnergyTower[i].towerList){
            var target = Game.getObjectById(Memory.needEnergyTower[i].towerList[j].towerId)
            if(target && target.store.getUsedCapacity(RESOURCE_ENERGY) < 550){
                Memory.needEnergyTower[i].towerList[j].towerStuta = true;
            }
        }
    }
      
}

function cheackEnemyBody(target){
    var stuta = false
    if(target){
        var attack =  target.getActiveBodyparts(ATTACK)
        var ranged = target.getActiveBodyparts(RANGED_ATTACK)
        var heal =  target.getActiveBodyparts(HEAL)
    	var work = target.getActiveBodyparts(WORK)
    	if(target.pos.x == 0 || target.pos.y == 0 || target.pos.x == 49 ||target.pos.y == 49){
    		stuta = false
    	}else{
    		if(attack != 0 || ranged != 0 || heal != 0 || work != 0){
    			stuta = true
    		}
    	}
    }
    
    
    return stuta
}

function checkTowerEnmy(){
    if(!Memory.towerEnmy) Memory.towerEnmy = []
    var fn;
	for(var i in Memory.friendName){
		fn = Memory.friendName[i]
	}
	for(var r in Memory.roomResource){
		var roomName = Memory.roomResource[r].roomName
		var creepTarget = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS,{
			filter : s => s.owner.username != fn
		});
		if(creepTarget.length > 0){
			for(var c in creepTarget){
			    var ids = creepTarget[c].id
				if(!checkTask(ids,Memory.towerEnmy) && cheackEnemyBody(creepTarget[c])){
					var task = {}
					task.id = ids
					task.ownername = creepTarget[c].owner.username
					task.mainroom = roomName
					task.type = 'hostileCreep'
					Memory.towerEnmy.push(task)
					console.log(creepTarget[c].owner.username+' 向 '+roomName+' 派【'+creepTarget.length+'】兵')
				}
			}
		}
	}
}

function checkTowerTarget(){
    if(!Memory.towerTarget)Memory.towerTarget = []
	for(var r in Memory.roomResource){
		var roomName = Memory.roomResource[r].roomName
		var RepairStructure
		if(Game.rooms[roomName].controller.level <= 4){
		    RepairStructure = Game.rooms[roomName].find(FIND_STRUCTURES, {
    			filter: (structure) => {
    				return (structure.structureType == STRUCTURE_ROAD 
    				||	structure.structureType == STRUCTURE_CONTAINER
    				) &&
    					structure.hits < structure.hitsMax;
    			}
    		});
		}else{
		    RepairStructure = Game.rooms[roomName].find(FIND_STRUCTURES, {
    			filter: (structure) => {
    				return (structure.structureType == STRUCTURE_ROAD 
    				// ||	structure.structureType == STRUCTURE_CONTAINER
    				) &&
    					structure.hits < structure.hitsMax;
    			}
    		});
		}
		
		var ramp = Game.rooms[roomName].find(FIND_STRUCTURES,{
			filter:(structure) =>{
				return (structure.structureType == STRUCTURE_RAMPART) &&
				structure.hits < 100000;
			}
		});
		
		if(RepairStructure){
			for(var w in RepairStructure){
		        var ids = RepairStructure[w].id
				if(!checkTask(ids,Memory.towerTarget)){
					var rtask = {}
					rtask.mainroom = roomName
					rtask.id = ids
					rtask.type = 'repair'
					rtask.maxHit = RepairStructure[w].hitsMax
					Memory.towerTarget.push(rtask)
				}
			}
		}
		if(ramp){
			for(var ra in ramp){
			    var ids = ramp[ra].id
				if(!checkTask(ids,Memory.towerTarget)){
					var ratask = {}
					ratask.id = ids
					ratask.mainroom = roomName
					ratask.type = 'defend'
					ratask.maxHit = 3000000
					Memory.towerTarget.push(ratask)
				}
			}
		}
	}
}

function checkTask(target,taskList){
	var stuta = false
	for(var i in taskList){
		if(taskList[i].id == target){
			stuta = true
		}
	}
	return stuta
}
