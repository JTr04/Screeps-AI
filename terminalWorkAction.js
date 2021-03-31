const T3 = ['XGHO2','XGH2O','XUH2O','XKHO2','XLHO2','XZH2O','XZHO2']

var terminalWorkAction = {
    run:function(){
		if(Memory.terminalTask && Memory.terminalTask.length == 0)delete Memory.terminalTask
		if(Memory.terminalTask){
			var task = Memory.terminalTask
			if(Game.time % 10 == 0){
		    	for(var i in task){
    				sendSource(task[i].sourceRoom,task[i].sourceToRoom,task[i].source,task[i].num,i)
    			}
			}
		}
    }

}
module.exports = terminalWorkAction;

/**
*@param {beginRoom} 资源发送房间
*@param {targetRoom} 资源收到房间
*@param {minSource} 资源
*@param {num} 资源数目
* @param {i} 任务下标
*/
function sendSource(beginRoom,targetRoom,minSource,num,i){
	if(Game.rooms[beginRoom].terminal.cooldown == 0 ){
	    var msg = Game.rooms[beginRoom].terminal.send(minSource, num, targetRoom)
	    if(msg == OK){
	        console.log('<text style="color:green;font-size:13px;">【'+beginRoom+'向'+targetRoom+'发送 '+num+' 个 '+minSource+'】路费：'+ Game.market.calcTransactionCost(num, beginRoom,targetRoom) +' 任务状态：'+msg+'</text>');
	    }else{
	        console.log('<text style="color:red;font-size:13px;">【任务执行失败，内容：'+beginRoom+'向'+targetRoom+'发送 '+num+' 个 '+minSource+'】 任务状态：'+msg+' 任务已删除</text>');
	    }
		Memory.terminalTask.splice(i,1);
	}
}

/**
*@param {sourceRoom} 资源发送房间
*@param {sourceToRoom} 资源收到房间
*@param {source} 资源
*@param {num} 资源数目
*/
global.terminalAddTask = function(sourceRoom,sourceToRoom,source,num){
	if(!Memory.terminalTask)Memory.terminalTask = []
	var ids = sourceToRoom + source
	if(!checkTerTask(ids,Memory.terminalTask)){
		if(checkTerSourceNum(sourceRoom,source,num)){
			var task = {}
			task.sourceRoom = sourceRoom
			task.sourceToRoom = sourceToRoom
			task.source = source
			task.num = num
			Memory.terminalTask.push(task)
			return '<text style="color:green;font-size:13px;"> 【terminal任务添加成功】</text>'
		}else{
			return '<text style="color:yellow;font-size:13px;"> 【terminal任务添加失败，原因：资源不足】</text>'
		}
	}else{
		return '<text style="color:yellow;font-size:13px;"> 【terminal任务添加失败，原因：任务已存在】</text>'
	}
}

global.checkTerTask = function(ids,taskList){
	var stuta = false;
	for(var i in taskList){
		var ID = taskList[i].sourceToRoom + taskList[i].source
		if(ID == ids){
			stuta = true
		}
	}
	return stuta
}

global.checkTerSourceNum = function(sourceRoom,source,num){
	var roomMsg = Memory.roomResource
	var stuta = true
	for(var i in roomMsg){
		if(roomMsg[i].roomName == sourceRoom){
			var index = roomMsg[i].spawnResourceIndex
			var ter = Game.getObjectById(Memory.memorySource[index].terminalId)
			if(ter.store[source] < num){
				stuta = false
			}
		}
	}
	return stuta
}
