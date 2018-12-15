var D = Math.floor;
var b = Math.pow;
fishMaster.gameData = {
    freshLocalData: function() {
        mg.util.isLastLoginToday() || (this.updateCanWatchVideo(!0), this.resetDailyTaskData(),
                mg.util.setItemToLocalStorage("dailyShareCount", 0), mg.util.setItemToLocalStorage("dailyVideoCount", 0)),
            this.updateLastLoginDate();
    },
    setLocation: function(t) {
        mg.util.setItemToLocalStorage("location", t);
    },
    getLocation: function() {
        return mg.util.getItemFromLocalStorage("location", "init");
    },
    setLimitLocData: function(t) {
        mg.util.setItemToLocalStorage("limitLocData", t);
    },
    getLimitLocData: function() {
        return mg.util.getItemFromLocalStorage("limitLocData", "init");
    },
    setTotalShareCount: function() {
        var t = parseInt(mg.util.getItemFromLocalStorage("totalShareCount", "0"));
        mg.util.setItemToLocalStorage("totalShareCount", t + 1);
    },
    setTotalVideoCount: function() {
        var t = parseInt(mg.util.getItemFromLocalStorage("totalVideoCount", "0"));
        mg.util.setItemToLocalStorage("totalVideoCount", t + 1);
    },
    setDailyShareCount: function() {
        var t = parseInt(mg.util.getItemFromLocalStorage("dailyShareCount", "0"));
        mg.util.setItemToLocalStorage("dailyShareCount", t + 1);
    },
    setDailyVideoCount: function() {
        var t = parseInt(mg.util.getItemFromLocalStorage("dailyVideoCount", "0"));
        mg.util.setItemToLocalStorage("dailyVideoCount", t + 1);
    },
    getTotalShareCount: function() {
        return parseInt(mg.util.getItemFromLocalStorage("totalShareCount", "0"));
    },
    getTotalVideoCount: function() {
        return parseInt(mg.util.getItemFromLocalStorage("totalVideoCount", "0"));
    },
    getDailyShareCount: function() {
        return parseInt(mg.util.getItemFromLocalStorage("dailyShareCount", "0"));
    },
    getDailyVideoCount: function() {
        return parseInt(mg.util.getItemFromLocalStorage("dailyVideoCount", "0"));
    },
    resetDailyTaskData: function() {
        var t = mg.util.shuffle(fishMaster.dailyTasksData);
        t = t.slice(0, 5), mg.util.setItemToLocalStorage("dailyTaskData", JSON.stringify(t));
    },
    getDailyTaskData: function() {
        var t = mg.util.shuffle(fishMaster.dailyTasksData);
        return t = t.slice(0, 5), JSON.parse(mg.util.getItemFromLocalStorage("dailyTaskData", JSON.stringify(t)));
    },
    updataDailyTaskData: function(o, e, t) {
        for (var d = this.getDailyTaskData(), r = 0, n = 0, a = 0; a < d.length; a++) o == d[a].index && (d[a].progress < d[a].target && (d[a].progress += e,
            d[a].isFinish = d[a].progress < d[a].target ? 0 : 1), 0 == d[a].isReceive && (d[a].isReceive = t));
        for (a = 0; a < d.length; a++) 1 == d[a].isFinish && (r += 1, 0 == d[a].isReceive && (n += 1));
        for (a = 0; a < d.length; a++) 7 == d[a].index && (d[a].progress = r > d[a].target ? d[a].target : r,
            d[a].isFinish = d[a].progress < d[a].target ? 0 : 1);
        fishMaster.homeMain.refreshDailyTaskRedPoint(0 < n), mg.util.setItemToLocalStorage("dailyTaskData", JSON.stringify(d));
    },
    setOpenFish: function(t) {
        mg.util.setItemToLocalStorage("openFish" + t, !0);
    },
    getOpenFish: function(t) {
        return mg.util.getItemFromLocalStorage("openFish" + t, !1);
    },
    dirAddRedPacketMoney: function(a) {
        var e = parseFloat(mg.util.getItemFromLocalStorage("redPacketMoney", "0.00"));
        19.9 <= (e = D(100 * e) / 100) + a || (mg.util.setItemToLocalStorage("redPacketMoney", e + a),
            fishMaster.homeMain.showGetMoneyAction(a));
    },
    addRedPacketMoney: function(a) {
        var e = parseInt(mg.util.getItemFromLocalStorage("redPacketGiveMoney", "0"));
        e < fishMaster.redPacketMoneyData.length && (a = fishMaster.redPacketMoneyData[e]);
        var t = parseFloat(mg.util.getItemFromLocalStorage("redPacketMoney", "0.00"));
        t = D(100 * t) / 100, mg.util.setItemToLocalStorage("redPacketGiveMoney", e + 1),
            19.88 <= t || (mg.util.setItemToLocalStorage("redPacketMoney", t + a), fishMaster.addRedPacketMoneyCount = a);
    },
    getRedPacketMoney: function() {
        var t = parseFloat(mg.util.getItemFromLocalStorage("redPacketMoney", "0.00"));
        return t = D(100 * t) / 100;
    },
    getRedPacketGiveMoney: function() {
        return parseInt(mg.util.getItemFromLocalStorage("redPacketGiveMoney", "0"));
    },
    addRedPacketHookCount: function() {
        var t = parseInt(mg.util.getItemFromLocalStorage("redPacketHookCount", "0"));
        mg.util.setItemToLocalStorage("redPacketHookCount", t + 1);
    },
    getRedPacketHookCount: function() {
        return parseInt(mg.util.getItemFromLocalStorage("redPacketHookCount", "0"));
    },
    resetRedPacketHookCount: function() {
        mg.util.setItemToLocalStorage("redPacketHookCount", 0);
    },
    updateCanWatchVideo: function(t) {
        mg.util.setItemToLocalStorage("canWatchVideo", t);
    },
    getCanWatchVideo: function() {
        return mg.util.getItemFromLocalStorage("canWatchVideo", "true");
    },
    updateLastLoginDate: function() {
        var t = new Date().toLocaleDateString();
        mg.util.setItemToLocalStorage("lastLoginDate", t);
    },
    getLastLoginDate: function() {
        return mg.util.getItemFromLocalStorage("lastLoginDate", "");
    },
    addGameMoney: function(a) {
        var e = parseInt(mg.util.getItemFromLocalStorage("gameMoney", "200"));
        mg.util.setItemToLocalStorage("preGameMoney", e), mg.util.setItemToLocalStorage("gameMoney", e + a);
    },
    setHookSize: function() {
        var t = parseInt(mg.util.getItemFromLocalStorage("hookSize", "1"));
        mg.util.setItemToLocalStorage("hookSize", t + 1);
    },
    setFallingDepth: function() {
        var t = parseInt(mg.util.getItemFromLocalStorage("fallingdepth", "1"));
        mg.util.setItemToLocalStorage("fallingdepth", t + 1);
    },
    setTempFallingDepth: function() {
        var t = parseInt(mg.util.getItemFromLocalStorage("fallingdepth", "1"));
        mg.util.setItemToLocalStorage("tempfallingdepth", t);
    },
    setOfflineIncome: function() {
        var t = parseInt(mg.util.getItemFromLocalStorage("offlineincome", "1"));
        mg.util.setItemToLocalStorage("offlineincome", t + 1);
    },
    setOfflineTime: function(t) {
        mg.util.setItemToLocalStorage("offlineTime", t);
    },
    setFishTotal: function(a) {
        var e = parseInt(mg.util.getItemFromLocalStorage("fishTotalCount", "0"));
        mg.util.setItemToLocalStorage("fishTotalCount", e + a);
    },
    setGuideIndex: function(t) {
        mg.util.setItemToLocalStorage("playerGuide" + t, !0);
    },
    setUpGradeCount: function(a) {
        var e = parseInt(mg.util.getItemFromLocalStorage("upgradecount" + a, "1"));
        mg.util.setItemToLocalStorage("upgradecount" + a, e + 1);
    },
    setStartCount: function(a) {
        var e = parseInt(mg.util.getItemFromLocalStorage("startCount" + a, "1"));
        mg.util.setItemToLocalStorage("startCount" + a, e + 1);
    },
    reStartCount: function(t) {
        mg.util.setItemToLocalStorage("startCount" + t, 1);
    },
    getStartCount: function(t) {
        return parseInt(mg.util.getItemFromLocalStorage("startCount" + t, "1"));
    },
    getUpGradeCount: function(t) {
        return parseInt(mg.util.getItemFromLocalStorage("upgradecount" + t, "1"));
    },
    getGuideIndex: function(t) {
        return mg.util.getItemFromLocalStorage("playerGuide" + t, !1);
    },
    getGameMoney: function() {
        return parseInt(mg.util.getItemFromLocalStorage("gameMoney", "200"));
    },
    getPreGameMoney: function() {
        return parseInt(mg.util.getItemFromLocalStorage("preGameMoney", "200"));
    },
    getHookSize: function() {
        var t = parseInt(mg.util.getItemFromLocalStorage("hookSize", "1"));
        return t += 2;
    },
    getHookSizeMoney: function() {
        var t = parseInt(mg.util.getItemFromLocalStorage("hookSize", "1"));
        return t = D(224.9 * b(Math.E, .223 * t));
    },
    getFallingDepth: function() {
        var t = parseInt(mg.util.getItemFromLocalStorage("fallingdepth", "1"));
        return t = 10 * t + 20;
    },
    getFallingDepthUnit: function() {
        var t = parseInt(mg.util.getItemFromLocalStorage("fallingdepth", "1"));
        return (t = 10 * t + 20) * fishMaster.GameDefine.depthUnit;
    },
    getTempFallingDepthUnit: function() {
        var t = parseInt(mg.util.getItemFromLocalStorage("tempfallingdepth", "1"));
        return (t = 10 * t + 20) * fishMaster.GameDefine.depthUnit;
    },
    getFallingDepthMoney: function() {
        var t = parseInt(mg.util.getItemFromLocalStorage("fallingdepth", "1"));
        return t = D(224.9 * b(Math.E, .223 * t));
    },
    getOfflineIncome: function() {
        var t = parseInt(mg.util.getItemFromLocalStorage("offlineincome", "1"));
        return t = D(4.975 * b(Math.E, .195 * t));
    },
    getOfflineIncomeMoney: function() {
        var t = parseInt(mg.util.getItemFromLocalStorage("offlineincome", "1"));
        return t = D(224.9 * b(Math.E, .223 * t));
    },
    getOfflineTime: function() {
        return parseInt(mg.util.getItemFromLocalStorage("offlineTime", "0"));
    },
    getFishTotal: function() {
        return parseInt(mg.util.getItemFromLocalStorage("fishTotalCount", "0"));
    }
}, fishMaster.fishData = [{
    index: 0,
    gold: 50,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 10,
    maxDepth: 50,
    fresh: .3
}, {
    index: 1,
    gold: 75,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 30,
    maxDepth: 60,
    fresh: .3
}, {
    index: 2,
    gold: 100,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 40,
    maxDepth: 70,
    fresh: .3
}, {
    index: 3,
    gold: 125,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 50,
    maxDepth: 80,
    fresh: .3
}, {
    index: 4,
    gold: 150,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 60,
    maxDepth: 90,
    fresh: .3
}, {
    index: 5,
    gold: 175,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 70,
    maxDepth: 100,
    fresh: .3
}, {
    index: 6,
    gold: 200,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 90,
    maxDepth: 120,
    fresh: .3
}, {
    index: 7,
    gold: 225,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 110,
    maxDepth: 140,
    fresh: .3
}, {
    index: 8,
    gold: 250,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 130,
    maxDepth: 160,
    fresh: .3
}, {
    index: 9,
    gold: 275,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 150,
    maxDepth: 180,
    fresh: .3
}, {
    index: 10,
    gold: 300,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 170,
    maxDepth: 200,
    fresh: .3
}, {
    index: 11,
    gold: 375,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 200,
    maxDepth: 230,
    fresh: .3
}, {
    index: 12,
    gold: 450,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 230,
    maxDepth: 260,
    fresh: .3
}, {
    index: 13,
    gold: 525,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 260,
    maxDepth: 290,
    fresh: .3
}, {
    index: 14,
    gold: 600,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 290,
    maxDepth: 320,
    fresh: .3
}, {
    index: 15,
    gold: 675,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 320,
    maxDepth: 350,
    fresh: .3
}, {
    index: 16,
    gold: 750,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 350,
    maxDepth: 380,
    fresh: .3
}, {
    index: 17,
    gold: 825,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 380,
    maxDepth: 410,
    fresh: .3
}, {
    index: 18,
    gold: 950,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 410,
    maxDepth: 440,
    fresh: .3
}, {
    index: 19,
    gold: 1075,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 440,
    maxDepth: 470,
    fresh: .3
}, {
    index: 20,
    gold: 1200,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 470,
    maxDepth: 500,
    fresh: .3
}, {
    index: 21,
    gold: 1325,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 500,
    maxDepth: 530,
    fresh: .3
}, {
    index: 22,
    gold: 1450,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 530,
    maxDepth: 560,
    fresh: .3
}, {
    index: 23,
    gold: 1575,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 560,
    maxDepth: 590,
    fresh: .3
}, {
    index: 24,
    gold: 1700,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 590,
    maxDepth: 620,
    fresh: .3
}, {
    index: 25,
    gold: 1825,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 620,
    maxDepth: 650,
    fresh: .3
}, {
    index: 26,
    gold: 1950,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 650,
    maxDepth: 680,
    fresh: .3
}, {
    index: 27,
    gold: 2075,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 680,
    maxDepth: 710,
    fresh: .3
}, {
    index: 28,
    gold: 2200,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 710,
    maxDepth: 740,
    fresh: .3
}, {
    index: 29,
    gold: 2325,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 740,
    maxDepth: 770,
    fresh: .3
}, {
    index: 30,
    gold: 2450,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 770,
    maxDepth: 800,
    fresh: .3
}, {
    index: 31,
    gold: 2575,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 800,
    maxDepth: 830,
    fresh: .3
}, {
    index: 32,
    gold: 2700,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 830,
    maxDepth: 860,
    fresh: .3
}, {
    index: 33,
    gold: 2825,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 860,
    maxDepth: 890,
    fresh: .3
}, {
    index: 34,
    gold: 2950,
    canMove: 1,
    speed: 2,
    rota: 90,
    Obliquely: 0,
    minDepth: 890,
    maxDepth: 3920,
    fresh: .3
}], fishMaster.fishInfoData = [{
    index: 0,
    name: "红鲮",
    information: "栖于南方水温较高的河流内，不耐低温，一般水温低于7℃时即不能生存，以藻类及水底腐殖质为食。"
}, {
    index: 1,
    name: "雀雕",
    information: "全身橙色还夹杂了浅蓝色，额头以及背部的黄色比较明显，且全身有细蓝点连成的线条，尾背鳍还有一个黑眼状斑，超美！"
}, {
    index: 2,
    name: "斑纹龙",
    information: "体形较小，口部尖，体色为诡异绿色中带银色，半月形鳞片，腮盖有少许金边，尾鳍背鳍有金色斑纹！"
}, {
    index: 3,
    name: "刺鲀",
    information: "游泳速度很慢，所以遇到敌人就会伸出刺进行自卫，而且部分器官有剧毒，不能食用。"
}, {
    index: 4,
    name: "秋刀鱼",
    information: "秋刀鱼有几类天敌如海洋哺乳类、乌贼和鲔鱼、板鳃亚纲鱼类等，当逃离掠食者的时候，可以在水的表面上滑行。"
}, {
    index: 5,
    name: "黑非鱼",
    information: "赤道附近的食肉鱼，攻击性强，喜爱在河面上游动。"
}, {
    index: 6,
    name: "变异刺鲀",
    information: "游泳速度很慢，所以遇到敌人就会伸出刺进行自卫，而且部分器官有剧毒，不能食用。"
}, {
    index: 7,
    name: "大白鲨",
    information: "是浅海区最大的食肉鱼类，同时也是个好奇宝宝，因为它会将一切它们感兴趣的东西吞下去"
}, {
    index: 8,
    name: "角像鱼",
    information: "属于暖水性鱼类，带有剧毒，被攻击时才会喷射剧毒攻击敌人。"
}, {
    index: 9,
    name: "鮣鱼",
    information: "喜爱藏身于船底或游泳能力强的大鲨鱼、海龟、鲸的腹部，甚至游泳者的身上周游四海，是典型的免费旅行家。"
}, {
    index: 10,
    name: "非洲鱼",
    information: "它的肉质特别鲜美，有很高的营养价值。"
}, {
    index: 11,
    name: "红彩神仙鱼",
    information: "非常稀少，生活在比较深的水中，传说吃了可以增加寿命。"
}, {
    index: 12,
    name: "鲮鱼",
    information: "和红鲮是近亲，生活在深海，靠吃海藻生活。"
}, {
    index: 13,
    name: "吹肚鱼",
    information: "当遇到外来危险时使整个身体呈球状浮上水面，同时皮肤上的小刺竖起，借以自卫。"
}, {
    index: 14,
    name: "七夕斗鱼",
    information: "外观优美漂亮，像是中世纪参加舞会的贵族名媛，穿着华丽的礼服，让人无比沉醉。"
}, {
    index: 15,
    name: "喷火鱼",
    information: "是一种吞食介形虫后能排放发光物质的天竺鲷。"
}, {
    index: 16,
    name: "机械鱼",
    information: "是一种杂交而来的观赏鱼，很像机械做的假鱼而且相当贪吃。"
}, {
    index: 17,
    name: "绿针鱼",
    information: "一种深海鱼，细小游动速度快，喜爱吃微生物和海藻。"
}, {
    index: 18,
    name: "塔嘛鱼",
    information: "是由“塌目鱼”演化而来的，因本身繁殖能力非常弱，所以比较稀少珍贵。"
}, {
    index: 19,
    name: "萨门鱼",
    information: "是鲑科太平洋鲑鱼属的一种冷水性塘养鱼类。"
}, {
    index: 20,
    name: "海星",
    information: "具有奇特的星状身体，海星的皮肤表面的微小晶体可感知周围环境，充当“监视器”的作用。"
}, {
    index: 21,
    name: "邓氏鱼",
    information: "是一种活于古生代泥盆纪时期（约3.6亿至4.3亿年前）的大型古生物"
}, {
    index: 22,
    name: "黄斑鱼",
    information: "体型较小，全身黄色，长着锋利的牙齿，身体没有鳞片，有一些暗斑。"
}, {
    index: 23,
    name: "马夫鱼",
    information: "别称关刀鱼，应该是和三国关羽的刀有什么关系。"
}, {
    index: 24,
    name: "平鱼",
    information: "以甲壳类等动物为食。平鱼是热带和亚热带的食用和观赏兼备的大型鱼。"
}, {
    index: 25,
    name: "傻瓜鱼",
    information: "最守时的鱼类，日出而食日落而息，经常露出像傻瓜的表情。"
}, {
    index: 26,
    name: "鳟鱼",
    information: "是一类很有价值的垂钓鱼和食用鱼，最大的特点就是贵。"
}, {
    index: 27,
    name: "刺河豚",
    information: "变身后防御超高，而且有毒的异类刺鲀鱼。"
}, {
    index: 28,
    name: "黑章鱼",
    information: "相比于普通章鱼，可连续喷射10次墨汁，还可以拟态变身。"
}, {
    index: 29,
    name: "红横带龙",
    information: "身体修长，擅长长距离远行，同时也是游泳速度最快的鱼类。"
}, {
    index: 30,
    name: "蓝鲸",
    information: "已知的地星上生存过的体积最大的动物。"
}, {
    index: 31,
    name: "珍珠鱼",
    information: "鳍边镶嵌了珍珠状的灰色圆斑，游动时闪烁着五光十色的珠光宝气，因而被赞为珍珠鱼。"
}, {
    index: 32,
    name: "七彩神仙鱼",
    information: "一种极为稀少的鱼，背鳍和臀鳍都很长，上下对称，好像是张开帆的小船。"
}, {
    index: 33,
    name: "章鱼",
    information: "一种海洋软体动物，章鱼有三颗心脏，并且是唯一的一种蓝血海洋物种。"
}, {
    index: 34,
    name: "蓝海星",
    information: "海星的一种，体表为深蓝色，型如树枝，生命力极强，即使是将它分成十几份，它也能生存下来。"
}], fishMaster.boxData = [{
    index: 0,
    canMove: 0,
    speed: 2,
    minDepth: 10,
    maxDepth: 50,
    fresh: .3
}], fishMaster.redPacketFishData = [{
    index: 0,
    gold: 500,
    canMove: 1,
    speed: 4,
    rota: 90,
    Obliquely: 0,
    minDepth: 10,
    maxDepth: 50,
    fresh: .3
}], fishMaster.redPacketMoneyData = [2.41, 1.71, 0.45, 0.87, 0.11], fishMaster.dailyTasksData = [{
    index: 0,
    hongbao: 0,
    reward: 3123,
    progress: 0,
    target: 5,
    isFinish: 0,
    isReceive: 0,
    information: "升级5次任意捕鱼功能"
}, {
    index: 1,
    hongbao: 0,
    reward: 3123,
    progress: 0,
    target: 20,
    isFinish: 0,
    isReceive: 0,
    information: "钓起20条金色稀有鱼"
}, {
    index: 2,
    hongbao: 0,
    reward: 3123,
    progress: 0,
    target: 2,
    isFinish: 0,
    isReceive: 0,
    information: "看2次视频广告"
}, {
    index: 3,
    hongbao: 0,
    reward: 3123,
    progress: 0,
    target: 3,
    isFinish: 0,
    isReceive: 0,
    information: "分享到3个微信群"
}, {
    index: 4,
    hongbao: 0,
    reward: 3123,
    progress: 0,
    target: 1,
    isFinish: 0,
    isReceive: 0,
    information: "获得一次红包奖励"
}, {
    index: 5,
    hongbao: 0,
    reward: 3123,
    progress: 0,
    target: 15,
    isFinish: 0,
    isReceive: 0,
    information: "钓起15条红包鱼"
}, {
    index: 6,
    hongbao: 0,
    reward: 3123,
    progress: 0,
    target: 100,
    isFinish: 0,
    isReceive: 0,
    information: "钓起100条鱼"
}, {
    index: 7,
    hongbao: 1,
    reward: D(10 + 20 * Math.random()) / 100,
    progress: 0,
    target: 4,
    isFinish: 0,
    isReceive: 0,
    information: "今日完成4个任务"
}, {
    index: 8,
    hongbao: 0,
    reward: 3123,
    progress: 0,
    target: 3,
    isFinish: 0,
    isReceive: 0,
    information: "钓起3个宝箱"
}]