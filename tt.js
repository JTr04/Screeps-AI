/*
*需要插旗 flagName ：source+'roomName'
*/


/**
*@param {roomName} 目标房间
*@param {targetid} 目标建筑
*@param {istructionid} 存储建筑
*@param {source} 目标资源
*/
var tt = {
    run:function(roomName,targetid,istructionid,source){
        
        if(creep.memory.traning && creep.store[source] == 0) {
            creep.memory.traning = false;
	    }
	    if(!creep.memory.traning && creep.store.getFreeCapacity() == 0) {
	        creep.memory.traning = true;
	    }
        if(creep.memory.traning){
    
            var targetS = Game.getObjectById(istructionid);
			if(!tagretS) console.log('目标不存在')

            if(targetS && targetS.store.getFreeCapacity(source) > 0){
                if(creep.transfer(targetS,source) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targetS);
                }
            }
            
        }else{
			if(creep.room.name != roomName){
				var flagName = source+'roomName'
				var targetFlag = Game.flags.flagName
				if(!targetFlag)creep.say('🚩呢?')
				creep.moveTo(targetFlag)
				return
			}
            var ter = Game.getObjectById(targetid);

			if(!ter) console.log('目标不存在')
			if(!checkSource(targetid,source)) console.log('资源不存在')

            if(ter && ter.store.getUsedCapacity(source) > 0){
                if(creep.withdraw(ter, source) == ERR_NOT_IN_RANGE) {
        			creep.moveTo(ter);
            	}
            }
        }
    }
}
module.exports= tt;

function checkSource(targetid,source){
	var stuta = false
	var sources = Object.keys(Game.getObjectById(targetid))
	for(var i in sources){
		if(source == sources[i]){
			stuta = true
		}
	}
	return stuta
}