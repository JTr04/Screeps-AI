var maxCreep = {
    run :function(stuta){
        if(stuta){
            isCreepExist('maxcreep','E51N41','Spawn3',2)
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
    
    if(creep.memory.traing && creep.store[RESOURCE_MIST] == 0) {
        creep.memory.traing = false;
    }
    if(!creep.memory.traing && creep.store.getFreeCapacity() == 0) {
        creep.memory.traing = true;
    }
    if(creep.memory.traing){
        var target = Game.getObjectById(Memory.creeps[creep.name].worksto)
        if(creep.transfer(target,RESOURCE_MIST) == ERR_NOT_IN_RANGE){
            // var path = moveOp(creep,target)
            creep.moveTo(target)
        }
    }else{
        if(creep.room.name != 'E50N39'){
            creep.moveTo(Game.flags.Flag3)
            return;
        }
        var mist = creep.room.find(FIND_DEPOSITS,{
            filter : (t) => t.lastCooldown <= 10
        })
        if(creep.harvest(mist[0]) == ERR_NOT_IN_RANGE){
            // creep.moveByPath(moveOp(creep,mist))
            creep.moveTo(mist[0])
        }
    }
}

function moveOp(creep,target){
	var path = creep.pos.findPathTo(target,{maxOps:200});
	if( !path.length) {
		path = creep.pos.findPathTo(target,
			{maxOps: 1000, ignoreCreeps: true});
	}
	return path
}
