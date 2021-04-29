/**
 *无聊 写写外矿的代码。。。。
 *
 *需要插旗 三个或者两个
 *一个定位旗 'out'+外矿房间名
 *两个资源旗 'out'+外矿房间名+1/0 每个资源附近选择一个采集位插旗用0与1区分两个energy
 *
 *注意：如果你是在七级一下使用，需要修改carAction中的逻辑
 *		我当时写的时候是将一个link用以资源的传送 所以就需要四个link
 *		不过也好解决这个问题，将carAction方法中的最后一个else下的逻辑改为mainRoom房间中的容器terminal或者storage
 *		如：var ter = Game.rooms[mainRoom[0]].terminal; creep.transfer(ter)大致这样的逻辑，当然具体逻辑需要你自己补全
 *
 *所以 你还需要在门口创建一个link 不要太靠近门口
 *
 *配置：
 *	mainRoom 需要开外矿的房间
 *	mainRoomMsg 开外矿房间中的所有spawn的name和门口的link
 *	outMsg 需要放在memory中的外矿信息：
 *		key就是开外矿房间名 value是一个JSON数组（这就支持你一个房间开多个外矿）
 *		roomName：外矿房间名
 *		sourceList：energy的id数组
 *		stuta：判断是否有npc或者非好友的带有攻击性部件的creep来骚扰你（防止资源浪费
 *		stutaTick：计时器 1500是一个creep的存活时间
 *
 * */

var outEnergy = {
    run:function(){
        if(Memory.outTask && Memory.outTask.length == 0)delete Memory.outTask
        checkOutStuta();
// 		createRoadCon();
        if (Memory.outTask) {
            var task = Memory.outTask
            var outMsg = Memory.outMsg
            for(var i in task){
                var mainRoom = task[i].mainRoom
                var index = task[i].index
                var roomName = outMsg[mainRoom][index].roomName
                var source = outMsg[mainRoom][index].sourceList
                var spawnList = mainRoomMsg[mainRoom].spawnList
                for(var spawnName of spawnList){
                    if(Game.spawns[spawnName]){
                        for(var s in source){
                            generateCreep('outre',mainRoom,roomName,spawnName,source[s],3)
                            generateCreep('outhar',mainRoom,roomName,spawnName,source[s],s)
                        }
                    }
                }
            }
        }
        for(var name in Game.creeps){
            var creep = Game.creeps[name]
            if(creep.memory.role == 'outre'){
                reAction(creep)
            }
            if(creep.memory.role == 'outhar'){
                harAction(creep)
            }
            if(creep.memory.role == 'outcar'){
                carAction(creep)
            }
        }
    }
}
module.exports = outEnergy;

var mainRoom = ['W36N9']

var mainRoomMsg = {
    'W36N9':{
        linkId:'608055f1c669ad1ae86e9c9f',
        spawnList:['Spawn1','Spawn1_2','Spawn1_3']
    }
}

Memory.outMsg = {
    'W36N9':[
        {
            roomName:'W37N8',
            sourceList:['5bbcaaf19099fc012e6327b9'],
			roadMsg:{'outW37N80':[]},
            stuta:true,
            stutaTick:1500
        },{
            roomName:'W36N8',
            sourceList:['5bbcaafd9099fc012e63298d','5bbcaafd9099fc012e63298c'],
			roadMsg:{'outW36N80':[],'outW36N81':[]},
            stuta:true,
            stutaTick:1500
        }
    ]
}

function generateCreep(role,roomName,targetRoom,spawnName,sourceId,num){
    var linkId = mainRoomMsg[roomName].linkId
    var Gcreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.roomSign == roomName && creep.memory.num == num && creep.memory.targetroom == targetRoom)
    var name = role + '_' + targetRoom +'_'+ num
    if(role == 'outre' && Gcreeps.length < 1){
        Game.spawns[spawnName].spawnCreep([CLAIM,MOVE],
            name, {memory: {role: role, roomSign: roomName,num:num,targetroom:targetRoom}});
    }else if(role == 'outhar' && Gcreeps.length < 1){
        Game.spawns[spawnName].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,WORK,WORK,WORK,WORK,WORK],
            name, {memory: {role: role, roomSign: roomName,targetroom:targetRoom,spawnSign:spawnName,num:num,workloc:sourceId}});
    }else if(role == 'outcar' && Gcreeps.length < 1){
        Game.spawns[spawnName].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK],
            name, {memory: {role: role, roomSign: roomName,targetroom:targetRoom,num:num,linkid:linkId}});
        
    }
}

