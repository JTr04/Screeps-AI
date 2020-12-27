var Link = {
	
	run : function(num){
	    var linkSend1 = Memory.memorySource[num].link1;
	    var linkReceive = Memory.memorySource[num].link2;
	    var linkSend2 = Memory.memorySource[num].link3;
      var linkzero = Game.getObjectById(linkSend1);
      var	linkone = Game.getObjectById(linkReceive);
      var linktwo = Game.getObjectById(linkSend2);
      if(linkSend1 != '' && linkReceive != ''){

      if(linkzero.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
        linkzero.transferEnergy(linkone);
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
