/**
*after rcl 8 level
*/

var defensive = {
	run : function(){
	    
		for(var j in Memory.roomResource){
			var roomLevel = Game.rooms[Memory.roomResource[j].roomName].controller.level
			if(checkSafe(Memory.roomResource[j].roomName)){
			    warAction()
			}
			if(roomLevel == 8){
				var spawnList = Memory.roomResource[j].roomSpawn
				var num = Memory.roomResource[j].spawnResourceIndex;
				for(var s in spawnList){
					if(roomControllerFindConstructureSite(spawnList[s])){
						isCreepExist('maxbuilder',Memory.roomResource[j].roomName,spawnList[s],num)
					}
					
				}
					
			}
			
		}
				

		for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'maxbuilder'){
    			builderWorkAction(creep)
            }
            if(creep.memory.role == 'safeAttack'){
                attackAction(creep)
            }
            if(creep.memory.role == 'safeHeal'){
                healAction(creep)
            }
            
		}
	}
}
module.exports = defensive;


Memory.enemy = [
    
]

/*
 *筛选相应的creep
 *return creep
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
	var sto = Memory.memorySource[num].stoId;
	var link4 = Memory.memorySource[num].link4;
	var pbcreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.roomSign == roomName)
	if(role == 'maxbuilder' && pbcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 
			role, {memory: {role: role, roomSign: roomName,worksto:sto,worklink:link4 }});
    }else if(role == 'safeAttack' && pbcreeps.length < 1 ){
        Game.spawns[spawnName].spawnCreep([ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK], 
			role, {memory: {role: role, roomSign: roomName}});
    }else if(role == 'safeHeal' && pbcreeps.length < 1){
        Game.spawns[spawnName].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], 
			role, {memory: {role: role, roomSign: roomName}});
    }else{
		console.log('【没有role的类型】');
    }

}

/*
*/
function roomControllerFindConstructureSite(spawnName){
	var stuta = false
	var roomController = Game.spawns[spawnName].room.controller
	var CONSTRUCTION_SITES_target = roomController.room.find(FIND_CONSTRUCTION_SITES)
	var STRUCTURE_target = roomController.room.find(FIND_STRUCTURES,{
		filter:(structure)=>{
			return (structure.structureType == STRUCTURE_WALL ||
				structure.structureType == STRUCTURE_RAMPART) &&
				structure.hits < 1000000
		}
	})
	if(CONSTRUCTION_SITES_target.length > 0 || STRUCTURE_target.length > 0 ){
		stuta = true
	}
	return stuta
}

function builderWorkAction(creep){
	if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
		creep.memory.building = false;
		creep.say('🔄 harvest');
	}
	if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
		creep.memory.building = true;
		creep.say('🚧 build');
	}

	if(creep.memory.building) {
		
		var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
		if(targets.length) {
			if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
			}
		}else{
			if(targets.length == 0){
				const target = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (
								structure.structureType == STRUCTURE_WALL ||
								structure.structureType == STRUCTURE_RAMPART 
								//|| structure.structureType == STRUCTURE_ROAD
						)	&&
							structure.hits < 10000000
					}
				});
				target.sort((a,b) => a.hits-b.hits);
				
				if(target.length > 0){
					if(creep.repair(target[0]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(target[0], {visualizePathStyle: {stroke: '#66FF33'}});
					}
				}else{
					if(target.length == 0){
						
						if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
							creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#ffaa00'}});
							creep.say('Bc');
						}   
					
					}
				}
			}
		}
	}
	else {
		var ids = Memory.creeps[creep.name].worksto;
		// var sourcea = Game.getObjectById(ids);
		var sourcea = Game.getObjectById(ids);
		if(creep.withdraw(sourcea,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(sourcea, {visualizePathStyle: {stroke: '#ffaa00'}});
		}
	}
}

function checkSafe(roomName){
    var stuta = false
    var roomController = Game.rooms[roomName].controller
    var target = roomController.room.find(FIND_HOSTILE_CREEPS,{
        filter : (creep) => {
                return (creep.getActiveBodyparts(ATTACK) > 0 ||
                creep.getActiveBodyparts(RANGED_ATTACK) > 0 ||
                creep.getActiveBodyparts(HEAL) > 0 )
                && creep.owner.username != 'Invader'
        }
    });
    if(target){
        var enemy = {}
        stuta = true
        for(var i in target){
            if(!checkEnemy(target[i])){
                enemy.id = target[i].id
                enemy.mainRoom = roomName
                enemy.owner = target[i].owner.username
                Memory.enemy.push(enemy)
            }
            
        }
    }
    return stuta
}

function checkEnemy(target){
    var task = Memory.enemy
    var stuta = false
    for(var i in task){
        if(task[i].id == target.id){
            stuta = true
        }
    }
    return stuta
}

function warAction(){
    var task = Memory.enemy
    for(var i in task){
        Game.notify(task[i].owner + '派兵到 ' + task[i].mainRoom + ' ，启动防御 ')
        for(var j in Memory.roomResource){
            if(task[i].mainRoom == Memory.roomResource[j].roomName){
                var spawn = Memory.roomResource[j].roomSpawn
                var num = Memory.roomResource[j].spawnResourceIndex
                for(var s in spawn){
                    isCreepExist('safeAttack',task[i].mainRoom,spawn[s],num)
                    isCreepExist('safeHeal',task[i].mainRoom,spawn[s],num)
                }
            }
        }
        
    }
    
}

function attackAction(creep){
    var task = Memory.enemy
    for(var i in task){
        var target = Game.getObjectById(task[i].id)
        if(target && cheackEnemyBody(target)){
            if(creep.pos.isNearTo(Game.creeps['safeHeal'])){
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }else{
                if(Game.creeps['safeHeal']){
                    creep.moveTo(Game.creeps['safeHeal'].pos)
                }
            }
        }else{
            Memory.enemy.splice(i,1)
            if(Memory.enemy.length == 0){
                Game.notify('问题解决')
            }
            Game.notify('hite one !!!')
        }
    }
    
}

function healAction(creep){
    var target = Game.creeps['safeAttack']
    if(creep.pos.isNearTo(target)){
        if(target.hits < target.hitsMax){
            if(creep.heal(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }else{
        if(target){
            creep.moveTo(target.pos)
        }
    }
}

function cheackEnemyBody(target){
    var stuta = false
    var attack =  target.getActiveBodyparts(ATTACK)
    var ranged = target.getActiveBodyparts(RANGED_ATTACK)
    var heal =  target.getActiveBodyparts(HEAL)
    if(attack != 0 || ranged != 0 || heal != 0){
        stuta = true
    }
    return stuta
}
