var marketAction = {
    run : function(){
        if(Game.time % 1000)return
    	for(var j in Memory.roomResource){
    	    for(var i in order){
    	        if( Memory.roomResource[j].roomName == order[i].roomName){
    	            var ROOM =  Memory.roomResource[j].roomName
    	            var num = Memory.roomResource[j].spawnResourceIndex;
    			    var min = order[i].resourceType
    			    var ter = Game.getObjectById(Memory.memorySource[num].terminalId)
    			    var orderList = Game.market.getAllOrders({roomName:ROOM,resourceType:min})
    			    if(ter.store.getUsedCapacity(min) > 100000 && orderList.length < 1){
    			        Game.market.createOrder(order[i]);
    			        Game.notify('create order :'+JSON.stringify(order[i]))
    			    }
    	        }
    	    }
    	}
    }
}

module.exports = marketAction;

var order = [
	{
		type: ORDER_SELL,
		resourceType: RESOURCE_ZYNTHIUM,
		price: 0.27,
		totalAmount: 20000,
		roomName: "E59N31"   
	},{
	    type: ORDER_SELL,
		resourceType: RESOURCE_OXYGEN,
		price: 0.3,
		totalAmount: 20000,
		roomName: "E59N39"
	}
]