function checkOutStuta(){
    var outMsg = Memory.outMsg
    for(var room of mainRoom){
        var msgList = outMsg[room]
        for(var i in msgList) {
            var stuta = msgList[i].stuta
            if(stuta){
                var roomName = msgList[i].roomName
                var targetRoom = Game.rooms[roomName]
                //如果房间有视野就检查
                if(targetRoom){
                    //检查房间是否出现npc或者敌方外矿骚扰
                    var fn
                    for(var i in Memory.friendName){
                        fn = Memory.friendName[i]
                    }
                    var enemy = targetRoom.find(FIND_HOSTILE_CREEPS,{
                        filter : (creep) => {
                            return (creep.getActiveBodyparts(ATTACK) > 0 ||
                                creep.getActiveBodyparts(RANGED_ATTACK) > 0 ||
                                creep.getActiveBodyparts(HEAL) > 0 )
                                && creep.owner.username == 'Invader'
                                && creep.owner.username != fn
                        }
                    });
                    var target = targetRoom.find(FIND_STRUCTURES,{
                        filter:(s) => s.structureType == STRUCTURE_INVADER_CORE
                    })
                    if(enemy.length){
                        //如果存在威胁就修改此房间的状态
                        Memory.outMsg[room][i].stuta = false
                        Memory.outMsg[room][i].stutaTick = 1500
                    }
                    if (target.length){
                        Memory.outMsg[room][i].stuta = false
                        Memory.outMsg[room][i].stutaTick = 5000
                    }
                }
                // else{
                    //如果没视野就添加生产任务
                    checkOutTask(room,i)
                // }

            }else{
                //删除生产任务 开始计时
                Memory.outMsg[room][i].stutaTick--
                if(Memory.outTask){
                    var outTask = Memory.outTask
                    for(var t in outTask){
                        if(outTask[t].mainRoom == room){
                            Memory.outTask.splice(t,1)
                        }
                    }
                }
                if(Memory.outMsg[room][i].stutaTick == 0){
                    Memory.outMsg[room][i].stuta = true
                }
            }
        }
    }
}

/**
 * 发布外矿creep生产任务
 * @param {String} mainRoom 生产房间
 * @param {int} i 目标外矿房间信息
 * */
function checkOutTask(mainRoom,i){
    if(!Memory.outTask)Memory.outTask = []
    var id = mainRoom + i
    if(!checkTask(id,Memory.outTask)){
        var task = {}
        task.mainRoom = mainRoom
        task.index = i
        Memory.outTask.push(task)
    }

}


function checkTask(id,task) {
    var stuta = false
    for(var i in task){
        var ID = task[i].mainRoom + task[i].index
        if(id == ID){
            stuta = true
        }
    }
    return stuta
}

/**
 * =======================================================================
 * 执行
 * */
