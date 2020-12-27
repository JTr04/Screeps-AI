/**
 * @version 1.0.0
 * 第一版本  使用这个逻辑的时候，需要向 Memory 中 初始化一些参数 .
 * 
 * 
 * 
 */


/**
 * 远程对象 目前只有采集对象 没有自动攻击对象
 */
var remote = {
    run: function() {
        const pbSpurceList = Memory.reomteSource.pbSource;
        // const depositSourceList = Memory.reomteSource.depositSource;
        const checkStatus = Game.time % checkLookSourceCreepticks;
        if(checkStatus == 0){
            generateLookPbSourceCreep(pbSpurceList);
            restartPbTask();
            checkScoopPbTask();
            // generateLookDepositSourceCreep(depositSourceList);
            // restartDepostTask();
            // checkScoopDepsitTask();
        }
        lookPbSource(lookSourceCreep('lookSource','pb'),pbSpurceList);
        // lookDepositSource(lookSourceCreep('lookSource','deposit'),depositSourceList);
        executeScoopTask();
    }
};

module.exports = remote;


/**
 * 定义当前所拥有的房间
 */ 
const rooms = ['E59N39']

/**
 * 每隔多长时间检查一次插旗子的creep是否存在
 */
const checkLookSourceCreepticks = 1;

const creepLookPbSourceSleepTicks = 100;

/**
 * 定义 生成寻找pb资源creep的房间 并记录寻找的路线
 */
const pbflag = [
    {   
        room:'E59N39',
        routeRooms:[
            {
                room:'E60N41',
                flag:true
            },{
                room:'E60N38',
                flag:true
            },{
                room:'E58N40',
                flag:true
            }
        ],
        flag:true
    }
]

/**
 * 定义 生成寻找 deposit 资源的房间 ，并记录寻找的路线
 */
// const depflag = [
//     {   
//         room:'E48N19',
//         routeRooms:[
//             {
//                 room:'E44N20',
//                 flag:true
//             },{
//                 room:'E50N20',
//                 flag:true
//             },{
//                 room:'E45N20',
//                 flag:true
//             }
//         ],
//         flag:true
//     }
// ]

/**
 * 定义 寻找到 pb 资源的 
 */
const scoopPowerSwan = [
    
]

/**
 * 定义 寻找到 pb 资源的 
 */
const scoopDeposit = [
    
]



/**
 *  遍历 pbflag  判断需要生成寻找pb资源的房间
 */
function generateLookPbSourceCreep(pbSource){
     for(const i in pbSource) {
        const status = pbSource[i].flag;
        if(!status){
            //  创建一个移动速度为1的creep
            var powerBanks = _.filter(Game.creeps, (creep) => creep.memory.role == 'lookSource' && creep.memory.target == 'pb');
            if(powerBanks > 0){
                pbSource[i].flag = false;
            }else{
                const name = pbflag[i].room + ' ' + 'powerbank' 
                Game.spawns[getRoomSpwanName(pbflag[i].room)].spawnCreep([MOVE], name, 
                    {memory: {role: 'lookSource', target: 'pb', worker: true, room: pbflag[i].room}}); 
                pbSource[i].flag = false;

            }
        }
     }
 }

 /**
  * 遍历 depflag 判断所需要生成寻找 dep 资源的房间
  * @param {*} depositSourceList 
  */
// function generateLookDepositSourceCreep(depositSourceList){
//     for(const i in depositSourceList) {
//         //  创建一个移动速度为1的creep
//         var deposits = _.filter(Game.creeps, (creep) => creep.memory.role == 'lookSource' && creep.memory.target == 'deposit');
//         if(deposits > 0){
//             depositSourceList[i].flag = false;
//         }else{
//             const name = depositSourceList[i].room + ' ' + 'deposit' 
//             Game.spawns[getRoomSpwanName(depositSourceList[i].room)].spawnCreep([MOVE], name, 
//                 {memory: {role: 'lookSource', target: 'deposit', worker: true, room: pbflag[i].room}}); 
//                 depositSourceList[i].flag = false;
//         }
       
