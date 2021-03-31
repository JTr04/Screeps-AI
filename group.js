/**
*The sour team
*flag attack
*/
var group = {
	run:function(){
// 		if(Memory.warTask && Memory.warTask.length == 0)delete Memory.warTask
// 		if(Memory.warTask){
// 			var task = Memory.warTask
// 			var roomMsg = Memory.roomResource
// 			for(var i in task){
// 				for(var r in roomMsg){
// 					if(task[i].mainRoom == roomMsg[r].roomName){
// 						var spawnList = roomMsg[r].roomSpawn
// 						for(var s in spawnList){
// 						//	for(var n=0;n<task[i].num;n++){
// 								generateCreep('Gboss',task[i].mainRoom,spawnList[s],body[task[i].level]['Gboss'],body[task[i].level]['boost'],1)
// 								generateCreep('GXD',task[i].mainRoom,spawnList[s],body[task[i].level]['GXD'],1)
// 						//	}	
// 						}
// 					}
// 				}
// 			}
// 		}
		for(var name in Game.creeps){
		    var creep = Game.creeps[name]
		    if(creep.memory.role == 'Gboss'){
		        bossAction(creep)
		    }
		    if(creep.memory.role == 'GXD'){
		        XD1(creep)
		    }
		}
// 		show()
	}
}
module.exports = group;

