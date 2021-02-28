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
                            	roomSpawn : ['Spawn1','Spawn1_2','Spawn1_3'],
                            	spawnResourceIndex : 0,
                            	towerList : ['600e359069f8bc7830731160', '600e391747ffce39511a7f55','600e3d5423de66123c641a2a','603860f7434e3b5a3cb4580e', '6038657dd62436ffcf36272d', '603869c3912fec3f35f61d9e'],
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
                            	    roomSpawn : ['Spawn2_2','Spawn2','Spawn2_3'],
                            	    spawnResourceIndex : 1,
                            	    towerList : ['6020bdb75a1b6044673c3d0d', '6020c0c626d3d85b03bc1e13', '6020c58502609a01b6678a7f','60376687fc4bbe95c1aab4f0', '603769b93f89d2749222e979', '60376edc210d07ed47f43779'],
                            	    mineralName:RESOURCE_OXYGEN
                            	}
                            	,{
                            	    roomName : 'E51N41',
                            	    roomSpawn : ['Spawn3','Spawn3_2','Spawn3_3'],
                            	    spawnResourceIndex : 2,
                            	    towerList : ['602a547407d269619d5094d9', '602a458ab86cd490ee8106fc', '602a3681fe9600587ab203e1','603769dffe96000da7b75d85', '60376f793df0b0352b1f3157', '603773be89517538a4c1c209'],
                            	    mineralName:RESOURCE_KEANIUM
                            	},{
                            	   roomName : 'E46N43',
                            	    roomSpawn : ['Spawn4','Spawn4_2','Spawn4_3'],
                            	    spawnResourceIndex : 3,
                            	    towerList : ['5fea1c041ba3a207b32f9f09','5ff07e4b7537e41cd3f72bb7','6005abfecce6adc8c0cb8a6b','603498c0d01f44b28503c86a', '603494ad0c8afa1dd6853bb9', '60348fdb6618fd599c93191a'],
                            	    mineralName:RESOURCE_CATALYST
                            	},{
                            	   roomName : 'E49N38',
                            	    roomSpawn : ['Spawn5','Spawn5_2'],
                            	    spawnResourceIndex : 4,
                            	    towerList : ['6003903fc1ec6c46b62bd431','600fa47ec609bd587be24f73','602a91b6d2b0866af61022ed'],
                            	    mineralName:RESOURCE_UTRIUM
                            	},{
                            	   roomName:'E43N42',
                            	    roomSpawn:['Spawn6','Spawn6_2'],
                            	    spawnResourceIndex : 5,
                            	    towerList : ['60129200f67fb479db7e80aa','601ca1fc9d7c675adc83930b','6034acac37ff393a30524820'],
                            	    mineralName:RESOURCE_HYDROGEN
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
                                link4:'5ff0a1a6fc5f2b7a4fa08788',
                                mineralId:'5bbcb737d867df5e54207e07',
                                containerS1:'5fa14bf07cda7f461c48ded6',
                                containerS2:'5fb38edab957f4c1b09e3aa9',
                                factoryId:'5fd1f97a4fd45e825b4cf23f',
                                PSid:'600b639b3d37c247b70dda13',
                                OBid:'600b22c194e5eb0b3a58b57d',
                                NUKid:'600be18f12439dc69f66bec3'
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
                                link4:'5ff0a2c61c583b35b30a1f1d',
                                mineralId:'5bbcb736d867df5e54207dff',
                                terminalId:'5fc08d11020eb846c4b6b5b4',
                                containerS2:'5fb16981178bec355507cc85',
                                containerS1:'5fb3abc6c949e077a41df5b6',
                                factoryId:'5fdd0f312550aa5810fdf832',
                                PSid:'60041dc53b5afe8d826fc494',
                                OBid:'6003d942a856b69f9a041bc5',
                                NUKid:'60045d4b3b5afea54f6fd8bc'
                               },
                               {
                                harX:34,
                                harY:17,
                                harX1:17,
                                harY1:44,
                                sourceIdUp:'5bbcb00c9099fc012e63b849',
                                sourceIdDown:'5bbcb00c9099fc012e63b84b',
                                stoId:'602a5ec837ff39d41b4e4dc7',
                                link1:'5fd4f472953ea17cfca20b48',
                                link2:'601f2f3e1eee187977b37d4a',
                                link3:'5fe04c67d37a54bfbe09adcb',
                                link4:'5fd4c7957b51610f11bbcb64',
                                mineralId:'5bbcb6b8d867df5e54207b0a',
                                terminalId:'602800c236d8b33dc944e2fa',
                                containerS1:'5fcf471bfe9dc021a88d7ed7',
                                containerS2:'5fcf7879d958776f8d9a8d49',
                                factoryId:'601f2551bdcae00a18b333a1',
                                PSid:'602bcb46efd5d469cf4fc83f',
                                OBid:'602bac1a67aeb4e6d4577b07',
                                NUKid:'602bfd303f89d253a61eb647'
                               },{
                                harX1:24,
                                harY1:19,
                                harX:23,
                                harY:21,
                                sourceIdDown:'5bbcafb99099fc012e63b0f5',
                                sourceIdUp:'5bbcafb99099fc012e63b0f6',
                                stoId:'5fec400da3fb0829423e0756',
                                link1:'5ff06319cbb05a8199dbaf68',
                                link2:'5ff06f1178f874d2712601cd',
                                link3:'5ff7718dff8a41008cf6ba62',
                                link4:'60354595f201b61386e8dacd',
                                mineralId:'5bbcb68dd867df5e54207976',
                                terminalId:'5ff877c26283d824ddc62972',
                                containerS2:'5fec4b2fbbb4cc728ae64fc3',
                                containerS1:'5fec56a6dd025b35478f2783',
                                factoryId:'6017fd4a0548e6f946c19a58',
                                PSid:'6035fbadd624367f2835479c',
                                OBid:'60349b6eb99cbc1241489938',
                                NUKid:'603517f51b94d03858d18b33'
                               },
                               {
                                harX:7,
                                harY:21,
                                harX1:46,
                                harY1:12,
                                sourceIdUp:'5bbcafef9099fc012e63b653',
                                sourceIdDown:'5bbcafef9099fc012e63b652',
                                stoId:'60230cc71ce346575f364b35',
                                link1:'600fddb9dcd72568cc926af3',
                                link2:'60106fd3de8e721dd05c4c49',
                                link3:'601ddb3df7632dc794856f0a',
                                link4:'',
                                mineralId:'5bbcb6acd867df5e54207aa0',
                                terminalId:'',
                                containerS1:'600899c1295720808b8f9963',
                                containerS2:'6009219d295720f0758fc71b',
                                factoryId:'',
                                PSid:'',
                                OBid:'',
                                NUKid:''
                               },
                               {
                                harX:10,
                                harY:11,
                                harX1:25,
                                harY1:5,
                                sourceIdUp:'5bbcaf809099fc012e63aad9',
                                sourceIdDown:'5bbcaf809099fc012e63aad8',
                                stoId:'6018515cf4e0b3807d5b18f4',
                                link1:'601c7a0f4c054a2fe3d18f34',
                                link2:'601c8f7226747965c8bb60e3',
                                link3:'6026497526d3d84307bdf1d1',
                                link4:'',
                                mineralId:'5bbcb675d867df5e54207881',
                                terminalId:'6026411f2f7b063af966e111',
                                containerS1:'60172d8f4139c8636f6bb953',
                                containerS2:'60174b9208b46b1a3a6c1e2d',
                                factoryId:'',
                                PSid:'',
                                OBid:'',
                                NUKid:''
                               }
        ];
        
        Memory.friendName = ['xiaodai'];
        
    }
}
module.exports = memoryFunction;