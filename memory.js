/**
 *将房间内的资源与建筑id存入内存
 *以方便不同房间的id存取
 */
 
var memoryFunction = {
     run : function(){
        if(Game.time % 100) return 
        
        
        if (Game.cpu.bucket == 10000){
            console.log("【已有"+Game.cpu.bucket+"cpu,开始搓Pixel】");
            Game.cpu.generatePixel();
        } 
            
        
        Memory.roomResource = [
                            	{
                                	roomName : 'W36N9',
                                	roomSpawn : ['Spawn1','Spawn1_2','Spawn1_3'],
                                	spawnResourceIndex : 0,
                                	towerList : ['6085b00c0bedbc3544187154','6050d35e07d2697a225f700f','60650628015f30802847407b','6085b1eff2a3dc5be17bf01b','6085b3dae5815579ef036052','608635acb6892c2807f4d64b'],
                                	mineralName:RESOURCE_LEMERGIUM
                            	},{
                                	roomName : 'W39N6',
                                	roomSpawn : ['Spawn2','Spawn2_2'],
                                	spawnResourceIndex : 1,
                                	towerList : ['60596643780122efba180e78','605fe00b9a82e81bfcee014c','60894b767c3beacda0ba2a18'],
                                	mineralName:RESOURCE_UTRIUM,
                            	}
                              ]
       
        
        Memory.creepsList = {
                            0:['buildera','builder'],
                            1:['builder','upgradera','harvester'],
                            2:['builder','upgradera','harvester'],
                            3:['linkandtower','builder','upgradera','harvester'],
                            4:['linkandtower','builder','upgradera','harvester'],
                            // 5:['linkandtower','builder','upgradera','harvester'],
                            5:['s2t','linkandtower','upgradera','newharvester','transfer'],
                            6:['s2t','linkandtower','upgradera','newharvester','transfer'],
                            7:['s2t','linkandtower','upgradera','newharvester','transfer'],
                            8:['s2t','linkandtower','newharvester','newtransfer']
                            }
        
        Memory.memorySource = [
                               {
                                harX:17,
                                harY:33,
                                harX1:20,
                                harY1:27,
                                sourceIdUp:'5bbcaafd9099fc012e632989',
                                sourceIdDown:'5bbcaafd9099fc012e632988',
                                stoId:'604b749d0eb51485db9001e4',
                                terminalId:'60599fa200275947bcd23a53',
                                link1:'6050e80f080aea90b0d37d35',
                                link2:'6051105d025e5a089a9e61fe',
                                link3:'6057f64759428a1cfab7aaef',
                                link4:'6087dee4d9efd09f1e1ccf18',
                                outlink:'608055f1c669ad1ae86e9c9f',
                                mineralId:'5bbcb1aa40062e4259e931c5',
                                containerS1:'605027b76ec6bf92973c1a27',
                                containerS2:'60502a9f434e3b1bc8bd32e7',
                                factoryId:'6066c499c68538e17f5bc2e0',
                                PSid:'6086834ef52e0f6a162b3e9d',
                                OBid:'6086335e8ba0792c238e9d51',
                                NUKid:'608709b67c3bea595bb95e40'
                               },
                               {
                                harX:28,
                                harY:13,
                                harX1:38,
                                harY1:9,
                                sourceIdUp:'5bbcaadb9099fc012e6324b6',
                                sourceIdDown:'5bbcaadb9099fc012e6324b5',
                                stoId:'605ab65fe96436bf4f83acd5',
                                terminalId:'606df23c329af3f76a6d770f',
                                link1:'606012df7f0ddc539bb9e9c7',
                                link2:'605ff2aa25ae36388ec3b37c',
                                link3:'606c89675879fe269158194f',
                                link4:'',
                                outlink:'',
                                mineralId:'5bbcb19040062e4259e93093',
                                containerS1:'605b6bbbaace6d40c2362bd6',
                                containerS2:'605b91919a82e82f8bec749e',
                                factoryId:'',
                                PSid:'',
                                OBid:'',
                                NUKid:''
                               }
        ];
        
        
    }
}
module.exports = memoryFunction;