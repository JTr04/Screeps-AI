/**
 *注意：
 *独立自主是我国外交的基本立场；
 *维护我国的主权，安全和发展利益，促进世界的和平与发展是我国外交的基本目标；
 *加强同第三世界国家的团结与合作是我国对外政策的基本立足点；
 *支持对外开放，加强国际交往，是我国的基本国策；
 *坚决履行人不犯我我不犯人，人若犯我我必犯人，犯我国土虽远必诛 的政策
 *
 *四人小队
 * 第一阶段编写：
 *    1、实现组队功能 查询creep是否在小队中
 *    2、实现队形组合 四人小队队形组合
 *    3、路径缓存
 * 第一阶段编写思路：
 *    1、建立一个数组 数组元素限制为四 在每个creep出生时在memory中添加 creep属于哪个小队
 *      如果在小队中 状态就修改为true 此时就不再检查是否在小队中 执行其他模块
 *    2、pos判断？
 *    3、之前的group中的 路径缓存
 *
 * 第二阶段编写：
 *    1、实现发布任务与执行任务的任务分离
 *    2、实现将一个任务中的任务creep生产完成之后，自动将此任务删除并且不删除此任务的执行任务的功能
 * 第三阶段：
 *    1、实现四人小队 各个creep的任务分配
 *    2、实现boost功能
 *    3、实现换位 ^=
 *
 *基本功能已实现 具体使用方法：
 * 需要两个旗帜 attack（移动）集合旗  creep.memory.flagname 优先攻击旗 有先攻击旗周围的单位
 *
 * */


var theGroup = {
	run:function(){
		if(Memory.maxWarTask && Memory.maxWarTask.length == 0)delete Memory.maxWarTask
		if(Memory.warCreepArray && Memory.warCreepArray.length == 0)delete Memory.warCreepArray
		if (Memory.maxWarTask){
			var task = Memory.maxWarTask
			var roomMsg = Memory.roomResource
			for (var i in task){
				for(var r in roomMsg){
					if(task[i].mainRoom == roomMsg[r].roomName){
						var spawnList = roomMsg[r].roomSpawn
						var creepPathList = task[i].body
						var flagName = task[i].flagName
						for(var path in creepPathList){
							for(var s in spawnList){
								generateCreep('four',task[i].mainRoom,spawnList[s],flagName,bodyFree(creepPathList[path]),task[i].boost,path)
								addWarCreepArr('four',task[i].mainRoom,flagName)
							}
						}
					}
				}
			}
		}
		if(Memory.warCreepArray){
			var warArray = Memory.warCreepArray
			for (var w in warArray){
				var arr = warArray[w].creepArr
				for(var i in arr){
				   if(!Game.getObjectById(arr[i])){
						Memory.warCreepArray[w].creepArr.splice(i,1)
				   }
				}
				if(arr.length != 0){
					var flagName = warArray[w].flagName
					if (checkExitArr(arr,flagName)){
						if(checkPosRoom(arr,flagName)){
							if(!isTegether(arr)){
								checkTegether(arr)
							}else{
								//调用小队逻辑
								// console.log('work')
								groupAction(arr,flagName)
							}
						}else{
							oneAction(arr,flagName)
						}
					}else{
						oneAction(arr,flagName)
					}
				}else{
					console.log('<text style="color:red;font-size:13px;">【战争任务执行任务 '+ Memory.warCreepArray[w].flagName+' 删除】</text>')
					if(Memory.warCreepArray[w])Memory.warCreepArray.splice(w,1)
				}
			}
		}
	}
}

module.exports = theGroup;

const dPos = [{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1}]

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
global.paths = []

/**
 *生产相应的creep
 * @param {String} role
 * @param {String} roomName 生产房间
 * @param {String} spawnName Spawn名字
 * @param {String} flagName 进攻旗帜
 * @param {Array} body creepBody数组
 * @param {boolean} boost 是否boost
 * @param {number} creepbody任务下标
 */
