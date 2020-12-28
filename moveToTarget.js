/**
*@param {creep : Creep}
*/
var moveToTarget = {
	run : function(creep){
		lookForRoom(creep,Memory.mainRoomOfAround)
		restartPbTask()
	}
	
}
module.exports = moveToTarget;

Memory.mainRoomOfAround = [
	{targetRoom:'',targetRoomFlag:true},	
	{targetRoom:'',targetRoomFlag:true}

]

/*
*目标房间迁途
*/
function lookForRoom(creep,roomList){
	var targetRoom ;
	for(var i in roomList){
		if(roomList[i].targetRoomFlag){
			targetRoom = roomList[i].targetRoom
			break;
		}
	}
	if(!Game.rooms[targetRoom]){
		creep.moveTo(new RoomPosition( 22, 5, targetRoom))
		creep.say(targetRoom)
	}else{
		Memory.mainRoomOfAround[i].targetRoomFlag = false
	}
}

/**
  * 重置 迁途任务
  */
function restartPbTask(){
    const taskList = Memory.mainRoomOfAround;
    
		for(var i in taskList){
			var status = false;
			if(taskList[i].targetRoomFlag){
				status = true;
			}
			if(!status){
				var mainRoomOfAround = [
					{targetRoom:'',targetRoomFlag:true},	
					{targetRoom:'',targetRoomFlag:true}
				]
				Memory.mainRoomOfAround[i].targetRoomFlag = mainRoomOfAround[i].targetRoomFlag
			}
		}
    
}


