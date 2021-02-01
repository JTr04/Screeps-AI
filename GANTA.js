var GANTA = {
	run : function(mainRoom,targetRoom,num){
		var spawnList
		for(var j in Memory.roomResource){
			if(Memory.roomResource[j].roomName == targetRoom){
				spawnList = Memory.roomResource[j].roomSpawn
			}
		}
		if(!Game.rooms[targetRoom]){
			generateCreep('Gtough',mainRoom,targetRoom,spawnList[s],0)
		}else{
			if(checkRoomTower(targetRoom)){
				for(var i=0;i<num;i++){
					for(var s in spawnList){
						generateCreep('Gattack',mainRoom,targetRoom,spawnList[s],i)
						generateCreep('Gheal',mainRoom,targetRoom,spawnList[s],i)
					}
				}
			}
		}

		for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'Gtough'){
				toughAction(creep)
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
module.exports = GANTA;

var boostLab = []

function generateCreep(role,mainRoom,targetRoom,spawnName,id){
	var Gcreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role 
		&& creep.memory.roomSign == mainRoom
		&& creep.memory.ids == id)
	var name = targetRoom+'_'+id
	if(role == 'Gtough' && pbcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], 
			name, {memory: {role: role, roomSign: mainRoom,ids:id}});
	}else if(role == 'Gattack' && pbcreeps.length < 1 ){
        Game.spawns[spawnName].spawnCreep([ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK], 
			name, {memory: {role: role, roomSign: mainRoom,ids:id}});
    }else if(role == 'Gheal' && pbcreeps.length < 1){
        Game.spawns[spawnName].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], 
			name, {memory: {role: role, roomSign: mainRoom,ids:id}});
    }else{
		console.log('【没有role的类型】');
    }
}

function attackAction(creep){
	var targetRoom = creep.name.splice('_')[0]
	if(creep.room.name != targetRoom){
		if(!Game.flags['FlagAttack']){
			creep.say('旗呢！')
		}else{
			creep.moveTo(Game.flags['FlagAttack'])
			creep.say('🚔');
		}
		return;
	}
	
	const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
	if(targets.length > 0) {
		creep.rangedAttack(targets[0]);
	}
	
	var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS)
	if(!target){
		target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES
//             ,{
// 				filter: (structure) => 
// 					(structure.structureType == STRUCTURE_SPAWN ||
// 					structure.structureType == STRUCTURE_TOWER
// 				    || structure.structureType == STRUCTURE_EXTENSION
// 					)
			
// 			}
		)
	}
	if(target){
		var ho = 'Gheal' + '_' +creep.name.splice('_')[1]
		if(creep.pos.isNearTo(Game.creeps[ho])){
			if(Game.creeps[ho].hits < Game.creeps[ho].hitsMax/4){
				creep.moveTo(Memory.creeps[creep.name].roomSign)
			}else{
				if(!creep.pos.isNearTo(target)){
					creep.moveTo(target);
				}else{
					creep.attack(target)
				}
				if(creep.pos.inRangeTo(target, 3)) {
					creep.rangedAttack(target);
				}
			}
		}else{
			if(Game.creeps[ho]){
				creep.moveTo(Game.creeps[ho].pos)
			}
		}
		
	}else{
		if(creep.signController(creep.room.controller,'目标：星辰 大海') == ERR_NOT_IN_RANGE){
			creep.moveTo(creep.room.controller);
		}
	}
}

function healCreep(creep){
	var target = 'Gattack' + '_' +creep.name.splice('_')[1]
    if(creep.pos.isNearTo(Game.getObjectById(target))){
		if(creep.hits < creep.hitsMax){
			creep.heal(creep)
		}else{
			if(Game.getObjectById(target).hits < Game.getObjectById(target).hitsMax){
				if(creep.pos.isNearTo(Game.getObjectById(target))) {
					creep.heal(Game.getObjectById(target));
				}else {
					creep.rangedHeal(Game.getObjectById(target));
				}
			}
		}
    }else{
        if(Game.getObjectById(target)){
            creep.moveTo(Game.getObjectById(target).pos)
        }
    }
}

function toughAction(creep){
	if(!Game.rooms[targetRoom]){
		if(creep.hits < creep.hitsMax){
			creep.heal(creep)
		}
		creep.moveTo(new RoomPosition( 22, 5, targetRoom))
	}
	
}

function checkRoomTower(targetRoom){
	var stuta = false
	var target = Game.rooms[targetRoom].find(FIND_HOSTILE_STRUCTURES,{
		filter: (structure) => {
			return(structure.structureType == STRUCTURE_TOWER) &&
				structure.store.getFreeCapacity(RESOURCE_ENERGY) < 100;
		}
	})
	if(target.length == 0){
		stuta = true
	}
	return stuta
}
