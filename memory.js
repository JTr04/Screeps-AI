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
                                	roomSpawn : ['Spawn1'],
                                	spawnResourceIndex : 0,
                                	towerList : ['604773a8434e3b067fba0255','6050d35e07d2697a225f700f'],
                                	mineralName:RESOURCE_LEMERGIUM
                            	},{
                                	roomName : 'W39N6',
                                	roomSpawn : ['Spawn2'],
                                	spawnResourceIndex : 1,
                                	towerList : ['60596643780122efba180e78','605fe00b9a82e81bfcee014c'],
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
                                link4:'',
                                mineralId:'5bbcb1aa40062e4259e931c5',
                                containerS1:'605027b76ec6bf92973c1a27',
                                containerS2:'60502a9f434e3b1bc8bd32e7',
                                factoryId:'',
                                PSid:'',
                                OBid:'',
                                NUKid:''
                               },
                               {
                                harX:28,
                                harY:13,
                                harX1:38,
                                harY1:9,
                                sourceIdUp:'5bbcaadb9099fc012e6324b6',
                                sourceIdDown:'5bbcaadb9099fc012e6324b5',
                                stoId:'605ab65fe96436bf4f83acd5',
                                terminalId:'',
                                link1:'606012df7f0ddc539bb9e9c7',
                                link2:'605ff2aa25ae36388ec3b37c',
                                link3:'',
                                link4:'',
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