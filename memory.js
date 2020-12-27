/**
 *将房间内的资源与建筑id存入内存
 *以方便不同房间的id存取
 */
 
var memoryFunction = {
     run : function(){
        if(Game.time % 100) return 
        
        
        // if (Game.cpu.bucket >= 7000){
        //     console.log("【已有"+Game.cpu.bucket+"cpu,开始搓Pixel】");
        //     Game.cpu.generatePixel();
        // } 
            
        
        Memory.roomResource = [
                            	{
                            	roomName : 'E59N31',
                            	roomSpawn : ['Spawn1','Spawn1_2'],
                            	spawnResourceIndex : 0,
                            	towerList : ['5f9efa7c7dea8913c2ceb3ae','5fa51d4e0232ee132b9081dc','5fd2e503386773215b49aa72'],
                            	mineralName:RESOURCE_ZYNTHIUM,
                            	labId:[
                            			{
                            				id:'5fccdab30ebbfa2504e60ba3',
                            				type:'out',
                            				mineralType:RESOURCE_ZYNTHIUM
                            			},{
                            			    id:'5fcd53a5cc25ef5bb49a7494',
                            				type:'out',
                            				mineralType:RESOURCE_OXYGEN
                            			},{
                            			    id:'5fcc5fc30ebbfa9cede5e80e',
                            				type:'out',
                            				mineralType:RESOURCE_OXYGEN
                            			},{
                            			    id:'5fcbed454ff1e7f3759563bf',
                            				type:'out',
                            				mineralType:RESOURCE_ZYNTHIUM
                            			},{
                            			    id:'5fcb73308265ac2503d639cf',
                            				type:'in',
                            				out1:'5fcbed454ff1e7f3759563bf',
                            				out2:'5fcc5fc30ebbfa9cede5e80e'
                            			},{
                            			    id:'5fce15a6d1e63007f166b4ee',
                            				type:'in',
                            				out1:'5fcd53a5cc25ef5bb49a7494',
                            				out2:'5fccdab30ebbfa2504e60ba3'
                            			}
                            		]
                            	},
                            	{
                            	    roomName : 'E59N39',
                            	    roomSpawn : ['Spawn2_2','Spawn2'],
                            	    spawnResourceIndex : 1,
                            	    towerList : ['5fad7ddf75c5ec954679c03e','5fb618445c05c7873c508f24','5fcc90e159e7e15db3df2b4a'],
                            	    mineralName:RESOURCE_OXYGEN
                            	}
                            	,{
                            	    roomName : 'E51N41',
                            	    roomSpawn : ['Spawn3'],
                            	    spawnResourceIndex : 2,
                            	    towerList : ['5fcc45e30569d6c66be132d0','5fd5a0de5c1325a84721b000'],
                            	    mineralName:RESOURCE_KEANIUM
                            	},{
                            	   roomName : 'E46N43',
                            	    roomSpawn : ['Spawn4'],
                            	    spawnResourceIndex : 3,
                            	    towerList : [],
                            	    mineralName:RESOURCE_CATALYST
                            	}
                              ]
       
        
        Memory.creepsList = {
                            0:['buildera','builder'],
                            1:['builder','upgradera','harvester'],
                            2:['builder','upgradera','harvester'],
                            3:['builder','upgradera','harvester'],
                            4:['linkandtower','builder','upgradera','harvester'],
                            // 5:['linkandtower','builder','upgradera','harvester'],
                            5:['s2t','linkandtower','upgradera','newharvester','transfer'],
                            6:['s2t','linkandtower','upgradera','newharvester','transfer'],
                            7:['s2t','linkandtower','upgradera','newharvester','transfer'],
                            8:['s2t','linkandtower','upgradera','newharvester','transfer']
                            }
        
        Memory.memorySource = [
                               {
                                harX:10,
                                harY:17,
                                harX1:5,
                                harY1:46,
                                sourceIdUp:'5bbcb09b9099fc012e63c6c5',
                                sourceIdDown:'5bbcb09b9099fc012e63c6c7',
                                stoId:'5fa1fc6003d74ccef64bd49f',
                                terminalId:'5fad8fc040ca084e40e53116',
                                link1:'5fa500791a7d204429cd4a5e',
                                link2:'5fa4d85d217b8e7339987c24',
                                link3:'5fb8f9ed63c89cb6aa7334da',
                                mineralId:'5bbcb737d867df5e54207e07',
                                containerS1:'5fa14bf07cda7f461c48ded6',
                                containerS2:'5fb38edab957f4c1b09e3aa9',
                                factoryId:'5fd1f97a4fd45e825b4cf23f'
                               },
                               {
                                harX1:45,
                                harY1:25,
                                harX:33,
                                harY:39,
                                sourceIdDown:'5bbcb09a9099fc012e63c6a8',
                                sourceIdUp:'5bbcb09a9099fc012e63c6aa',
                                stoId:'5fb14e0b6b8dd8293fc7b0ae',
                                link3:'5fb5ead64a418a41df2982ef',
                                link2:'5fb60329a8c68136581602f9',
                                link1:'5fbdad2eaf91bcd821d017c5',
                                mineralId:'5bbcb736d867df5e54207dff',
                                terminalId:'5fc08d11020eb846c4b6b5b4',
                                containerS2:'5fb16981178bec355507cc85',
                                containerS1:'5fb3abc6c949e077a41df5b6',
                                factoryId:'5fdd0f312550aa5810fdf832'
                               },
                               {
                                harX:34,
                                harY:17,
                                harX1:17,
                                harY1:44,
                                sourceIdUp:'5bbcb00c9099fc012e63b849',
                                sourceIdDown:'5bbcb00c9099fc012e63b84b',
                                stoId:'5fd06df40c0e64ddba02702d',
                                link1:'5fd4f472953ea17cfca20b48',
                                link2:'5fd4c7957b51610f11bbcb64',
                                link3:'5fe04c67d37a54bfbe09adcb',
                                mineralId:'5bbcb6b8d867df5e54207b0a',
                                terminalId:'5fe232c0f89ce37ac968376d',
                                containerS1:'5fcf471bfe9dc021a88d7ed7',
                                containerS2:'5fcf7879d958776f8d9a8d49',
                                factoryId:''
                               },{
                                harX:24,
                                harY:19,
                                harX1:23,
                                harY1:21,
                                sourceIdUp:'5bbcafb99099fc012e63b0f5',
                                sourceIdDown:'5bbcafb99099fc012e63b0f6',
                                stoId:'',
                                link1:'',
                                link2:'',
                                link3:'',
                                mineralId:'5bbcb68dd867df5e54207976',
                                terminalId:'',
                                containerS1:'',
                                containerS2:'',
                                factoryId:''
                               }
        ];
        Memory.towerList = ['5f9efa7c7dea8913c2ceb3ae',
                            '5fad7ddf75c5ec954679c03e',
                            '5fcc45e30569d6c66be132d0']
        
        Memory.friendName = ['xiaodai'];
        
    }
}
module.exports = memoryFunction;
