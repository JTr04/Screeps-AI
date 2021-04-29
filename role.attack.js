/**
*一体机两个旗
* 一个固定attack为移动到目标房间的旗帜
* 一个是优先攻击旗帜 需要手动输入旗帜名
*/
var roleAttacker = {
    run: function() {
		if(Memory.mixwWarTask && Memory.mixwWarTask.length == 0)delete Memory.mixwWarTask
		if(Memory.mixwWarTask){
			var task = Memory.mixwWarTask
			var roomMsg = Memory.roomResource
			for(var i in task){
				for(var r in roomMsg){
				    try{
				        if(task[i].mainRoom == roomMsg[r].roomName){
    						var spawnList = roomMsg[r].roomSpawn
    						for(var s in spawnList){
    						//	for(var n=0;n<task[i].num;n++){
    						    generateCreep('RA',task[i].mainRoom,task[i].targetRoom,task[i].flagName,spawnList[s],bodyFree(task[i].body),task[i].boost,i)
    						//	}	
    						}
				        }
					}catch(e){
					    console.log('<text style="color:yellow;font-size:13px;">【一体机 RA creep 生产中】</text>')
					}
				}
			}
		}
		
		for(var name in Game.creeps){
		    var creep = Game.creeps[name]
		    if(creep.memory.role == 'RA'){
		        workAction(creep)
		    }
		}
	}
};

module.exports = roleAttacker;

var boostLabMsg = {
    'sim':[
        {
            boostLabId:'53dd2ef607bf095762b707da',
            boostLabMin:'UO'
        },{
            boostLabId:'6dcb4fbe1801023b727b87d7',
            boostLabMin:'KO'
        }   
    ]

}
/*
 *生产相应的creep
 */
function generateCreep(role,roomName,targetRoom,flagName,spawnName,body,boost,i){

	var Gcreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.roomSign == roomName)
	var name = role + '_' + targetRoom +'_'+ roomName
	if(role == 'RA' && Gcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep(body,name, {memory: {role: role, roomSign: roomName,flagname:flagName,boost:boost}}) == OK
    }else{
        console.log('<text style="color:yellow;font-size:13px;">【一体机RA creep 生产中... 战争任务 '+ Memory.mixwWarTask[i].targetRoom+' 删除】</text>')
    	Memory.mixwWarTask.splice(i,1)	 
    }
}
function workAction(creep){
    var warFlag = Game.flags.attack
	if(creep.memory.boost){
		var boostFlag = Game.flags['boost'+creep.room.name];
		if(boostFlag){
			if(!creep.pos.isEqualTo(boostFlag)){
			   creep.moveTo(boostFlag)
			}else{
				var boostLabList = boostLabMsg[creep.room.name]
				for(var l in boostLabList){
					var target = Game.getObjectById(boostLabList[l].boostLabId)
					if(target){
						target.boostCreep(creep)
					}
				}
				creep.memory.boost = false;
			} 
		}else{
			creep.say('boostFlag?')
		}
		
	}else{
		if(warFlag){
			if(creep.pos.roomName != warFlag.pos.roomName){
				creep.moveTo(Game.flags.attack)
				creep.heal(creep)
				return;
			}
	        var flagWar = Game.flags[creep.memory.flagname]
	        var target = creep.room.find(FIND_HOSTILE_CREEPS)[0];
	        
			if(flagWar){
			    try{
			        target = Game.getObjectById(creep.room.lookForAt(LOOK_STRUCTURES, flagWar)[0].id);
			    }catch(e){
			        console.log('<text style="color:yellow;font-size:13px;">【目标建筑已消失】</text>')
			        if(flagWar)flagWar.remove();
			    }
				
			}
		    if(!target){
			    try{
			        target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES,{
    			        filter:(S) => S.structureType !== STRUCTURE_CONTROLLER && S.structureType !== STRUCTURE_WALL &&  S.structureType !== STRUCTURE_RAMPART && S.structureType !== STRUCTURE_ROAD 
    			    });
			    }catch(e){
			        console.log('<text style="color:yellow;font-size:13px;">【'+creep.pos.roomName+' 房间建筑已清除】</text>')
			        if(Game.flags['attack'])Game.flags['attack'].remove()
			    }
			    
			}
			
			
			   
			if(creep.getActiveBodyparts(HEAL) != 0)creep.heal(creep) 
			if(creep.getActiveBodyparts(ATTACK) != 0 || creep.getActiveBodyparts(RANGED_ATTACK) != 0){
				attackAction(creep,target)
			}
		}else{
			creep.say('🏴‍☠️呢?')
		}
	}
    
}


function attackAction(creep,target){
	var found = creep.room.lookForAtArea(LOOK_CREEPS,(creep.pos.y - 3),(creep.pos.x - 3),(creep.pos.y + 3),(creep.pos.x + 3),true)
	if(found.length > 0){
	    for(var f in found){
	        if(!found[f].creep.my){
	            target = Game.getObjectById(found[f].creep.id)
	        }
	    }
	}

	if(target){
		if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE){
			creep.moveTo(target);
		}
	}
}


global.mixwWarTask = function(mainRoom,targetRoom,flagName,body,boolean){
	if(!Memory.mixwWarTask)Memory.mixwWarTask = []
	var ids = mainRoom + targetRoom
	if(!checkMixwWarTask(ids,Memory.mixwWarTask)){
		var task = {}
		task.mainRoom = mainRoom
		task.targetRoom = targetRoom
		task.flagName = flagName
		task.body = body
		task.boost = boolean
		Memory.mixwWarTask.push(task)
		return '<text style="color:red;font-size:13px;">【战争任务添加成功】</text> 目标房间：'+targetRoom+' 战争等级：一体机'
	}else{
		return '<text style="color:red;font-size:13px;">【任务已存在】</text>'
	}
}
global.checkMixwWarTask = function(ids,taskList){
	var stuta = false;
	for(var i in taskList){
		var ID =taskList[i].mainRoom + taskList[i].targetRoom
		if(ID == ids){
			stuta = true
		}
	}
	return stuta
}