var body = {
	//拆墙 {'tough':12,'work':28,'move':10} {'tough':12,'heal':28,'move':10}
	0:{
		'Gboss':[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
				TOUGH,TOUGH,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
				WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
				WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
				MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK],
		'GXD':[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
				TOUGH,TOUGH,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
				MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
		'boost':false
	},
	1:{
		'Gboss':[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
				TOUGH,TOUGH,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
				WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
				WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
				MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK],
		'GXD':[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
				TOUGH,TOUGH,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
				MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
		'boost':true
	},
	//攻击 抗3塔 {'tough':6,'ranged_attack':21,'heal':13,'move':10} *2 一体机
	2:{
		'Gboss':[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
				RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
				RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,
				MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
		'GXD':[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
				RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
				RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,
				MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
		'boost':false
	},
	//抗6塔 {'tough':12,'ranged_attack':5,'move':10,'heal':23} *2
	3:{
		'Gboss':[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
				TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,
				MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
		'GXD':[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
				TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,
				MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
		'boost':false
	},
	//boost
	4:{
		'Gboss':[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
				RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
				RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,
				MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
		'GXD':[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
				RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
				RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,
				MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
		'boost':true
	},
	5:{
		'Gboss':[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
				TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,
				MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
		'GXD':[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
				TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,
				MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
		'boost':true
	},
	// 近战 {'tough':9,'attack':25,'move':12} {'tough':12,'move':9,'heal':23}
	6:{
		'Gboss':[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,
				ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
				ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
				ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
				MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
		'GXD':[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
				TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
				MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,HEAL],
		'boost':false
	},
	7:{
		'Gboss':[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,
				ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
				ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
				ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
				MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
		'GXD':[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
				TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
				MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
				HEAL,HEAL,HEAL,HEAL],
		'boost':true
	}
}

/*
 *生产相应的creep
 */
function generateCreep(role,roomName,spawnName,body,boost,num){

	var Gcreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.roomSign == roomName && creep.memory.ids == num)
	var name = role + '_' + targetRoom +'_'+ num
	if(role == 'Gboss' && Gcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep(body, 
			name, {memory: {role: role, roomSign: roomName,ids:num,boost:boost}});
    }else if(role == 'GXD' && Gcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep(body, 
			name, {memory: {role: role, roomSign: roomName,ids:num,boost:boost}});
    }else{
		console.log('【没有role的类型】');
    }

}
/**
*XD full boss
*@param {creep} Creep
*/
function bossAction(creep){
	var flagWar = Game.flags.attack
	if(flagWar){
		//boost 稍后

		//迁途
		var XDCreepName = 'GXD'+'_'+creep.name.split('_')[1]+'_'+creep.name.split('_')[2]
		var XDCreep = Game.creeps[XDCreepName]
		if(creep.room.name != flagWar.pos.roomName){
		    if(XDCreep){
		        findRoad(creep,XDCreep,flagWar)
			    creep.say('🛴')
		    }else{
		        creep.say("⛄");
		    }
			
		}else{
//		        delete Memory.creeps[creep.name].move 
			//工作
			if(XDCreep){
			    roomFindRoad(creep,XDCreep)
			}else{
			    checkAction(creep)
			}
			if(creep.getActiveBodyparts(HEAL) != 0)healAction(creep,XDCreep)
			creep.say('o(╥﹏╥)o',true)
		}
		
	}else{
		if(Memory.creeps[creep.name].move)delete Memory.creeps[creep.name].move
		creep.say('🏴‍☠️呢?')
	}
	
}
function XD1(creep){
	var flagWar = Game.flags.attack
	if(flagWar){
    	var bossCreepName = 'Gboss'+'_'+creep.name.split('_')[1]+'_'+creep.name.split('_')[2]
    	var bossCreep = Game.creeps[bossCreepName]
    // 	if(bossCreep){
    		//xd 逻辑
    		checkAction(creep)
			if(creep.getActiveBodyparts(HEAL) != 0)healAction(creep,bossCreep)
    // 	}
	}
}

function findRoad(creep,xd,target){
	if(xd && creep.pull(xd) == ERR_NOT_IN_RANGE){
		creep.moveTo(xd)
	}else{
		moveToTarget(creep,target)
		var ret = creep.memory.move.road
		var index = creep.memory.move.index
		if(creep.move(ret[index]) == OK){
			creep.memory.move.index ++
		}else{
			//出现障碍重新寻路
			delete Memory.creeps[creep.name].move
		}
		xd.move(creep)
	}
}

function roomFindRoad(creep,xd){
	if(xd && creep.pull(xd) == ERR_NOT_IN_RANGE){
		creep.moveTo(xd)
	}else{
		checkAction(creep)
		xd.move(creep)
	}
}

/**
* @param {creep} Creep
* @param {flags} Flag
*/
function moveToTarget(creep,target){
	//检查creep是否已经有了缓存
	if(creep.memory.move){
	    return 
	}else {
	    creep.memory.move = {}
	}

	let ret = PathFinder.search(
		creep.pos, { pos: target.pos, range: 1 },{
		// 我们需要把默认的移动成本设置的更高一点
		// 这样我们就可以在 roomCallback 里把道路移动成本设置的更低
		plainCost: 2,
		swampCost: 10,
		maxOps: 2000,
		roomCallback: function(roomName) {
			let room = Game.rooms[roomName];
			// 在这个示例中，`room` 始终存在
			// 但是由于 PathFinder 支持跨多房间检索
			// 所以你要更加小心！
			if (!room) return;
			let costs = new PathFinder.CostMatrix;
			const terrain = new Room.Terrain(roomName);

			room.find(FIND_STRUCTURES).forEach(function(struct) {
				if (struct.structureType === STRUCTURE_ROAD) {
					// 相对于平原，寻路时将更倾向于道路
					costs.set(struct.pos.x, struct.pos.y, 1);
				} else if (struct.structureType !== STRUCTURE_CONTAINER && 
				 			struct.structureType !== STRUCTURE_WALL &&
							struct.structureType !== STRUCTURE_SPAWN &&
							struct.structureType !== STRUCTURE_CONTROLLER &&
							struct.structureType !== STRUCTURE_LAB &&
							struct.structureType !== STRUCTURE_FACTORY &&
							struct.structureType !== STRUCTURE_LINK &&
							struct.structureType !== STRUCTURE_EXTENSION &&
							struct.structureType !== STRUCTURE_TOWER &&
							struct.structureType !== STRUCTURE_STORAGE &&
							struct.structureType !== STRUCTURE_TERMINAL &&
							struct.structureType !== STRUCTURE_POWER_SPAWN &&
							struct.structureType !== STRUCTURE_OBSERVER &&
							struct.structureType !== STRUCTURE_NUKER &&
					(struct.structureType !== STRUCTURE_RAMPART || !struct.my)) {
					// 不能穿过无法行走的建筑
					costs.set(struct.pos.x, struct.pos.y, 255);
				}
			});

			// 躲避房间中的 creep
			room.find(FIND_CREEPS).forEach(function(creep) {
				costs.set(creep.pos.x, creep.pos.y, 255);
			});

			// 用默认地形成本填充 CostMatrix，以供将来分析：
			for(let y = 0; y < 50; y++) {
				for(let x = 0; x < 50; x++) {
					const tile = terrain.get(x, y);
					const weight =
						tile === TERRAIN_MASK_WALL  ? 255 : // 墙壁 => 无法通行
						tile === TERRAIN_MASK_SWAMP ?   5 : // 沼泽 => 移动成本:  5
														1 ; // 平原 => 移动成本:  1
					costs.set(x, y, weight);
				}
			}
			
			return costs;
			},
		}
	);
    // 没找到就返回 null
	if (ret.path.length <= 0) return null
	// 找到了就进行压缩
	var route = serializeFarPath(creep,ret.path)
// 	if(!Memory.path)Memory.path = ret.path
	//保存到creep的内存中
	creep.memory.move.road = route
	creep.memory.move.index = 0

}

function serializeFarPath(creep,route){
	var ret = []
	if (!route[0].isEqualTo(creep.pos)) route.splice(0, 0, creep.pos)
	for(var i=0;i<route.length;i++){
		var dir = route[i].getDirectionTo(route[i+1])
		ret.push(dir)
	}
	return ret
}
function show(){
	var route = Memory.path
// 	new RoomVisual('sim').poly(route, {stroke: '#fff', strokeWidth: .15,opacity: .2, lineStyle: 'dashed'});
	Game.map.visual.poly(route, {stroke: '#ffffff', strokeWidth: .8, opacity: .2, lineStyle: 'dashed'})
}
function checkAction(creep){
    var flagWar = Game.flags.attack
    const found = creep.room.lookForAt(LOOK_STRUCTURES, flagWar);
    if(!flagWar){
        found = creep.room.find(FIND_HOSTILE_STRUCTURES)
    }
	var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	if(!target){
	    target = found
	}
	if(creep.getActiveBodyparts(WORK) != 0 && found.length){
	    dismantleAction(creep,found)
	}else{
	    if(creep.name.split('_')[0] == 'Gboss'){
	        creep.moveTo(flagWar)
	    }
	}
	    
	if(target.length && creep.getActiveBodyparts(ATTACK) != 0 || creep.getActiveBodyparts(RANGED_ATTACK) != 0){
	    attackAction(creep,target)
	}else{
	    creep.say('loading...',true);
	}
}


function dismantleAction(creep,found){
	if(found[0] && creep.dismantle(found[0]) == ERR_NOT_IN_RANGE){
		creep.moveTo(found[0])	
	}
}
function attackAction(creep,target){
	if(target[0]){
		if(!creep.pos.isNearTo(target[0])){
			creep.moveTo(target[0]);
		}else{
			creep.attack(target[0])
		}
		if(creep.pos.inRangeTo(target[0], 3)) {
			creep.rangedAttack(target[0]);
		}
	}else{
	    creep.say('loading...',true)
	}
}

function healAction(creep,target){
	var obj = creep
	if(target && target.hits < target.hitsMax){
		obj = target
	}
	if(creep.pos.inRangeTo(obj,1)){
	    creep.heal(obj)
	}else if(creep.pos.inRangeTo(obj,3)){
	    creep.rangedHeal(obj)
	}
	
}

function creepBoost(creep){
	var roomName = creep.memory.roomSign
	var flagName = roomName+'boost'
	if(!creep.pos.isEqualTo(Game.flags[flagName])){
		creep.moveTo(Game.flags[flagName])
	}else{
		//boost

	}
}

global.warTask = function(mainRoom,targetRoom,num,level){
	if(!Memory.warTask)Memory.warTask = []
	var ids = mainRoom + targetRoom + level
	if(!checkWarTask(ids,Memory.warTask)){
		var task = {}
		task.mainRoom = mainRoom
		task.targetRoom = targetRoom
		task.level = level
		task.num = num
		Memory.warTask.push(task)
		return '<text style="color:red;font-size:13px;">【战争任务添加成功】</text> 目标房间：'+targetRoom+' 战争等级：'+ level
	}else{
		return '<text style="color:red;font-size:13px;">【任务已存在】</text>'
	}
}
global.checkWarTask = function(ids,taskList){
	var stuta = false;
	for(var i in taskList){
		var ID =taskList[i].mainRoom + taskList[i].targetRoom + taskList[i].level
		if(ID == ids){
			stuta = true
		}
	}
	return stuta
}

global.bodyFree = function(bodyJson){
    var bodyPart = []
    Object.entries(bodyJson).forEach(([key,value]) => bodyPart.push(...Array(value).fill(key)))
	return bodyPart
}