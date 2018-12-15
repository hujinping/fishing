cc.Class({
                extends: cc.Component,
                properties: {
                    icon: cc.Sprite,
                    information: cc.Label,
                    gold: cc.Label,
                    receiveBtn: cc.Sprite,
                    receiveBtnSp: [ cc.SpriteFrame ],
                    goldIcon: cc.Node,
                    hongbaoIcon: cc.Node
                },
                start: function() {},
                updateItem: function(t) {
                    this.state = !1, this.ishongbao = !1;
                    var e = fishMaster.gameData.getHookSizeMoney() + fishMaster.gameData.getFallingDepthMoney() + fishMaster.gameData.getOfflineIncomeMoney();
                    this.information.string = t.information + "(" + t.progress + "/" + t.target + ")", 
                    this.goldNum = t.reward, 19.5 < fishMaster.gameData.getRedPacketMoney() && (t.hongbao = 0), 
                    1 == t.hongbao ? (this.hongbaoIcon.active = !0, this.goldIcon.active = !1, this.gold.string = t.reward, 
                    this.goldNum = t.reward, this.ishongbao = !0) : (this.hongbaoIcon.active = !1, this.goldIcon.active = !0, 
                    this.gold.string = D(e / 5), this.goldNum = D(e / 5)), this.index = t.index, 0 == t.isFinish && (this.receiveBtn.spriteFrame = this.receiveBtnSp[0], 
                    this.state = !1), 1 == t.isFinish && (this.receiveBtn.spriteFrame = this.receiveBtnSp[1], 
                    this.state = !0), 1 == t.isReceive && (this.receiveBtn.spriteFrame = this.receiveBtnSp[2], 
                    this.state = !1);
                },
                receiveBtnFun: function() {
                    this.state && (mg.mta.Bilog(fishMaster.Bi_EventID.dailyTaskGet), fishMaster.gameData.updataDailyTaskData(this.index, 0, 1), 
                    fishMaster.dailyTasks.updateTaskData(), this.ishongbao ? (fishMaster.gameData.dirAddRedPacketMoney(this.goldNum), 
                    fishMaster.redPacket.freshData()) : (fishMaster.gameData.addGameMoney(parseInt(this.gold.string)), 
                    fishMaster.homeMain.freshGoldLabel()));
                }
            })