var factory = {
    run : function(){
        
        for(var i in mainRoom){
			for(var j in Memory.roomResource){
			    if(mainRoom[i] == Memory.roomResource[j].roomName){
			        var num = Memory.roomResource[j].spawnResourceIndex;
    			    var min = Memory.roomResource[j].mineralName
    			    var fac = Game.getObjectById(Memory.memorySource[num].factoryId)
    			    var sto = Game.getObjectById(Memory.memorySource[num].stoId)
    			    if(fac){
    			        if(Game.time%1000){
    			            if(fac.store.getUsedCapacity(bar[num]) < 10000){
            			        if(fac.store.getUsedCapacity(RESOURCE_ENERGY) > 200 && fac.store.getUsedCapacity(min) > 1000){
            			            fac.produce(bar[num])
            			        }
    			            }
    			        }
    			        if(Game.time % 100){
    			            if(sto.store.getUsedCapacity(RESOURCE_ENERGY) > 100000){
        			            if(fac.store.getUsedCapacity(RESOURCE_BATTERY) < 20000 && fac.store.getUsedCapacity(RESOURCE_ENERGY) > 15000){
        			                fac.produce(RESOURCE_BATTERY)
        			            }
    			            }else{
    			                if(fac.store.getUsedCapacity(RESOURCE_BATTERY) > 0){
    			                    fac.produce(RESOURCE_ENERGY)
    			                }
    			            }
    			        }
    			    }
			    }
			}
        }
    }
}

module.exports = factory;

var mainRoom = ['E59N31','E59N39']

var bar = [RESOURCE_ZYNTHIUM_BAR,RESOURCE_OXIDANT]
