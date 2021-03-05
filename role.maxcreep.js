var maxCreep = {
    run :function(){
        var stuta = Game.flags.Flag3
        if(stuta){
            isCreepExist('maxcreep','E49N41','Spawn1',0)
        }
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'maxcreep'){
                action(creep)
            }
        }
    }
        
}            
            
            

module.exports = maxCreep;

function isCreepExist(role,roomName,spawnName,num){
	if((_.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.roomSign == roomName)) == 0){
        generateCreep(role,roomName,spawnName,num);
	console.log(spawnName+' Spawning new '+roomName +' : '+role);
    }
}

/*
 *生产相应的creep
 */
function generateCreep(role,roomName,spawnName,num){
	var sto = Memory.memorySource[num].stoId;
	var pbcreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.roomSign == roomName)
	if(role == 'maxcreep' && pbcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([MOVE,MOVE,WORK,WORK,CARRY,CARRY], 
			role, {memory: {role: role, roomSign: roomName,worksto:sto}});
	}else{
		console.log('【没有role的类型】');
	}

}

function action(creep){
    var t = creep.ticksToLive
    var num = creep.store.getCapacity()
    var source 
    if(t < 100){
    	if(creep.store.getFreeCapacity() == num){
    		creep.suicide()
    	}else{
    	    var target = Game.getObjectById(Memory.creeps[creep.name].worksto)
    		for(var i in Object.keys(creep.store)){
    			source = Object.keys(creep.store)[i]
    		}
    		try{
			if(creep.transfer(target,source) == ERR_NOT_IN_RANGE){
				creep.moveTo(target)
			}
    		}catch(err){
    		    console.log(err.message)
    		}
    		
    	}
    }else{
        var source
        for(var i in Object.keys(creep.store)){
		source = Object.keys(creep.store)[i]
	}
        if(creep.memory.traing && creep.store[RESOURCE_MIST] == 0) {
            creep.memory.traing = false;
        }
        if(!creep.memory.traing && creep.store.getFreeCapacity() == 0) {
            creep.memory.traing = true;
        }
        if(creep.memory.traing){
            var target = Game.getObjectById(Memory.creeps[creep.name].worksto)
            
            if(creep.transfer(target,source) == ERR_NOT_IN_RANGE){
                // var path = moveOp(creep,target)
                creep.moveTo(target)
            }
        }else{
            var ROOM 
            try{
                ROOM = Game.flags.Flag3.pos.roomName
                if(creep.room.name != ROOM){
                    creep.moveTo(Game.flags.Flag3)
                    return;
                }
            }catch(err){
                console.log('【deposits task finish】:'+err.message)
                if(creep.store.getFreeCapacity() == num){
            		creep.suicide()
            	}
            }
            
            var mist = creep.room.find(FIND_DEPOSITS,{
                filter : (t) => t.lastCooldown <= 50
            })
            if(mist.length){
               if(creep.harvest(mist[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(mist[0])
                } 
            }else{
                try{
                    Game.flags.Flag3.remove()
                    creep.memory.traing = true;
		}catch(err){
		    console.log(err.message)
		}
            }
            
        }
    }
    
}

