var roleTower = {
    
    /** @param {Creep} creep **/
    run: function() { 
        checkTowerStuta();

		checkTowerEnmy();
        
        if(Game.time % 100 == 0){
            checkTowerTarget();
        }
        
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
    			                	if(allTower){
    									if(repairStructurn && repairStructurn.hits < maxHits){
    										allTower.repair(repairStructurn);
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
        roomName:'E59N31',
        towerList:[
            {
                towerId:'600e359069f8bc7830731160',
                towerStuta:true
            },{
                towerId:'600e391747ffce39511a7f55',
                towerStuta:true
            },{
                towerId:'600e3d5423de66123c641a2a',
                towerStuta:true
            },{
                towerId:'603860f7434e3b5a3cb4580e',
                towerStuta:true
            },{
                towerId:'6038657dd62436ffcf36272d',
                towerStuta:true
            },{
                towerId:'603869c3912fec3f35f61d9e',
                towerStuta:true
            }   
        ]
    },{
        roomName:'E59N39',
        towerList:[
            {
                towerId:'6020bdb75a1b6044673c3d0d',
                towerStuta:true
            },{
                towerId:'6020c0c626d3d85b03bc1e13',
                towerStuta:true
            },{
                towerId:'6020c58502609a01b6678a7f',
                towerStuta:true
            },{
                towerId:'60376687fc4bbe95c1aab4f0',
                towerStuta:true
            },{
                towerId:'603769b93f89d2749222e979',
                towerStuta:true
            },{
                towerId:'60376edc210d07ed47f43779',
                towerStuta:true
            }    
        ]
    },{
        roomName:'E51N41',
        towerList:[
            {
                towerId:'602a547407d269619d5094d9',
                towerStuta:true
            },{
                towerId:'602a458ab86cd490ee8106fc',
                towerStuta:true
            },{
                towerId:'602a3681fe9600587ab203e1',
                towerStuta:true
            },{
                towerId:'603769dffe96000da7b75d85',
                towerStuta:true
            },{
                towerId:'60376f793df0b0352b1f3157',
                towerStuta:true
            },{
                towerId:'603773be89517538a4c1c209',
                towerStuta:true
            }
        ]
    },{
        roomName:'E46N43',
        towerList:[
            {
                towerId:'5fea1c041ba3a207b32f9f09',
                towerStuta:true
            },{
                towerId:'5ff07e4b7537e41cd3f72bb7',
                towerStuta:true
            },{
                towerId:'6005abfecce6adc8c0cb8a6b',
                towerStuta:true
            },{
                towerId:'60348fdb6618fd599c93191a',
                towerStuta:true
            },{
                towerId:'603494ad0c8afa1dd6853bb9',
                towerStuta:true
            },{
                towerId:'603498c0d01f44b28503c86a',
                towerStuta:true
            }
        ]
    },{
       roomName:'E49N38',
        towerList:[
            {
                towerId:'6003903fc1ec6c46b62bd431',
                towerStuta:true
            },{
                towerId:'600fa47ec609bd587be24f73',
                towerStuta:true
            },{
                towerId:'602a91b6d2b0866af61022ed',
                towerStuta:true
            }
        ] 
    },{
       roomName:'E43N42',
        towerList:[
            {
                towerId:'60129200f67fb479db7e80aa',
                towerStuta:true
            },{
                towerId:'601ca1fc9d7c675adc83930b',
                towerStuta:true
            },{
                towerId:'6034acac37ff393a30524820',
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
				if(!checkTask(creepTarget[c],Memory.towerEnmy) && cheackEnemyBody(creepTarget[c])){
					var task = {}
					var ids = creepTarget[c].id
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
		
		var RepairStructure = Game.rooms[roomName].find(FIND_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_ROAD ||
					structure.structureType == STRUCTURE_CONTAINER) &&
					structure.hits < structure.hitsMax;
			}
		});
		var ramp = Game.rooms[roomName].find(FIND_STRUCTURES,{
			filter:(structure) =>{
				return (structure.structureType == STRUCTURE_RAMPART) &&
				structure.hits < 100000;
			}
		});
		
		if(RepairStructure){
			for(var w in RepairStructure){
				if(!checkTask(RepairStructure[w],Memory.towerTarget)){
					var rtask = {}
					var ids = RepairStructure[w].id
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
				if(!checkTask(ramp[ra],Memory.towerTarger)){
					var ratask = {}
					var ids = ramp[ra].id
					ratask.id = ids
					ratask.mainroom = roomName
					ratask.type = 'defend'
					ratask.maxHit = 100000
					Memory.towerTarget.push(ratask)
				}
			}
		}
	}
}

function checkTask(target,taskList){
	var stuta = false
	for(var i in taskList){
		if(target.id == taskList[i].id){
			stuta = true
		}
	}
	return stuta
}
