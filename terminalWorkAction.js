const T3 = ['XGHO2','XGH2O','XUH2O','XKHO2','XLHO2','XZH2O','XZHO2']

var terminalWorkAction = {
    run:function(){
    // 	if(new Date().toLocaleTimeString() == '16:00:00 PM'){
        if(Game.time % 10 == 0){
    		checkTerminalTask()
    	}
    // 	if(Game.time % 100 == 0){
    // 		sendTask()
    // 	}
    }

}
module.exports = terminalWorkAction;

Memory.terminalTask = [
]

var mainRoom = ['E59N39']

var roomMinSource = [
	{
		mainroom:'E59N31',
		haveSource:['Z','XZH2O','XZHO2'],
		needSource:['O','H','OH','X']
	},{
		mainroom:'E59N39',
		haveSource:['O','OH','G'],
		needSource:['H','ZK','UL']
	},{
		mainroom:'E51N41',
		haveSource:['K','XKHO2','ZK'],
		needSource:['O','OH','X','Z']
	},{
		mainroom:'E46N43',
		haveSource:['X','XGHO2','XGH2O'],
		needSource:['O','H','G','OH']
	}
]

function sendSource(beginRoom,targetRoom,minSource){
	var stuta = false
	if(Game.rooms[beginRoom].terminal.send(minSource, 10000, targetRoom) == 0){
		Game.notify('【'+beginRoom+'向'+targetRoom+'发送 10000 '+minSource+'】');
		stuta = true
	}
	return stuta
}

function checkTerminalTask(){
	var roomMsg = Memory.roomResource
	let sources
	for(var i in mainRoom){
		for(var j in roomMinSource){
			for(var k in roomMsg){
				if(mainRoom[i] == roomMinSource[j].mainroom ){
					var NEEDsource = roomMinSource[j].needSource
					for(var n in NEEDsource){
						sources = NEEDsource[n]
						if(roomMinSource[j].mainroom == roomMsg[k].roomName){
    					    var num = roomMsg[k].spawnResourceIndex
            			    var ter = Game.getObjectById(Memory.memorySource[num].terminalId)
            				if(ter.store.getUsedCapacity(sources) < 100){
            				    var Task = {}
            					if(!checkTask(mainRoom[i],sources,Memory.terminalTask)){
        					        Task.id =  roomMinSource[j].mainroom +'_'+sources
            						Task.mainRoom = roomMinSource[j].mainroom
            						Task.needSource = sources
            						Memory.terminalTask.push(Task)
            					}
            				}
						}
					}
				}
			}
		}
	}
}


function checkTask(ROOM,Sources,taskList){
	var stuta = false
	var ids = ROOM+'_'+Sources
	for(var i in taskList){
		if(taskList[i].id == ids){
			stuta = true
		}
	}
	return stuta
	
}


function sendTask(){
	var roomMsg = Memory.roomResource
	for(var i in Memory.terminalTask){
		var mainRoom = Memory.terminalTask[i].mainRoom
		var needSource = Memory.terminalTask[i].needSource
		for(var j in roomMinSource){
			var haveSource = roomMinSource[j].haveSource
			for(var k in haveSource){
				if(needSource == haveSource[k]){
					var targetRoom = roomMinSource[j].mainRoom
					for(var r in roomMsg){
						if(targetRoom == roomMsg[r].roomName){
							var num = roomMsg[r].spawnResourceIndex
							var ter = Game.getObjectById(Memory.memorySource[num].terminalId)
							if(ter.store.getUsedCapacity(needSource) >= 10000){
								if(sendSource(targetRoom,mainRoom,needSource)){
									Memory.terminalTask.splice(i,1)
								}
							}
						}
					}
				}
			}
		}
	}
}