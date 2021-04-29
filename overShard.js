var overShard = {
    run:function(){
        if(Game.time % 1600 == 0){
          isCreepExist('ov','W36N9','Spawn1')  
        }
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'ov'){
                creepAction(creep)
            }
        }
        
    }
}
module.exports = overShard;

function isCreepExist(role,roomName,spawnName){
	if((_.filter(Game.creeps, (creep) => creep.memory.role == role)) == 0){
        generateCreep(role,roomName,spawnName);
		console.log(spawnName+' Spawning new '+roomName +' : '+role);
    }
}

function generateCreep(role,roomName,spawnName){

	var pbcreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role)
	if(role == 'ov' && pbcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([MOVE,MOVE], 
			'P', {memory: {role: role}});
    }else{
		console.log('【没有role的类型】');
    }

}
// function saveMsg(creep){
//     var shardMsg = JSON.parse(InterShardMemory.getLocal() || "{}")
//     var creepName = creep.name
//     if(!shardMsg.creepName)shardMsg.creepName = {}
//     shardMsg.creepName['role'] = creep.memory.role;
//     InterShardMemory.setLocal(JSON.stringify(shardMsg))
// }

// function findLastShardMsg(creep){
//     var lastShardMsg = JSON.parse(InterShardMemory.getRemote('shard3')|| "{}");
//     var creepName = creep.name;
//     var creepMsg = lastShardMsg.creepName
//     creep.memory.role = creepMsg.role
// }

function creepAction(creep){
    if(Game.shard.name == 'shard3'){
        creep.moveTo(Game.flags.shard2)
        return;
    }
    if(Game.time % 10 == 0){
        if (Game.cpu.bucket == 10000){
            console.log("【shard2 已有"+Game.cpu.bucket+"cpu,开始搓Pixel】");
            Game.cpu.generatePixel();
        } 
    }
    if(Game.flags.Flag1){
        if(creep.room.name == Game.flags.Flag1.pos.roomName){
            if(!creep.pos.isEqualTo(Game.flags.Flag1)){
                creep.moveTo(Game.flags.Flag1)
            }
            creep.say('o(╥﹏╥)o',true)
        }else{
            creep.moveTo(Game.flags.Flag1)
            creep.say('o(╥﹏╥)o',true)
        }
    }
    
}