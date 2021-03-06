var newSpawn = {
    
    run : function(target,num,creepsList){
        var spawnName = target;
        var roomSign = Game.spawns[spawnName].room.name;
  
        // var creepList = ['s2t','linkandtower','upgradera','newharvester','transfer'];
        var creepList = creepsList;
        
        
        var sone = Memory.memorySource[num].sourceIdDown;
        var s = Memory.memorySource[num].sourceIdUp;
        
        var sx = Memory.memorySource[num].harX;
        var sy = Memory.memorySource[num].harY;
        var soneX = Memory.memorySource[num].harX1;
        var soneY = Memory.memorySource[num].harY1;
        
        var link1 = Memory.memorySource[num].link1;
        var link2 = Memory.memorySource[num].link2;
        var link3 = Memory.memorySource[num].link3;
        
        var sto = Memory.memorySource[num].stoId;
        var ter = Memory.memorySource[num].terminalId;
        
        var m = Memory.memorySource[num].mineralId;
        
        var cS1 = Memory.memorySource[num].containerS1;
        var cS2 = Memory.memorySource[num].containerS2;
        
        var fac = Memory.memorySource[num].factoryId;
        
        var Hbody = [WORK,CARRY,MOVE];
        var Tbody = [WORK,CARRY,MOVE];
        var Ubody = [WORK,CARRY,MOVE];
	    var Lbody = [WORK,CARRY,MOVE];
        var Sbody = [WORK,CARRY,MOVE];
        var ULbody = [WORK,CARRY,MOVE];
        var energyHave = Game.spawns[spawnName].room.energyCapacityAvailable
        if(energyHave >= 550){
        	Hbody = [WORK,CARRY,CARRY,MOVE];
        	Tbody = [WORK,CARRY,CARRY,MOVE];
        	ULbody = [WORK,CARRY,CARRY,MOVE];
        	Ubody = [WORK,CARRY,CARRY,MOVE];
        	Sbody = [WORK,CARRY,CARRY,MOVE];
        }
        if(energyHave >= 800){
        	Hbody = [WORK,CARRY,CARRY,MOVE];
        	Tbody = [WORK,CARRY,CARRY,MOVE];
        	ULbody = [WORK,CARRY,CARRY,MOVE];
        	Ubody = [WORK,CARRY,CARRY,MOVE];
		    Lbody = [WORK,CARRY,CARRY,MOVE];
        	Sbody = [WORK,CARRY,CARRY,MOVE];
        }
        if(energyHave >= 1300){
        	Hbody = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
        	Tbody =[WORK,WORK,CARRY,CARRY,MOVE,MOVE];
        	ULbody = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
        	Ubody = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
		    Lbody = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
        	Sbody = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
        }
        if(energyHave >= 1800){
        	Hbody = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
        // 	Hbody = [MOVE,MOVE,WORK,WORK,WORK,WORK,WORK];
        	Tbody = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
        	ULbody = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
        	Ubody = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
	    	Lbody = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
        	Sbody = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
        }
        if(energyHave >= 2300){
            Hbody = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
        	Tbody = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
        	ULbody = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
        	Ubody = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
	    	Lbody = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
        	Sbody = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
        }
        
        
        var sourceId;
    	var sourceX;
    	var sourceY;
    	var containerId;
    	var linkId;
    	var energyLimt = energyHave/2;
    	
        for(let roles in creepList){
            
            let creepTarget = _.filter(Game.creeps, (creep) => creep.memory.role == creepList[roles] && creep.memory.roomSign == roomSign);
            let newharvesterTarget =_.filter(Game.creeps, (creep) => 
        		creep.memory.role == creepList[roles] && 
        		creep.memory.roomSign == roomSign && 
        		creep.memory.workloc == s);
            if(Game.spawns[spawnName].room.energyAvailable >= energyLimt){
                let newName = creepList[roles] + Game.time;
                if(creepList[roles] == 'newharvester'){
                    if(creepTarget.length < 2){
                        if(newharvesterTarget.length < 1){
            				sourceId = s;
            				sourceX = sx;
            				sourceY = sy;
            				containerId = cS1;
            				linkId = link3;
            			}else{
            			    sourceId = sone;
            				sourceX = soneX;
            				sourceY = soneY;
            				containerId = cS2;
            				linkId = link1;
            			}
                        console.log(spawnName+' Spawning new '+creepList[roles] +' :'+newName);
                        Game.spawns[spawnName].spawnCreep( Hbody,newName,
                        { memory: { role: creepList[roles] ,spawnSign : spawnName,roomSign:roomSign,workloc : sourceId , sx : sourceX , sy : sourceY , con : containerId , worklink:linkId} } );
                    }
                }else if(creepList[roles] == 'harvester'){
                    if(creepTarget.length < 2){
                        console.log(spawnName+' Spawning new '+creepList[roles] +' :'+newName);
                        Game.spawns[spawnName].spawnCreep( Hbody,newName,
                        { memory: { role: creepList[roles] ,spawnSign : spawnName,roomSign:roomSign, workloc : s , sx : sx , sy : sy} } );
                    } 
                }else if(creepList[roles] == 'linkandtower'){
                    if(creepTarget.length < 1){
                        console.log(spawnName+' Spawning new '+creepList[roles] +' :'+newName);
                        Game.spawns[spawnName].spawnCreep( Lbody,newName,
                        { memory: { role: creepList[roles] ,spawnSign : spawnName,roomSign:roomSign,workloc : s ,worklink : link1 , con : cS2 } } );
                    }
                }else if(creepList[roles] == 'transfer'){
                    if(creepTarget.length < 2){
                        console.log(spawnName+' Spawning new '+creepList[roles] +' :'+newName);
                        Game.spawns[spawnName].spawnCreep( Tbody,newName,
                        { memory: { role: creepList[roles] ,spawnSign : spawnName,roomSign:roomSign,workloc : sone , con : cS1, worklink:link3,worksto : sto} } );
                    }
                }else if(creepList[roles] == 's2t'){
                    if(creepTarget.length <1){
                        console.log(spawnName+' Spawning new '+creepList[roles] +' :'+newName);
                        Game.spawns[spawnName].spawnCreep( Sbody,newName,
                        { memory: { role: creepList[roles] ,spawnSign : spawnName,roomSign:roomSign,worklink:link2,worksto : sto, workter : ter,workfac:fac} } );
                    }
                }else if(creepList[roles] == 'buildera'){
                    if(creepTarget.length < 1){
                        console.log(spawnName+' Spawning new '+creepList[roles] +' :'+newName);
                        Game.spawns[spawnName].spawnCreep( ULbody,newName,
                        { memory: { role: creepList[roles] ,spawnSign : spawnName,roomSign:roomSign} } );
                    }
                }else if(creepList[roles] == 'builder'){
                    if(creepTarget.length < 2){
                        console.log(spawnName+' Spawning new '+creepList[roles] +' :'+newName);
                        Game.spawns[spawnName].spawnCreep(ULbody ,newName,
                        { memory: { role: creepList[roles] ,spawnSign : spawnName,roomSign:roomSign, worksto:sto,workloc : sone} } );
                    }
                }else if(creepList[roles] == 'mhar'){
                    if(creepTarget.length < 1){
                        console.log(spawnName+' Spawning new '+creepList[roles] +' :'+newName);
                        Game.spawns[spawnName].spawnCreep(Ubody ,newName,
                        { memory: { role: creepList[roles] ,spawnSign : spawnName, roomSign:roomSign,worksto:sto , workter : ter, workmin : m} } );
                    }
                }else if(creepTarget.length < 2){
                    console.log(spawnName+' Spawning new '+creepList[roles] +' :'+newName);
                    Game.spawns[spawnName].spawnCreep( Ubody,newName,
                    { memory: { role: creepList[roles] ,spawnSign : spawnName,roomSign:roomSign,workloc : sone,worksto : sto, workter : ter} } );
                }
            }
        }
        
        if(Game.spawns[spawnName].spawning) {
        var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
        Game.spawns[spawnName].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[spawnName].pos.x + 1, 
            Game.spawns[spawnName].pos.y, 
            {align: 'left', opacity: 0.8});
        }
        
    }
}

module.exports = newSpawn;