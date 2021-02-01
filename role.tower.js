var roleTower = {
    
    /** @param {Creep} creep **/
    run: function(tower) { 
                
        checkTowerStuta();
        
        if(tower){
		    var fn;
		    for(var i in Memory.friendName){
		        fn = Memory.friendName[i]
		    }
			var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS,{
			    filter : s => s.owner.username != fn
			});
			for(var r in Memory.roomResource){
			    if(tower.room.name == Memory.roomResource[r].roomName){
			        var towerList = Memory.roomResource[r].towerList
			        for(var t in towerList){
			            var allTower = Game.getObjectById(towerList[t])
			            if(allTower && closestHostile && cheackEnemyBody(closestHostile)) {
        			        allTower.attack(closestHostile);
            			}else{
            			    var wallRepairStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            				filter: (structure) => {
            					return (structure.structureType == STRUCTURE_ROAD ||
            						structure.structureType == STRUCTURE_CONTAINER) &&
            						structure.hits < structure.hitsMax;
            			    	}
            			    });
                        
            			    if(wallRepairStructure){
            				    allTower.repair(wallRepairStructure);
            			    }else{
            			        var ramp = tower.pos.findClosestByRange(FIND_STRUCTURES,{
            			            filter:(structure) =>{
            			                return (structure.structureType == STRUCTURE_RAMPART) &&
            			                structure.hits < 100000;
            			            }
            			        });
            			        if(ramp){
            			            allTower.repair(ramp);
            			        }
            			    }
            			}
			        }
			    }
			}
			
		}

    }
};