//     }
// }


/**
 * 获取当前没有生成 creep 的 spwan
 * @param {房间名称} roomName 
 */
function getRoomSpwanName(roomName){
    var list = [];
    for(const i in Game.spawns) {
        if(Game.spawns[i].spawning == null && Game.spawns[i].pos.roomName == roomName){
            list.push(i);
        }
    }
    if(list.length == 0 && roomName == 'E59N39'){
        return 'Spawn2';
    }
    // else if(list.length == 0 && roomName == 'E48N19'){
    //     return 'Spawn1'
    // }
    return list[0];
}

/**
 * 
 * 寻找资源的creep
 * @param {角色} role 
 * @param {类型} type 
 */
function lookSourceCreep(role,type){
    return _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.target == type)[0];
}

/**
 * 寻找powerbank
 * @param {creep} creep 
 */
function lookPbSource(creep,pbSpurceList){
    var targetRoom = 'E59N39' ;
    for(const i in pbSpurceList[0].routeRooms){
        if(pbSpurceList[0].routeRooms[i].flag){
            targetRoom = pbSpurceList[0].routeRooms[i].room;
            break;
        }
    }
    if(targetRoom){
        lookPbCreepAction(creep,targetRoom);
    }else{
        restartPbTask();
    }
}

/**
 * 寻找 deposit
 * @param {creep} creep 
 */
// function lookDepositSource(creep,depositSourceList){
//     var targetRoom = 'E48N19' ;
//     for(const i in depositSourceList[0].routeRooms){
//         if(depositSourceList[0].routeRooms[i].flag){
//             targetRoom = depositSourceList[0].routeRooms[i].room;
//             break;
//         }
//     }
//     if(targetRoom){
//         lookDepositCreepAction(creep,targetRoom);
//     }else{
//         restartDepostTask();
//     }
// }


/**
 * 自杀
 * @param {creep} creep 
 */
function suicide(creep){
    creep.suicide();
}

/**
 * 唤醒 creep ，让creep去寻找资源
 * @param {ticks} time 
 * @param {目标list} target 
 */
function wakeSleepCreep(time,target,room){
    if(time == 0){
        const targetPbObj = target.filter(x => x.room == room);
        targetPbObj.routeRooms.forEach(element => {
            element.flag = true;
        });
    }
}
/**
 * 向目标房间移动
 * @param {creep} creep 
 */
function lookPbCreepAction(creep,targetRoom){
    if(creep.room.visual.roomName != targetRoom){
        isPowerBank(creep);
        creep.moveTo(new RoomPosition( 22, 5, targetRoom))
    }else{
        const routeList = Memory.reomteSource.pbSource[0].routeRooms;
        for(var i in routeList){
            if(routeList[i].room == targetRoom){
                routeList[i].flag = false;
            }
        }
        Memory.reomteSource.pbSource[0].routeRooms = routeList;
    }
}

/**
 * 向目标房间移动
 * @param {creep} creep 
 */
// function lookDepositCreepAction(creep,targetRoom){
//     if(creep.room.visual.roomName != targetRoom){
//         isDepositExist(creep);
//         creep.moveTo(new RoomPosition( 22, 5, targetRoom))
//     }else{
//         const routeList = Memory.reomteSource.depositSource[0].routeRooms;
//         for(var i in routeList){
//             if(routeList[i].room == targetRoom){
//                 routeList[i].flag = false;
//             }
//         }
//         Memory.reomteSource.depositSource[0].routeRooms = routeList;
//     }
// }




/**
 * 判断pb是否存在
 * @param {creep} creep 
 */
function isPowerBank(creep){
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_POWER_BANK);
        }
     });
     if(targets.length > 0){
        recordPowerBankSource(creep , targets[0]);
     }
}


