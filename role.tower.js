var roleTower = {
    
    /** @param {Creep} creep **/
    run: function(tower) { 
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
                    if(closestHostile) {
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
                                    structure.hits < 6000000;
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


