global.msg = function (roomName) {
	var roomResource = Memory.roomResource
	var memorySource = Memory.memorySource
	if(roomName == null){
		for(var r in roomResource){
		    console.log('----------【'+roomResource[r].roomName +'的元素信息】----------')
		    var index = roomResource[r].spawnResourceIndex
		    var stoId = memorySource[index].stoId
		    var terId = memorySource[index].terminalId
		    var facId = memorySource[index].factoryId
		    var stoTest
		    var terTest
		    if(check(stoId)){
		       stoTest = '<text style="color:green;font-size:15px;">-----【Storage】-----</text>'
		       show(stoTest,stoId) 
		    }else{
		        console.log('还未建造(storage)此建筑')
		    }
		    if(check(terId)){
		       stoTest = '<text style="color:green;font-size:15px;">-----【Terminal】-----</text>'
		       show(stoTest,terId) 
		    }else{
		        console.log('还未建造(terminal)此建筑')
		    }
		    if(check(facId)){
		       stoTest = '<text style="color:green;font-size:15px;">-----【Factory】-----</text>'
               show(stoTest,facId) 
		    }else{
		        console.log('还未建造(factory)此建筑')
		    }
		}
		return '全部房间'
		
	}else{
	    for(var r in roomResource){
	        if(roomName == roomResource[r].roomName){
	            console.log('----------【'+roomResource[r].roomName +'的元素信息】----------')
    		    var index = roomResource[r].spawnResourceIndex
    		    var stoId = memorySource[index].stoId
    		    var terId = memorySource[index].terminalId
    		    var facId = memorySource[index].factoryId
    		    var stoTest
    		    var terTest
    		    if(check(stoId)){
    		       stoTest = '<text style="color:green;font-size:15px;">------【Storage】-----</text>'
    		       show(stoTest,stoId) 
    		    }else{
    		        console.log('还未建造(storage)此建筑')
    		    }
    		    if(check(terId)){
    		       stoTest = '<text style="color:green;font-size:15px;">-----【Terminal】-----</text>'
                   show(stoTest,terId) 
    		    }else{
    		        console.log('还未建造(terminal)此建筑')
    		    }
    		    if(check(facId)){
    		       stoTest = '<text style="color:green;font-size:15px;">-----【Factory】-----</text>'
                   show(stoTest,facId) 
    		    }else{
    		       console.log('还未建造(factory)此建筑')
    		    }
    		}
    		return roomName
	    }
	}
}

global.go = function (roomName){
    var uir =  "https://screeps.com/a/#!/room/shard3/"+roomName
    var mainRoom = ['E59N31','E59N39','E51N41','E46N43','E49N38','E43N42','E47N46']
    if(roomName == null){
       for(var i in mainRoom){
            uir = "https://screeps.com/a/#!/room/shard3/"+mainRoom[i]
            console.log('<a href='+uir+'>'+mainRoom[i]+'</a>')
       }
    }else{
        console.log('<a href='+uir+'>'+roomName+'</a>') 
    }
    return '点击'
}

global.showOrder = function(ROOM,min){
    var text;
    if(min == null){
        text = Game.market.getAllOrders({roomName:ROOM})
    }else if(ROOM == null && min == null){
        text = Game.market.orders
    }else{
        text = Game.market.getAllOrders({roomName:ROOM,resourceType:min}) 
    }
    // console.log()
    return JSON.stringify(text)
}


module.exports = msg;

var sources = [
    RESOURCE_HYDROGEN, 
    RESOURCE_OXYGEN ,
    RESOURCE_UTRIUM ,
    RESOURCE_LEMERGIUM ,
    RESOURCE_KEANIUM ,
    RESOURCE_ZYNTHIUM ,
    RESOURCE_CATALYST,
    RESOURCE_GHODIUM ,
    RESOURCE_SILICON,
    RESOURCE_METAL,
    RESOURCE_BIOMASS,
    RESOURCE_MIST,
    RESOURCE_HYDROXIDE,
    RESOURCE_ZYNTHIUM_KEANITE ,
    RESOURCE_UTRIUM_LEMERGITE ,
    RESOURCE_UTRIUM_HYDRIDE,
    RESOURCE_UTRIUM_OXIDE ,
    RESOURCE_KEANIUM_HYDRIDE ,
    RESOURCE_KEANIUM_OXIDE ,
    RESOURCE_LEMERGIUM_HYDRIDE ,
    RESOURCE_LEMERGIUM_OXIDE,
    RESOURCE_ZYNTHIUM_HYDRIDE ,
    RESOURCE_ZYNTHIUM_OXIDE	,
    RESOURCE_GHODIUM_HYDRIDE ,
    RESOURCE_GHODIUM_OXIDE ,
    RESOURCE_UTRIUM_ACID ,
    RESOURCE_UTRIUM_ALKALIDE,
    RESOURCE_KEANIUM_ACID ,
    RESOURCE_KEANIUM_ALKALIDE ,
    RESOURCE_LEMERGIUM_ACID	,
    RESOURCE_LEMERGIUM_ALKALIDE,
    RESOURCE_ZYNTHIUM_ACID,
    RESOURCE_ZYNTHIUM_ALKALIDE,
    RESOURCE_GHODIUM_ACID ,
    RESOURCE_GHODIUM_ALKALIDE,
    RESOURCE_CATALYZED_UTRIUM_ACID ,
    RESOURCE_CATALYZED_UTRIUM_ALKALIDE ,
    RESOURCE_CATALYZED_KEANIUM_ACID,
    RESOURCE_CATALYZED_KEANIUM_ALKALIDE ,
    RESOURCE_CATALYZED_LEMERGIUM_ACID ,
    RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,
    RESOURCE_CATALYZED_ZYNTHIUM_ACID ,
    RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,
    RESOURCE_CATALYZED_GHODIUM_ACID	,
    RESOURCE_CATALYZED_GHODIUM_ALKALIDE ,
    RESOURCE_OPS ,
    RESOURCE_UTRIUM_BAR,
    RESOURCE_LEMERGIUM_BAR,
    RESOURCE_ZYNTHIUM_BAR,
    RESOURCE_KEANIUM_BAR
]

function check(ids){
	var stuta = false
	var terget = Game.getObjectById(ids)
	if(ids != '' && terget){
		stuta = true
	}
	return stuta
}

function show(stoTest,ids){
	var obj = Game.getObjectById(ids)
	var source = Object.keys(obj.store)
	var msg = []
	for(var s of source){
		msg.push(JSON.parse('{"'+s+'" : "'+obj.store[s]+'"}'))
		msg.push('<br/>')
	}
	console.log(stoTest+'<br/>'+JSON.stringify(msg))
}