/**
 * 判断 deposit 是否存在 FIND_DEPOSITS
 * @param {creep} creep 
 */
// function isDepositExist(creep){
//     var targets = creep.room.find(FIND_DEPOSITS);
//     if(targets.length > 0){
//         recordDepostSource(creep , targets[0]);
//     }
// }


/**
 * 记录powerbank资源
 * @param {powerbank 资源} target 
 */
function recordPowerBankSource(creep ,target){
    if(!isPbSourceExist(target,Memory.reomteSource.scoopPowerBank)){
        const source = {};
        source.room = target.room.name;
        source.generateRoom = creep.name.replace(' powerbank','');
        source.ticksToDecay = target.ticksToDecay;
        source.power = target.power;
        source.hits = target.hits;
        source.flag = true;
        Memory.reomteSource.scoopPowerBank.push(source)
    }
}

/**
 * 记录 deposit 资源
 * @param {deposit 资源} target 
 */
// function recordDepostSource(creep ,target){
//     if(!isDepositSourceExist(target,Memory.reomteSource.scoopDeposit) && target.lastCooldown < 100){
//         const source = {};
//         source.room = target.room.name;
//         source.generateRoom = creep.name.replace(' deposit','');
//         source.ticksToDecay = target.ticksToDecay;
//         source.flag = true;
//         Memory.reomteSource.scoopDeposit.push(source)
//     }
// }


/**
 * 判断资源是否存在
 * @param {资源} target 
 * @param {资源列表} sourceList 
 */
 function isPbSourceExist(target,sourceList){
    var status = false;
    for(var i in sourceList){
        if(sourceList[i].room == target.room.name){
            status = true;
        }   
    }
    return status;
 }

 /**
 * 判断资源是否存在
 * @param {资源} target 
 * @param {资源列表} sourceList 
 */
// function isDepositSourceExist(target,sourceList){
//     var status = false;
//     for(var i in sourceList){
//         if(sourceList[i].room == target.room.name)
//             status = true;
//     }
//     return status;
//  }

 /**
  * 重置 寻找 pb 的任务
  */
function restartPbTask(){
    const taskList = Memory.reomteSource.pbSource;
    for(var i in taskList){
        var status = false;
        for(var j in taskList[i].routeRooms){
            if(taskList[i].routeRooms[j].flag){
                status = true;
            }
        }
        if(!status){
            var routeRooms = [];
            for(var j in taskList[i].routeRooms){
                var route = {};
                route.room = taskList[i].routeRooms[j].room;
                route.flag = true;
                routeRooms.push(route);
            }
            Memory.reomteSource.pbSource[i].routeRooms = routeRooms;
        }
    }
}

/**
 * 重置 寻找 deposit 的任务
 */
// function restartDepostTask(){
//     const taskList = Memory.reomteSource.depositSource;
//     for(var i in taskList){
//         var status = false;
//         for(var j in taskList[i].routeRooms){
//             if(taskList[i].routeRooms[j].flag){
//                 status = true;
//             }
//         }
//         if(!status){
//             var routeRooms = [];
//             for(var j in taskList[i].routeRooms){
//                 var route = {};
//                 route.room = taskList[i].routeRooms[j].room;
//                 route.flag = true;
//                 routeRooms.push(route);
//             }
//             Memory.reomteSource.depositSource[i].routeRooms = routeRooms;
//         }
//     }
// }

/**
 * 检测挖掘pb的任务
 */
function checkScoopPbTask(){
   const scoopPowerBankList = Memory.reomteSource.scoopPowerBank;
   for(var i in scoopPowerBankList){
       if(scoopPowerBankList[i].flag){
            isTaskCreepExist(scoopPowerBankList[i]);
            Memory.reomteSource.scoopPowerBank[i].flag = false;
       }else{
            Memory.reomteSource.scoopPowerBank[i].flag = true;
       }
   }
}