function generateCreep(role,roomName,spawnName,flagName,body,boost,i){

	var Gcreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.roomSign == roomName
		&& creep.memory.flagname == flagName && creep.memory.index == i)
	var name = role + '_' + flagName +'_'+ roomName + '_' + i
	if(role == 'four' && Gcreeps.length < 1){
		Game.spawns[spawnName].spawnCreep(body,
			name, {memory: {role: role, roomSign: roomName,flagname:flagName,boost:boost,index:i}});
	}
	
}
/**
 * 添加执行任务的任务
 * @param {String} role creep 角色
 * @param {String} roomName creep房间标识
 * @param {String} flagName 进攻旗帜名
 **/
function addWarCreepArr(role,roomName,flagName){
	
	if(!Memory.warCreepArray)Memory.warCreepArray = []
	if(!checkWarArray(flagName,Memory.warCreepArray)){
		var wartask = {}
		wartask.flagName = flagName
		wartask.creepArr = []
		Memory.warCreepArray.push(wartask);
	}

	var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.roomSign == roomName
		&& creep.memory.flagname == flagName )
	for(var i in creeps){
		if(Memory.warCreepArray){
			var warArray = Memory.warCreepArray
			var creepFlag = creeps[i].memory.flagname
			for(var w in warArray){
				var targetFlag = warArray[w].flagName
				if(targetFlag == creepFlag){
					var id = creeps[i].id
					if(id != null && !checkCreepInArray(id,Memory.warCreepArray[w].creepArr)){
						Memory.warCreepArray[w].creepArr.push(id)
					}
				}
			}
		}
	}
}

function checkWarArray(id,task){
	var stuta = false;
	for(var i in task){
		var ID = task[i].flagName
		if(ID == id){
			stuta = true
		}
	}
	return stuta
}
/**
 * 检查id是否已经存在
 * @param {String} id creep id
 * @param {Array} arr 小队数组
 */
function checkCreepInArray(id,arr){
	var stuta = false
	for(var a of arr){
		if(a == id){
			stuta = true
		}
	}
	return stuta
}

/**
 * @param {Array} arr 四人小队的数组
 * @param {String} flagName 旗帜
 * */
function checkExitArr(arr,flagName){
	var stuta = false
	if(arr.length == 4){
		for(var i in arr){
			//如果creep还在就组成队形 少一个就解散小队
			if (Game.getObjectById(arr[i]) && arr[i] != null){
				stuta = true
			}
		}
		if(Memory.maxWarTask){
			var task = Memory.maxWarTask
			for(var t in task){
				if(task[t].flagName == flagName){
					console.log('<text style="color:red;font-size:13px;">【战争任务 '+ Memory.maxWarTask[t].flagName+' 删除】</text>')
					Memory.maxWarTask.splice(t,1)
				}
			}
		}
	}
	return stuta
}

/**
* @param {Array} arr 小队数组
* @param {String} flagName 旗帜
*/
function checkPosRoom(arr,flagName){
	var targetFlag = Game.flags['attack']
	var stuta = true
	for(var i in arr){
		var creep = Game.getObjectById(arr[i])
		if(creep && targetFlag && creep.pos.roomName != targetFlag.pos.roomName){
			stuta = false
		}
	}
	
	return stuta
}

function isTegether(arr){
	var stuta = true
	var creep1 = Game.getObjectById(arr[0])
	var dpos = creep1.pos
	if(!dpos)return false
	for(var i in arr){
		var creep = Game.getObjectById(arr[i])
		let dp =dPos[i]
		var apos = addPos(dpos,dp)
		if(creep && !creep.pos.isEqualTo(apos)){
			stuta = false
		}
	}
	
	return stuta
}

function addPos(a,b){
	let x,y;
	x = a.x + b.x;
	y = a.y + b.y;
	if(x>=0 && x<=49 && y >=0 && y<=49){
		return new RoomPosition(x,y,a.roomName)
	}
}

/**
 * @param {Array} arr 小队数组
 * */