function reAction(creep){
    var targetRoom = creep.name.split('_')[1]
    var targetFlag = Game.flags['out'+targetRoom]
    if(creep.pos.roomName != targetFlag.pos.roomName){
        creep.moveTo(targetFlag)
        return;
    }
    if(creep.room.controller) {
        if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
}

function harAction(creep){
    var targetRoom = creep.name.split('_')[1]
    var targetFlag = Game.flags['out'+targetRoom]
    if(creep.pos.roomName != targetFlag.pos.roomName){
        creep.moveTo(targetFlag)
        return;
    }
    if(creep.memory.having && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.having = false;
    }
    if(!creep.memory.having && creep.store.getFreeCapacity() == 0) {
        creep.memory.having = true;
    }

    var ids = Memory.creeps[creep.name].workloc;
    var sourcea = Game.getObjectById(ids);
    var sourceFlag = Game.flags['out' + targetRoom + creep.memory.num]
    if(creep.memory.having){
        var con = creep.room.lookForAt(LOOK_STRUCTURES,sourceFlag)
        if(con.length == 0){
            con = creep.room.lookForAt(LOOK_CONSTRUCTION_SITES,sourceFlag)
            if(con.length == 0){
                Game.rooms[creep.pos.roomName].createConstructionSite(sourceFlag.pos, STRUCTURE_CONTAINER);
            }else{
                if(con[0].structureType == 'container'){
                    creep.build(con[0])
                }
            }
        }else{
            if(con[0].structureType == 'container'){
                if(con[0].hits < con[0].hitsMax){
                    creep.repair(con[0])
                }else{
                    if(con[0].store.getUsedCapacity(RESOURCE_ENERGY) < 2000 ){
                        creep.transfer(con[0],RESOURCE_ENERGY)
                    }
                    if(con[0].store.getUsedCapacity(RESOURCE_ENERGY) >= 1000 ){
                        generateCreep('outcar',creep.memory.roomSign,creep.pos.roomName,creep.memory.spawnSign,con[0].id,2)
                    }
                }
            }

        }
    }else{
        if(creep.pos.isEqualTo(sourceFlag)) {
            creep.harvest(sourcea)
        }else{
            creep.moveTo(sourceFlag);
        }
    }
}

function carAction(creep){
    var targetRoom = creep.name.split('_')[1]
    var targetFlag = Game.flags['out'+targetRoom]
    if(creep.store['energy'] == 0){
        if(creep.pos.roomName != targetFlag.pos.roomName){
            creep.moveTo(targetFlag)
            return;
        }else{
            var con = creep.room.find(FIND_STRUCTURES,{
                filter:(s) => s.structureType == STRUCTURE_CONTAINER && s.store['energy'] > 800
            });
            con.sort((a,b) => b.store['energy'] - a.store['energy'])
            if(con.length > 0){
                if (creep.withdraw(con[0],'energy') == ERR_NOT_IN_RANGE){
                    creep.moveTo(con[0])
                }
            }else{
                if(!creep.pos.isEqualTo(targetFlag)){
                    creep.moveTo(targetFlag)
                    return;
                }else{
                    creep.say('0~0');
                }
            }
        }
    }else{
		var target = creep.room.find(FIND_CONSTRUCTION_SITES,{
		    filter:(s) => s.pos.roomName == creep.memory.targetroom
		})
		if(target.length > 0){
			if(creep.build(target[0]) == ERR_NOT_IN_RANGE){
				creep.moveTo(target[0])
			}
		}else{
		    target = Game.getObjectById(creep.memory.linkid)
            if (target && target.store.getFreeCapacity('energy') > 0){
                if(creep.transfer(target,'energy') == ERR_NOT_IN_RANGE){
                    var roadTarget = Game.rooms[creep.pos.roomName].lookForAt(LOOK_STRUCTURES,creep)
    				if(roadTarget.length > 0 && roadTarget[0].structureType == STRUCTURE_ROAD){
    					if(roadTarget[0].hits < roadTarget[0].hitsMax){
    						creep.repair(roadTarget[0])
    					}else{
    					   	creep.moveTo(target)
    					}
    				}
    				creep.moveTo(target)
                }
                
            }
		}
    }

}

/*
function roadPlan(outflag,linktarget){
	var ret = PathFinder.search(Game.flags[outflag].pos,{ pos:linktarget.pos,range:1},{
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
														2 ; // 平原 => 移动成本:  1
					costs.set(x, y, weight);
					
					room.find(FIND_STRUCTURES).forEach(function(struct) {
						if (struct.structureType === STRUCTURE_ROAD) {
							// 相对于平原，寻路时将更倾向于道路
							costs.set(struct.pos.x, struct.pos.y, 1);
						} else if (struct.structureType !== STRUCTURE_CONTAINER &&
						  //  struct.structureType !== STRUCTURE_ROAD &&
							 (struct.structureType !== STRUCTURE_RAMPART ||
									  !struct.my)) {
							// 不能穿过无法行走的建筑
							costs.set(struct.pos.x, struct.pos.y, 255);
							
						}
					});
				}
			}
			return costs;
			},
		}
	);
	return ret.path
	
}

function createRoadCon(){
	var roomName
	for(var i in mainRoom){
		roomName = mainRoom[i]
	}
	var roads = Memory.outMsg[roomName]
	var link = Game.getObjectById(mainRoomMsg[roomName].linkId)
	for(var r in roads){
		var targetRoom = roads[r].roomName
		var outFlag0 = 'out'+targetRoom+'0'
		var outFlag1 = 'out'+targetRoom+'1'
		if(Game.flags[outFlag0]){
			if(roads[r].roadMsg[outFlag0].length == 0){
				Memory.outMsg[roomName][r].roadMsg[outFlag0] = roadPlan(outFlag0,link)
			}else{
				for(var road of roads[r].roadMsg[outFlag0] ){
					if(Game.rooms[road.roomName]){
						var roadTarget = Game.rooms[road.roomName].lookForAt(LOOK_STRUCTURES,road)
						var roadCon = Game.rooms[road.roomName].lookForAt(LOOK_CONSTRUCTION_SITES,road)
						if(roadTarget.length == 0 && roadCon.length ==0){
							Game.rooms[road.roomName].createConstructionSite(road.x , road.y , STRUCTURE_ROAD);
						}
					}
				}
			}
		}
		if(Game.flags[outFlag1]){
			if(roads[r].roadMsg[outFlag1].length == 0){
				Memory.outMsg[roomName][r].roadMsg[outFlag1] = roadPlan(outFlag1,link)
			}else{
				for(var road of roads[r].roadMsg[outFlag1] ){
					if(Game.rooms[road.roomName]){
						var roadTarget = Game.rooms[road.roomName].lookForAt(LOOK_STRUCTURES,road)
						var roadCon = Game.rooms[road.roomName].lookForAt(LOOK_CONSTRUCTION_SITES,road)
						if(roadTarget.length == 0 && roadCon.length ==0){
							Game.rooms[road.roomName].createConstructionSite(road.x , road.y , STRUCTURE_ROAD);
						}
					}
				}
			}
		}
	}
}
*/