/**
 * 检测挖掘deposit的任务
 */
// function checkScoopDepsitTask(){
//     const scoopPowerBankList = Memory.reomteSource.scoopDeposit;
//     for(var i in scoopPowerBankList){
//         isDepositTaskCreepExist(scoopPowerBankList[i]);
//     }
// }

/**
 * 生成攻击工具pb建筑的creep
 * @param {任务} task 
 */
function generateAttackPbCreep(task){
    const name = task.room + ' ' + task.generateRoom + ' ' + 'attack' 
    Game.spawns[getRoomSpwanName(task.generateRoom)].spawnCreep([
        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        MOVE,MOVE,MOVE,MOVE,MOVE
    ], name, 
        {memory: {role: 'attack', target: 'pb', worker: true, room: task.room}}); 
}

/**
 * 生成治疗 creep
 * @param {任务} task 
 */
function generateHealCreep(task){
    const name = task.room + ' ' + task.generateRoom +' ' + 'heal' 
    Game.spawns[getRoomSpwanName(task.generateRoom)].spawnCreep([
        HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
        HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
        HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
       
    ], name, 
        {memory: {role: 'heal', target: 'pb', worker: true, room: task.room}});
}

/**
 * 根据资源房间的情况生成对应的creep
 * @param {任务} task 
 */
function generateCarryCreep(task){
    var carryNumber = Math.ceil(task.power / 1500)
    var carrys = _.filter(Game.creeps, (creep) => creep.memory.role == 'carry' && creep.memory.target == 'pb' && creep.memory.room == task.room)
    if(carrys.length < carryNumber){
        const name = task.room + ' ' + task.generateRoom +' ' + 'carry' + Game.time;
        Game.spawns[getRoomSpwanName(task.generateRoom)].spawnCreep([
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
        ], name, 
            {memory: {role: 'carry', target: 'pb', worker: true, room: task.room}});
    }
}

/**
 * 生成采矿 creep
 * @param {任务} task 
 */
// function generateHarvestCreep(task){
//     const name = task.room + ' ' + task.generateRoom +' ' + 'harvest' 
//     Game.spawns[getRoomSpwanName(task.generateRoom)].spawnCreep([
//         WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
//         WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
//         WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,
//         MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
//         MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
//     ], name, 
//         {memory: {role: 'harvest', target: 'deposit', worker: true, room: task.room}});
// }


/**
 * 生成采矿 creep
 * @param {任务} task 
 */
// function generateCarryDepositCreep(task){
//     const name = task.room + ' ' + task.generateRoom +' ' + 'carry' 
//     Game.spawns[getRoomSpwanName(task.generateRoom)].spawnCreep([
//         CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
//         CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
//         CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
//         MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
//         MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
//     ], name, 
//         {memory: {role: 'carry', target: 'deposit', worker: true, room: task.room}});
// }

/**
 * 判断对应的creep是否存在
 * @param {任务} task 
 */
function isTaskCreepExist(task){
    if((_.filter(Game.creeps, (creep) => creep.memory.role == 'attack' && creep.memory.target == 'pb' && creep.room == task.room)) == 0){
        generateAttackPbCreep(task);
    }
    if((_.filter(Game.creeps, (creep) => creep.memory.role == 'heal' && creep.memory.target == 'pb' && creep.room == task.room)) == 0){
        generateHealCreep(task);
    }
}
/**
 * 判断对应的creep是否存在
 * @param {*} task 
 */
// function isDepositTaskCreepExist(task){
//     if((_.filter(Game.creeps, (creep) => creep.memory.role == 'harvest' && creep.memory.target == 'deposit' && creep.room == task.room)) == 0){
//         generateHarvestCreep(task);
//     }
//     if((_.filter(Game.creeps, (creep) => creep.memory.role == 'carry' && creep.memory.target == 'deposit' && creep.room == task.room)) == 0){
//         generateCarryDepositCreep(task);
//     }
// }