module.exports = roleTower;

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
            },{
                towerId:'5ff4a18738ed907fbe8e5e3a',
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
            }
        ] 
    },{
       roomName:'E43N42',
        towerList:[
            {
                towerId:'60129200f67fb479db7e80aa',
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
function cheackEnemyBody(target){
    var stuta = false
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
    
    return stuta
}

// var roleTower = {
    
//     /** @param {Creep} creep **/
//     run: function() { 
                
//         checkTowerStuta();

// 		checkTowerEnmy();
        
//         checkTowerTarget();
        
//         if(Memory.towerTarget.length == 0){
// 			delete Memory.towerTarget	    
// 		}
// 		if(Memory.towerEnmy.length == 0){
// 		    delete Memory.towerEnmy
// 		}
		
// 	    try{
// 	        for(var r in Memory.roomResource){
//     		    if(Memory.towerEnmy && Memory.towerEnmy.length > 0){
//     				for(var e in Memory.towerEnmy){
//     					if(Memory.roomResource[r].roomName == Memory.towerEnmy[e].mainroom){
//     						var towerList = Memory.roomResource[r].towerList
//     						for(var t in towerList){
//     		                   	var allTower = Game.getObjectById(towerList[t])
//     		                   	if(allTower){
//     		                   	    var HostileCreep = Game.getObjectById(Memory.towerEnmy[e].id)
//     							    if(HostileCreep){
//     							        allTower.attack(HostileCreep);
//     							    }else{
//     								    Memory.towerEnmy.splice(e,1)
//     							    }
//     		                   	}
//     		                }
//     		            }
//     		        }
//     		    }else{
    		        
//     		        if(Memory.towerTarget && Memory.towerTarget.length > 0){
//     		            for(var i in Memory.towerTarget){
//     				        if(Memory.roomResource[r].roomName == Memory.towerTarget[i].mainroom){
//     				            var towerList = Memory.roomResource[r].towerList
//     							for(var t in towerList){
//     					        	var allTower = Game.getObjectById(towerList[t])
//     			                	if(allTower){
//     								    var repairStructurn = Game.getObjectById(Memory.towerTarget[i].id)
//     		                	        var maxHits = Memory.towerTarget[i].maxHit
//     									if(repairStructurn.hits < maxHits){
//     										allTower.repair(repairStructurn);
//     									}else{
//     										Memory.towerTarget.splice(i,1)
//     									}
//     			                	}
//     				            }
//     				        }
//     		            }
//     		        }
//     		    }
//     		}
// 	    }catch(err){
// 	        console.log(err.message)
// 	    }
		
//     }
    
    
// };

// module.exports = roleTower;


// Memory.needEnergyTower = [
//     {
//         roomName:'sim',
//         towerList:[
//             {
//                 towerId:'dda5d9e58a455ecdf38da862',
//                 towerStuta:true
//             },{
//                 towerId:'b5e335d814843064b3d13424',
//                 towerStuta:true
//             },{
//                 towerId:'4b1b9e506e4c83a8712f6db6',
//                 towerStuta:true
//             }   
//         ]
//     }
// ]

// function checkTowerStuta(){
//     for(var i in Memory.needEnergyTower){
//         for(var j in Memory.needEnergyTower[i].towerList){
//             var target = Game.getObjectById(Memory.needEnergyTower[i].towerList[j].towerId)
//             if(target && target.store.getUsedCapacity(RESOURCE_ENERGY) < 550){
//                 Memory.needEnergyTower[i].towerList[j].towerStuta = true;
//             }
//         }
//     }
      
// }

// function cheackEnemyBody(target){
//     var stuta = false
//     if(target){
//         var attack =  target.getActiveBodyparts(ATTACK)
//         var ranged = target.getActiveBodyparts(RANGED_ATTACK)
//         var heal =  target.getActiveBodyparts(HEAL)
//     	var work = target.getActiveBodyparts(WORK)
//     	if(target.pos.x == 0 || target.pos.y == 0 || target.pos.x == 49 ||target.pos.y == 49){
//     		stuta = false
//     	}else{
//     		if(attack != 0 || ranged != 0 || heal != 0 || work != 0){
//     			stuta = true
//     		}
//     	}
//     }
    
    
//     return stuta
// }

// function checkTowerEnmy(){
//     if(!Memory.towerEnmy) Memory.towerEnmy = []
//     var fn;
// 	for(var i in Memory.friendName){
// 		fn = Memory.friendName[i]
// 	}
// 	for(var r in Memory.roomResource){
// 		var roomName = Memory.roomResource[r].roomName
// 		var creepTarget = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS,{
// 			filter : s => s.owner.username != fn
// 		});
// 		if(creepTarget.length > 0){
// 			for(var c in creepTarget){
// 				if(!checkTask(creepTarget[c],Memory.towerEnmy) && cheackEnemyBody(creepTarget[c])){
// 					var task = {}
// 					var ids = creepTarget[c].id
// 					task.id = ids
// 					task.ownername = creepTarget[c].owner.username
// 					task.mainroom = roomName
// 					task.type = 'hostileCreep'
// 					Memory.towerEnmy.push(task)
// 					console.log(creepTarget[c].owner.username+' 向 '+roomName+' 派【'+creepTarget.length+'】兵')
// 				}
// 			}
// 		}
// 	}
// }

// function checkTowerTarget(){
//     if(!Memory.towerTarget)Memory.towerTarget = []
// 	for(var r in Memory.roomResource){
// 		var roomName = Memory.roomResource[r].roomName
		
// 		var RepairStructure = Game.rooms[roomName].find(FIND_STRUCTURES, {
// 			filter: (structure) => {
// 				return (structure.structureType == STRUCTURE_ROAD ||
// 					structure.structureType == STRUCTURE_CONTAINER) &&
// 					structure.hits < structure.hitsMax;
// 			}
// 		});
// 		var ramp = Game.rooms[roomName].find(FIND_STRUCTURES,{
// 			filter:(structure) =>{
// 				return (structure.structureType == STRUCTURE_RAMPART) &&
// 				structure.hits < 100000;
// 			}
// 		});
		
// 		if(RepairStructure){
// 			for(var w in RepairStructure){
// 				if(!checkTask(RepairStructure[w],Memory.towerTarget)){
// 					var rtask = {}
// 					var ids = RepairStructure[w].id
// 					rtask.mainroom = roomName
// 					rtask.id = ids
// 					rtask.type = 'repair'
// 					rtask.maxHit = RepairStructure[w].hitsMax
// 					Memory.towerTarget.push(rtask)
// 				}
// 			}
// 		}
// 		if(ramp){
// 			for(var ra in ramp){
// 				if(!checkTask(ramp[ra],Memory.towerTarger)){
// 					var ratask = {}
// 					var ids = ramp[ra].id
// 					ratask.id = ids
// 					ratask.mainroom = roomName
// 					ratask.type = 'defend'
// 					ratask.maxHit = 100000
// 					Memory.towerTarget.push(ratask)
// 				}
// 			}
// 		}
// 	}
// }

// function checkTask(target,taskList){
// 	var stuta = false
// 	for(var i in taskList){
// 		if(target.id == taskList[i].id){
// 			stuta = true
// 		}
// 	}
// 	return stuta
// }

