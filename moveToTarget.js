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
	{targetRoom:'E46N44',targetRoomFlag:true,x:47,y:38},	
	{targetRoom:'E46N43',targetRoomFlag:true,x:26,y:48},
    {targetRoom:'E47N43',targetRoomFlag:true,x:36,y:17}
]

/*
*目标房间迁途
*/
function lookForRoom(creep,roomList){
	var targetRoom ;
	var x
	var y
	for(var i in roomList){
		if(roomList[i].targetRoomFlag){
			targetRoom = roomList[i].targetRoom
			x = roomList[i].x
			y = roomList[i].y
			if(creep.room.name != targetRoom){
        		creep.moveTo(new RoomPosition( x, y, targetRoom))
        		creep.say(targetRoom)
        	}else{
        		if(creep.pos.isEqualTo(x,y)){
        			Memory.mainRoomOfAround[i].targetRoomFlag = false
        		}else{
        			creep.moveTo(x,y);
        			creep.say(x+','+y);
        		}
        	}
		}
		
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
					{targetRoom:'E46N44',targetRoomFlag:true,x:47,y:38},	
                	{targetRoom:'E46N43',targetRoomFlag:true,x:26,y:48},
                    {targetRoom:'E47N43',targetRoomFlag:true,x:36,y:17}
				]
				Memory.mainRoomOfAround[i].targetRoomFlag = mainRoomOfAround[i].targetRoomFlag
			}
		}
    
}