/**
 * 执行挖pb的命令
 */
function executeScoopTask(){
    var attackList = _.filter(Game.creeps, (creep) => creep.memory.role == 'attack' && creep.memory.target == 'pb');
    var healkList = _.filter(Game.creeps, (creep) => creep.memory.role == 'heal' && creep.memory.target == 'pb');
    var carryPbList = _.filter(Game.creeps, (creep) => creep.memory.role == 'carry' && creep.memory.target == 'pb');
    // var harvestList = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvest' && creep.memory.target == 'deposit');
    // var carryDepositList = _.filter(Game.creeps, (creep) => creep.memory.role == 'carry' && creep.memory.target == 'deposit');
    moveToPbHome(attackList,'attack');
    moveToPbHome(healkList,'heal');
    moveToPbHome(carryPbList,'carryPowerBank');
    // moveToPbHome(harvestList,'harvest');
    // moveToPbHome(carryDepositList,'carryDeposit');
}

/**
 * 向目标房间移动
 * @param {creepList} creepList 
 */
function moveToPbHome(creepList,type){
    for(var i in creepList){
        const remoteRoome = creepList[i].name.substring(0,6);
        if(creepList[i].room.visual.roomName != remoteRoome && creepList[i].ticksToLive > 300){
            creepList[i].moveTo(new RoomPosition( 25, 25, remoteRoome))
        }else{
            if(type == 'attack'){
                attackPowerBank(creepList[i]);
            }else if(type == 'heal'){
                healHurtCreep(creepList[i]);
            }else if(type == 'carryPowerBank'){
                pickupPowerBank(creepList[i]);
            }
            // else if(type == 'harvest'){
            //     harvestDeposit(creepList[i]);
            // }else if(type == 'carryDeposit'){
            //     carryDeposit(creepList[i]);
            // }
        }
    }
}
/**
 * 采集 deposit
 * @param {creep} creep 
 */
// function harvestDeposit(creep){
//     if(creep.store.getUsedCapacity() == 0 && creep.ticksToLive < 300) {
//         suicide(creep)
//     }
//     if(creep.ticksToLive < 50){
//         var creeps =  _.filter(Game.creeps, (x) => x.memory.role == 'carry' && x.memory.target == 'deposit' && x.memory.room ==  creep.room.visual.roomName);
//         if(creeps.length >0){
//             if(creep.transfer(creeps[0],RESOURCE_MIST) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(creeps[0]);
//             }
//         }
//     }
//     // 回家
//     var target = creep.room.find(FIND_DEPOSITS);
//     if(creep.store.getFreeCapacity() > 0 ) {
//         if(target.length >0){
//             if(target[0].lastCooldown > 100){
//                 deleteTask1(creep.room.visual.roomName)
//             }else{
//                 if(creep.harvest(target[0]) == ERR_NOT_IN_RANGE) {
//                     creep.moveTo(target[0]);
//                 }
//             } 
//         }else{
//             if(creep.room.visual.roomName == creep.name.substring(0,6)){
//                 deleteTask1(creep.name.substring(0,6));
//             }
//         }   
//     }else{
//         var creeps =  _.filter(Game.creeps, (x) => x.memory.role == 'carry' && x.memory.target == 'deposit' && x.memory.room ==  creep.room.visual.roomName);
//         if(creeps.length >0){
//             if(creep.transfer(creeps[0], target[0].depositType) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(creeps[0]);
//             }
//         }
//     }
// }


/**
 * 搬运 deposit
 * @param {*} creep 
 */
