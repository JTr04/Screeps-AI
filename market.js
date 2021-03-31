var marketAction = {
    run : function(){
		if(Memory.marketTask && Memory.marketTask.length == 0) delete Memory.marketTask
        if(Game.time % 1500 == 0){
			sellEnergyTerminalAction();
			if(Game.rooms['E43N42'].terminal.store['energy'] > 10000){
				var orderList = Game.market.getAllOrders({type: ORDER_BUY,resourceType:RESOURCE_ENERGY})
				for(var i in orderList){
					if(orderList[i].price >= 0.3){
						var num = Math.min(20000,orderList[i].amount)
						var sendCost = Game.market.calcTransactionCost(num, 'E43N42', orderList[i].roomName)
						if(sendCost <= num){
						    var amount = num + sendCost
    						if(Game.rooms['E43N42'].terminal.store['energy'] >= amount){
    							amount = num
    							marketTask(orderList[i].id,amount,orderList[i].roomName,sendCost,orderList[i].price)
    						}else{
    							amount = num - sendCost
    							if(Game.rooms['E43N42'].terminal.store['energy'] >= amount){
    								marketTask(orderList[i].id,amount,orderList[i].roomName,sendCost,orderList[i].price)
    							}
    						}
						}
					}
				}
			}
        }
		dealOrder();
		
    }
}

module.exports = marketAction;

var mainRoom = ['E59N31','E59N39','E51N41','E46N43','E49N38']

function sellEnergyTerminalAction(){
	if(Game.rooms['E43N42'].terminal.store['energy'] <= 10000){
		for(var i of mainRoom){
			if(Game.rooms[i].terminal.store['energy'] > 50000){
				var msg = Game.rooms[i].terminal.send('energy',20000,'E43N42');
				if(msg == OK){
					console.log('<text style="color:green;font-size:13px;">【market资源调配:】</text>'+i+' 向 E43N42 发送20000 energy :'+msg)
				}else{
					console.log('<text style="color:red;font-size:13px;">【market资源调配:】</text>'+i+' 向 E43N42 发送20000 energy :'+msg);
				}
			}
		}
	}
	
}


function marketTask(id,amount,roomName,sendCost,price){
	if(!Memory.marketTask)Memory.marketTask = []
	if(Memory.marketTask && Memory.marketTask.length <= 10 && !checkTask(id,Memory.marketTask)){
		var task = {}
		task.id = id
		task.amount = amount
		task.orderRoom = roomName
		task.sendCost = sendCost
		task.price = price
		Memory.marketTask.push(task);
	}
	
}
function checkTask(id,Task){
	var stuta = false
	for(var i in Task){
		if(Task[i].id == id){
			stuta = true
		}
	}
	return stuta
}

function dealOrder(){
	var msg
	if(Memory.marketTask){
		var task = Memory.marketTask
	    if(Game.rooms['E43N42'].terminal.cooldown == 0){
		    for(var i in task){
	        	msg = Game.market.deal(task[i].id,task[i].amount,'E43N42')
        		if(msg == OK){
    				console.log('<text style="color:green;font-size:13px;">【market energy sell:】</text>向 '+task[i].orderRoom+' 卖出 '+ task[i].amount +' energy 路费: '+task[i].sendCost+' 共收入: '+task[i].price*task[i].amount +' 订单状态: '+msg);
    			}else{
    				console.log('<text style="color:red;font-size:13px;">【market energy sell:】</text>向 '+task[i].orderRoom+' 卖出 '+ task[i].amount +' energy 路费: '+task[i].sendCost+' 共损失: '+task[i].price*task[i].amount +' 订单状态: '+msg);
    			}
    			Memory.marketTask.splice(i,1)
		    }
		}
	}
}
