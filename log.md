>更新日期：18/11/2020

更新内容：在`memory`中添加了两组新的位置坐标，使两个矿都有`newharvester`这个creep为此位置的`container`提供energy

修改bug：在`newSpawn`中的**spawnSign**的参数,非常的重要，如果你发现的`Spawn`一直在生产一个相同种类的creep，并且超出creepTarget.
length的限制。那一定是你忘记了在此creep的**memory**中添加**spawnSign**。~~不要问我怎么知道的~~
***
>更新日期：19/11/2020

更新内容：今天凌晨我的第二个房到了5级，首先因为rcl到等级了但是相应的`extension`并没有到达预定值，所以他创建出来的`newharvester`的body还是拥有carry的，而已他不会去做其他工作。
这样也导致了`transfer`也会出问题。并且应为刚刚升到5级`link`建筑还没有建立，所以也不能有`s2t`这种creep，所以在房间刚5级时，一切都要和以前一样，当所有建筑都建好后，再手动修改。
~~（还有为什么每次出问题都在晚上╮(╯▽╰)╭）~~
>- **5级手动调节内容：**

 - 首先你要看`memory`中的5级的creepList中的内容是不是与4级一样。

 - 如果不一样并且房间已经开始生产creep，那么后台会在`rolenewHarvester`与`roletransfer`报错，这是你需要修改creepList中的内容与4级一致，还有`newSpawn`中 >=1800 `Hbody`的内容。删掉相应房间中的`newharvester`与`s2t`,修改`role.transfer`中的代码（把注释代码放开）。然后就开始修建筑

 - 如果一样开始修建筑，当所有建筑修好后，将修好的建筑的id保存到`memory`中，修改`memory`中5级creepList的内容与6级一致和`newSpawn`中 >=1800 `Hbody`的内容。这也是上边的问题来由。
***
>更新日期：21/11/2020

更新内容：第二个房5级并且建好第二个塔之后，出现了一个现象，就是第二个房中的第一个塔的energy无法充满，甚至到最后没有energy，并且`linkandtower`也不给第一个塔充能就进行其他任务。代码表面看起来并没有什么问题，所以我将这部分的逻辑重构了一下。

>- **重构内容**

 - 在`role.tower`中添加判断tower剩余能量的代码，当能量剩余550时，将此tower的对象存入内存中。然后在`linkandtower`中添加从内存中拿到此tower的对象，使creep对其充能。问题解决(#^.^#)

 >更新日期：6/12/2020

 更新内容：随着房间等级的提升与房间个数的增加，`tower`的个数也在增加，所以上边的解决方法就显得很低效。所以跟新了`linkandtower`creep的逻辑，编写了一个tower的状态数组，当`tower`的energy低于550是为true，当energy到达1000是就改为false。creep开始工作时回去扫描这个数组状态为true是就充能，false时就给`link`充能
***
>更新日期：5/12/2020

更新内容：调整一些代码细节~~使我的代码更像个框架式的代码~~；并添加4个（`Mhar`,`claimNewRoom`,`lookForSource`,`labWorkAction`）特殊文件

>- 介绍这4个文件之前先说一下这个游戏玩家主要运用三个编码方向：
 - `Task`：任务驱动型——由建筑发布任务，将发布的任务存入内存，有任务时就生产creep，让creep根据内存中的任务完成一个一个的任务
 - `role`：角色驱动型——也是官方提供的编码方向，生成相应的creep去完成其特定的任务，除此任务不会去执行其他任务
 - `role & Task`：两者结合型——顾名思义就是两者结合的形式
 **注意：**这里只是简单的介绍，如果你想了解更多，点击 [hoho大佬《Screeps 游戏中的两大设计模式》](https://www.jianshu.com/p/7226e08c4b8e)

所以之前的代码都是`role`形式的编码方向这也导致了在·开新房时如何援建的问题·，包括一些特殊任务，如：采集过道资源、房间`mineral`资源采集的问题、`lab`工作任务处理。

`Mhar`:在`memory`中的roomResource中添加房间中`mineral`资源类型，当其{mineralAmount}属性不等于0是就检查此房间中相应的`mhar`creep是否存在，这样就避免了`mineral`进入5000tick的冷却时`mhar`creep无事可做的局面

`claimNewRoom`：在你看好一个房间时运行claimNewRoom.run(spawnName,newRoomName);第一个参数是离你看好新房最近的已拥有房间中一个`spawn`的名字，第二个参数是新房间的名字。设置好后程序会先派出一个`see`的creep去新房间查看情况根据相应的情况生产creep去attack还是claim或者援建

`lookForSource`：lookForSource.run();直接运行，首先会派出一个`lookfor`的creep去主房间周围的几个房间（需要手动设置个数无所谓）巡逻查看周围房间情况，并收集出现的过道资源信息，经过判断发布任务，根据任务类型生产相应的creep

`labWorkAction`：需要现在`memory`中roomResource添加labId数组定义每个lab的类型、存储的资源和lab的id，然后程序会查看房间中lab中的资源存储量是否满足，如不满足就收集信息并发布任务，如果有任务就生产`labcreep`creep根据任务工作

***

> 更新日期：1/1/2021

更新内容：添加一个特殊文件`roleOutSource` ——这个文件是开采外矿以及援建（由于游戏附近可能会有群友房间为了可以让其房间快速的发展就需要将energy搬到他的房间内供他发展有偿或无偿，看心情）的代码

`roleOutSource` roleOutSource.run(room,ids,stuta,outhelp);room为外矿的房间名或援建的房间名，ids为外矿的source矿id或援建的存储建筑的id，stuta为开外矿时要不要预定房间，outhelp为是否开始援建。无论是援建还是开外矿所需要的cup都很大所以只能2选1

> 更新日期：20/1/2021

更新内容：修改tower的工作逻辑；之前的逻辑是由一个固定的tower每tick查找房间内的敌人以及需要维修的建筑，但这里就有一个隐患，一旦敌人将这个tower打掉那么所有的tower将不会工作。所以现在改为房间对象查找由于（我觉得）房间查找比单体对象查找所需要的cup较大所以敌人是每tick扫描，建筑是10tick扫描，并将扫描到的对象缓存，tower直接从缓存中获取对象