function carryDeposit(creep){
    if(creep.store.getUsedCapacity() == 0 && creep.ticksToLive < 300) {
        suicide(creep)
    }
    const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
    if(target) {
        if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }else{
        if(creep.store.getFreeCapacity() > 0 && creep.ticksToLive > 300) {
            var creeps =  _.filter(Game.creeps, (x) => x.memory.role == 'harvest' && x.memory.room ==  creep.room.visual.roomName);
            if(creeps.length > 0)
                creep.moveTo(creeps[0]);
            
        }else{
            if (creep.room.visual.roomName != creep.name.substring(7,13)) {
                creep.moveTo(new RoomPosition( 25, 25, creep.name.substring(7,13)))
            }else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                            return (structure.structureType == STRUCTURE_TERMINAL
                        );
                    }
                });
                if(targets.length > 0){
                    creep.moveTo(targets[0]);
                    for(const resourceType in creep.carry) {
                        creep.transfer(targets[0], resourceType);
                    }
                }
            }
        }
    }
}

    

/**
 * 攻击powerbank
 * @param {creep} creep 
 */
function attackPowerBank(creep){
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_POWER_BANK);
        }
    });
    // todo 更新 更新 这个房间中 powerbank 的信息
    if(targets.length >0){
        judgeSourceMessage(targets[0]);
        if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
        }
    }else{
        // 采集 pb 任务完成  删除 缓存中的任务
        deleteTask(creep.room.visual.roomName);
        suicide(creep);
    }  
}
/**
 * 治疗受伤的creep
 * @param {creep} creep 
 */
function healHurtCreep(creep){
    const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
        filter: function(object) {
            return object.hitsMax > object.hits ;
        }
    });
    if(target) {
        if(creep.heal(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }else{
        // 没有受伤对象就向 powerbank 移动
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_POWER_BANK);
            }
        });
        if(targets.length>0){
            creep.moveTo(targets[0]);
        }else{
            suicide(creep);
        } 
    }
}
/**
 * 去采集资源 并带回
 * @param {采集资源的creep} creep 
 */
function pickupPowerBank(creep){
    
    if(creep.store.getUsedCapacity(RESOURCE_POWER) == 0) {
        if (creep.room.visual.roomName != creep.name.substring(7,13)) {
            creep.moveTo(1,1);
        }
        const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if(target) {
            if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }else{
            // const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            //     filter: function(object) {
            //         return object.hitsMax > object.hits ;
            //     }
            // });
            creep.moveTo(25,25)
        }
     }else{
        if (creep.room.visual.roomName != creep.name.substring(7,13)) {
            creep.moveTo(new RoomPosition(15,37, 'E59N29'))
        }else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE
                    );
                }
            });
            if(targets.length > 0){
                if(creep.transfer(targets[0], RESOURCE_POWER) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
     }
}


/**
 * 判断当前房间 powerbank 还有多少 hixs 
 * @param {资源} target 
 */
function judgeSourceMessage(target){
    if(target.hits < 400000){
        const scoopPowerBankList =  Memory.reomteSource.scoopPowerBank;
        for(var i in scoopPowerBankList){
            if(target.room.name == scoopPowerBankList[i].room)
            generateCarryCreep(scoopPowerBankList[i]);
        }
    }else{
        if(target.ticksToDecay < 400){
            // 快到时间了 ，放弃本次任务
            deleteTask(target.room.name);
        }
    }
}


/**
 * 删除即将过期的任务
 * @param {资源} target 
 */
function deleteTask(room){
    const scoopPowerBankList =  Memory.reomteSource.scoopPowerBank;
    for(var i in scoopPowerBankList){
        if(room == scoopPowerBankList[i].room){
            Memory.reomteSource.scoopPowerBank.splice(i,1);
        }      
    }
}

/**
 * 删除即将过期的任务
 * @param {资源} target 
 */
// function deleteTask1(room){
//     var scoopDepositList =  Memory.reomteSource.scoopDeposit;
//     for(var i in scoopDepositList){
//         if(room == scoopDepositList[i].room){
//             Memory.reomteSource.scoopDeposit.splice(i,1);
//         }      
//     }
// }


