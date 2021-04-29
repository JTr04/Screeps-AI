var findRoomRoad = {
	run:function(){
		if(Game.creeps['new']){
			findRoomRoad1(Game.creeps['new'],'W39N6');		
		}
	}
}

module.exports = findRoomRoad;

function findRoomRoad1(creep,targetRoom){
	let from = new RoomPosition(25, 25, creep.pos.roomName);
	let to = new RoomPosition(25, 25, targetRoom);

	let allowedRooms = { [ from.roomName ]: true };
	Game.map.findRoute(from.roomName, to.roomName, {
		routeCallback(roomName) {
			let parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
			let isHighway = (parsed[1] % 10 === 0) || 
							(parsed[2] % 10 === 0);
			let isMyRoom = Game.rooms[roomName] &&
				Game.rooms[roomName].controller &&
				Game.rooms[roomName].controller.my;
			if (isHighway || isMyRoom) {
				return 1;
			} else {
				return 2.5;
			}
		}
	}).forEach(function(info) {
		allowedRooms[info.room] = true;
	});

	let ret = PathFinder.search(
		from, to ,{
		// 我们需要把默认的移动成本设置的更高一点
		// 这样我们就可以在 roomCallback 里把道路移动成本设置的更低
		plainCost: 2,
		swampCost: 10,
		maxOps: 2000,
		roomCallback: function(roomName) {
			if (allowedRooms[roomName] === undefined) {
				return false;
			}
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
					costs.set(x, y, weight);
					
					creep.room.find(FIND_STRUCTURES).forEach(function(struct) {
						if (struct.structureType === STRUCTURE_ROAD) {
							// 相对于平原，寻路时将更倾向于道路
							costs.set(struct.pos.x, struct.pos.y, 1);
						}else if(struct.structureType === STRUCTURE_WALL){
							costs.set(struct.pos.x, struct.pos.y, 255);
						} else if (	struct.structureType !== STRUCTURE_CONTAINER &&
									 (struct.structureType !== STRUCTURE_RAMPART ||
									  !struct.my)) {
							// 不能穿过无法行走的建筑
				 			costs.set(struct.pos.x, struct.pos.y, 255);
							
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
			
			return costs;
			},
		}
	);

	const path = ret.path;
	Game.map.visual.poly(path, {stroke: '#ffffff', strokeWidth: .8, opacity: .2, lineStyle: 'dashed'});
}
