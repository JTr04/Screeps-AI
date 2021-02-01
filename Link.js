var Link = {
	
	run : function(num){
	    var linkSend1 = Memory.memorySource[num].link1;
	    var linkReceive = Memory.memorySource[num].link2;
	    var linkSend2 = Memory.memorySource[num].link3;
	    var linkReceiveU = Memory.memorySource[num].link4;
		var linkzero = Game.getObjectById(linkSend1);
		var	linkone = Game.getObjectById(linkReceive);
		var linktwo = Game.getObjectById(linkSend2);
		var linkthree = Game.getObjectById(linkReceiveU);
        if(linkSend1 != '' && linkReceive != ''){
            var target = linkone
            if(linkReceiveU != '' && linkthree && linkthree.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                target = linkthree
            }
    		if(linkzero.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
    			linkzero.transferEnergy(target);
    		}
    		
    		if(linkSend2 != ''){
    		    if(linktwo.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
        			linktwo.transferEnergy(linkone);
        		}   
    		}
    		
        }
	}	

}

module.exports = Link;