function checkTegether(arr){
	var creep1 = Game.getObjectById(arr[0])
	var dpos = creep1.pos
	if(!dpos)return false
	for(var c in arr){
		var creep = Game.getObjectById(arr[c])
		let dp = dPos[c]
		if(creep){
			creep.moveTo(addPos(dpos,dp))
			oneHealAction(arr)
		}
		
	}
}


/**
*@param {Array} arr 小队数组
* @param {String} flagName 旗帜小队数组
*/
function oneAction(arr,flagName){
	for(var i in arr){
		var creep = Game.getObjectById(arr[i])
		var warFlag = Game.flags['attack']
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
					creep.moveTo(warFlag)
					//如你想攻击赶路似的非敌方单位就添加 双保险
					//oneAttackAction(creep,flagName)
				}else{
					oneAttackAction(creep,flagName)
				}
			}else{
				creep.say('attack旗?')
			}
		}
		
		oneHealAction(arr)
	}
}

function moveToTarget(creep,target){
	//检查creep是否已经有了缓存
	var id = creep.memory.flagname
	if(paths.length > 0){
		for(var o in paths){
			if(paths[o].flagName == id && paths[o].road.length > 0){
				return
			}
		}
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

			// 用默认地形成本填充 CostMatrix，以供将来分析：
			for(let y = 0; y < 50; y++) {
				for(let x = 0; x < 50; x++) {
					const tile = terrain.get(x, y);
					const weight =
						tile === TERRAIN_MASK_WALL  ? 255 : // 墙壁 => 无法通行
						tile === TERRAIN_MASK_SWAMP ?   5 : // 沼泽 => 移动成本:  5
														1 ; // 平原 => 移动成本:  1
				// 	costs.set(x, y, weight);
					if(tile === TERRAIN_MASK_WALL){
						var pos1 = [1,0,-1]
						var pos2 = [1,0,-1]
						for(var i in pos1){
							for(var j in pos2){
								costs.set(x + pos1[i],y + pos2[j],255)
							}
						}
					}
					
					const dPos = [{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1},{x:-1,y:0},{x:0,y:-1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1}]
					creep.room.find(FIND_STRUCTURES).forEach(function(struct) {
						if (struct.structureType === STRUCTURE_ROAD) {
							// 相对于平原，寻路时将更倾向于道路
							costs.set(struct.pos.x, struct.pos.y, 1);
						}
				// 		else if(struct.structureType === STRUCTURE_WALL){
				// 		    costs.set(struct.pos.x, struct.pos.y, 255);
				// 		}
						else if (	struct.structureType !== STRUCTURE_CONTAINER &&
							 (struct.structureType !== STRUCTURE_RAMPART ||
									  !struct.my)) {
							// 不能穿过无法行走的建筑
				// 			costs.set(struct.pos.x, struct.pos.y, 255);
							for(var i=0 ; i<dPos.length - 1;i++){
								costs.set(addPos(struct.pos,dPos[i]).x,addPos(struct.pos,dPos[i]).y,255)
							}
							
						}
					});
	
		
					// 躲避房间中的 creep
					creep.room.find(FIND_CREEPS).forEach(function(creep) {
						if(creep.my){
							costs.set(creep.pos.x, creep.pos.y, 1);
						}else{
							costs.set(creep.pos.x, creep.pos.y, 255);
						}
					});
							
				}
			}
			//Memory.costMsg = costs
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
	if(!checkWarArray(id,paths)){
		var task = {}
		task.flagName = id
		task.road = route
		task.index = 0
		paths.push(task)
	}
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

/**
*@param {Array} arr 小队数组
* @param {String} flagName 旗帜小队数组
*/
function groupAction(arr,flagName){
	for(var i in arr){
		var creep = Game.getObjectById(arr[0])
		for(var i in paths){
			if(paths[i].flagName == flagName){
				if(paths[i].road[0] == 3 || paths[i].road[0] == 2 || paths[i].road[0] == 8){
					paths[i].road = []
					creep = Game.getObjectById(arr[1])
				}else if(paths[i].road[0] == 5 || paths[i].road[0] == 6 || paths[i].road[0] == 4){
					paths[i].road = []
					creep = Game.getObjectById(arr[3])
				}
			}
		}
		if(Game.flags[flagName]){
			moveToTarget(creep,Game.flags[flagName])
	// 		var ret = paths.road
	// 		var index = paths.index
			for(var i in paths){
				if(paths[i].flagName == flagName){
					var ret = paths[i].road
					var index = paths[i].index
					if(ret && Game.getObjectById(arr[0]).move(ret[0]) == OK && Game.getObjectById(arr[1]).move(ret[0]) == OK && Game.getObjectById(arr[2]).move(ret[0]) == OK && Game.getObjectById(arr[3]).move(ret[0]) == OK){
						paths[i].road.splice(0,1)
					}else{
						//出现障碍重新寻路
						paths.splice(i,1)
					}
				}
			}
			attackFlagAction(arr,flagName)
		}else{
			//HOSTILE
			var target = creep.pos.findClosestByPath(FIND_STRUCTURES,{
				filter:s => s.structureType !== STRUCTURE_CONTROLLER && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_ROAD
			})
			if(target){
				moveToTarget(creep,target)
		// 		var ret = paths.road
		// 		var index = paths.index
				for(var i in paths){
					if(paths[i].flagName == flagName){
						var ret = paths[i].road
						var index = paths[i].index
						if(ret && Game.getObjectById(arr[0]).move(ret[0]) == OK && Game.getObjectById(arr[1]).move(ret[0]) == OK && Game.getObjectById(arr[2]).move(ret[0]) == OK && Game.getObjectById(arr[3]).move(ret[0]) == OK){
							paths[i].road.splice(0,1)
						}else{
							//出现障碍重新寻路
							paths.splice(i,1)
						}
					}
				}
				
			
				//前后分开需添加
				var Acreep = Game.getObjectById(arr[i])
				if(Acreep && Acreep.pos.getRangeTo(target) <= 3) {
					if(Acreep.getActiveBodyparts(RANGED_ATTACK) != 0)Acreep.rangedAttack(target);
				}
				if(i == 2 || i ==3){
					deferAction(Acreep,target)
				}
				
			}else{
				for(var i in paths){
					if(paths[i].flagName == flagName){
						paths.splice(i,1)
					}
				}
				console.log('<text style="color:yellow;font-size:13px;">【四人小队 目标房间建筑已清理】</text>')
			}
		}
		groupHealealAction(arr)
		
	}
}


function oneAttackAction(creep,flagName){
	var flagWar = Game.flags[flagName]
	var target
	if(!flagWar){
		target = creep.room.find(FIND_HOSTILE_STRUCTURES,{
			filter:(s) => s.structureType !== STRUCTURE_CONTROLLER
		})[0]
		if(!target){
			target = creep.room.find(FIND_HOSTILE_CREEPS)[0]
		}
	}else{
		var ROOM = Game.rooms[flagWar.pos.roomName]
		if(ROOM){
			//首先查看旗帜为中心 边长为3的正方区域内的建筑目标
			target = ROOM.lookForAtArea(LOOK_STRUCTURES,(flagWar.pos.y - 1),(flagWar.pos.x - 1),(flagWar.pos.y + 1),(flagWar.pos.x + 1),true)
			if(target.length > 0){
				target = Game.getObjectById(target[0].structure.id)	
			}else{
				target = creep.room.find(FIND_HOSTILE_CREEPS)[0]
			}
		}
		//如果你想清理你赶路过程中的非敌方单位（也不是自己的）可以在ROOM判断后跟一个else{target = found[0]}
	}
	
	if(!target){
		if(!creep.pos.isEqualTo(Game.flags['attack'])){
			creep.moveTo(Game.flags['attack'])
			return;
		}
		creep.say('loading...',true)
	}
	if(creep.pos.getRangeTo(target) > 3){
		creep.moveTo(target);
	}else{
		if(creep.getActiveBodyparts(RANGED_ATTACK)!= 0)creep.rangedAttack(target);
	}
}

/**
*ra部件 首要工作  分开写
*@param {Array} arr 小队数组
*@param {String} flagName 目标旗帜
*@param {int} dis 与目标间的距离，用以判断是否在攻击范围内
*/
function attackFlagAction(arr,flagName){
	var warFlag = Game.flags[flagName]
	if(warFlag){
		var ROOM = Game.rooms[warFlag.pos.roomName]
		if(ROOM){
			//首先查看旗帜为中心 边长为3的正方区域内的建筑目标
			var found = ROOM.lookForAtArea(LOOK_STRUCTURES,(warFlag.pos.y - 1),(warFlag.pos.x - 1),(warFlag.pos.y + 1),(warFlag.pos.x + 1),true)
			if(found.length > 0){
				found = Game.getObjectById(found[0].structure.id)
			}else{
				console.log('<text style="color:yellow;font-size:13px;">【四人小队 目标区域建筑已清理】</text>')
				if(warFlag)warFlag.remove();
			}
			for(var i in arr){
				//前后分开需添加
				var creep = Game.getObjectById(arr[i])
				if(creep && found && creep.pos.getRangeTo(found) <= 3) {
					if(creep.getActiveBodyparts(RANGED_ATTACK) != 0)creep.rangedAttack(found);
				}
				if(i == 2 || i ==3){
					deferAction(creep,found)
				}
			}
		}
	}

}

/**
*防御
*/
function deferAction(creep,target){
	var found = creep.room.lookForAtArea(LOOK_CREEPS,(creep.pos.y - 3),(creep.pos.x - 3),(creep.pos.y + 3),(creep.pos.x + 3),true)
	if(found.length > 0){
		for(var f in found){
			if(!found[f].creep.my){
				target = Game.getObjectById(found[f].creep.id)
			}
		}
	}
   
	if(creep && target && creep.pos.getRangeTo(target) <= 3) {
		if(creep.getActiveBodyparts(RANGED_ATTACK) != 0)creep.rangedAttack(target);
	}

}

/**
*小队治疗
*/
function groupHealealAction(arr){
	for(var i in arr){
		var creep = Game.getObjectById(arr[i])
		if(i == 0 || i == 1){
			if(creep.getActiveBodyparts(HEAL) != 0)creep.heal(creep)
		}
		if(i == 2 || i == 3){
			creep = Game.getObjectById(arr[i])
			var healTarget = creep
			var target = Game.getObjectById(arr[i - 2])
			if(target && target.hits < target.hitsMax){
				healTarget = target
			}
			if(creep.getActiveBodyparts(HEAL) != 0)creep.heal(healTarget)
		}
	}
}

/**
*单体治疗
*/
function oneHealAction(arr){
	for(var i in arr){
		var creep = Game.getObjectById(arr[i])
		if(creep.getActiveBodyparts(HEAL) != 0)creep.heal(creep)
	}
}

/**
 * @param {String} mainRoom 生产房间
 * @param {String} targetRoom 目标房间
 * @param {String} flagName 目标旗帜
 * @param {Array} body [{'move':1,'attack':2},{'move':1,'heal':2}]
 */
global.addMaxWarTask = function(mainRoom,targetRoom,flagName,boost,body){
	if(!Memory.maxWarTask)Memory.maxWarTask = []
	var id = mainRoom + targetRoom + flagName
	if(!checkMaxWarTask(id,Memory.maxWarTask)){
		var task = {}
		task.mainRoom = mainRoom
		task.targetRoom = targetRoom
		task.flagName = flagName
		task.body = body
		task.boost = boost
		Memory.maxWarTask.push(task);
		return '<text style="color:red;font-size:13px;">【战争任务添加成功】</text> 目标房间：'+targetRoom
	}else{
		return '<text style="color:red;font-size:13px;">【任务已存在】</text>'
	}
}

global.checkMaxWarTask = function(id,task){
	var stuta = false;
	for(var i in task){
		var ID = task[i].mainRoom + task[i].targetRoom + task[i].flagName
		if(ID == id){
			stuta = true
		}
	}
	return stuta
}