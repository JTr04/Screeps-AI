var roleMhar = require('role.mhar');
var Mhar = {
    run :function(){
        for(var i in mainRoom){
            for(var j in Memory.roomResource){
                if(mainRoom[i] == Memory.roomResource[j].roomName){
                    var index = Memory.roomResource[j].spawnResourceIndex
                    var ids = Memory.memorySource[index].mineralId
                    if(checkMineralAmount(ids)){
                        var spawnList =  Memory.roomResource[j].roomSpawn
                        for(var s in spawnList){
                            isCreepExist('mhar',mainRoom[i],spawnList[s],index)
                        }
                    }
                }
            }
        }
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'mhar'){
                roleMhar.run(creep);
            }
            
		}
    }
}

module.exports = Mhar;

// var mainRoom = ['E59N31','E59N39']

var mainRoom = []

/*
 *筛选相应的creep
 */
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
    var ULbody = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
	var sto = Memory.memorySource[num].stoId;
    var ter = Memory.memorySource[num].terminalId;
    var fac = Memory.memorySource[num].factoryId;
    
    var m = Memory.memorySource[num].mineralId;

	var pbcreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.roomSign == roomName)
	if(role == 'mhar'){
	    var newName = role+Game.time
        if(pbcreeps.length < 1){
            Game.spawns[spawnName].spawnCreep(ULbody ,newName,
            { memory: { role: role,spawnSign : spawnName,roomSign:roomName, worksto:sto , workter : ter, workmin : m,workfac:fac} } );
        }
    }else{
		console.log('【没有role的类型】');
    }

}

function checkMineralAmount(ids){
    var stuta = false
    var mineral = Game.getObjectById(ids)
    if(mineral.mineralAmount != 0){
        stuta = true
    }
    return stuta
}