cc.Class({
    extends: cc.Component,
    properties: {
        redPacketFish: cc.Node,
        topNode: cc.Node,
        btnSprites: [cc.SpriteFrame]
    },
    onLoad: function() {
        fishMaster.redPacket = this, mg.EventDispatcher.listen(fishMaster.EVENT_GAME.RED_PACKET, this.showGetView, this),
            mg.EventDispatcher.listen(fishMaster.EVENT_GAME.PROPAGATE_SHARE_SUCESS, this._shareResult, this),
            mg.EventDispatcher.listen(fishMaster.EVENT_GAME.GROUP_SHARE_SUCCESS, this._forceShareResult, this),
            mg.EventDispatcher.listen(fishMaster.EVENT_GAME.GROUP_SHARE_FAIL, this._forceShareFail, this),
            this.Tips = this.node.getChildByName("Tips"), this.showRedView = this.node.getChildByName("showRedView"),
            this.getMoneyView = this.node.getChildByName("getMoneyView"), this.showTixianView = this.node.getChildByName("showTixianView"),
            this.money = this.topNode.getChildByName("money").getComponent(cc.Label), this.money.string = 0 == fishMaster.gameData.getRedPacketMoney() ? "0.00" : fishMaster.gameData.getRedPacketMoney().toString().replace(/[\.]/g, "."),
            this.nowMoney = this.getMoneyView.getChildByName("yueText").getComponent(cc.Label),
            this.getMoney = this.getMoneyView.getChildByName("getMoney").getComponent(cc.Label),
            this.tixianMoney = this.showTixianView.getChildByName("money").getComponent(cc.Label),
            this.giveMoney = 0, 1 == mg.isShareOpenData.redPacketOpen ? this.topNode.active = !0 : (this.topNode.active = !1,
                this.redPacketFish.active = !1);
    },
    onDestroy: function() {
        mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.RED_PACKET, this.showGetView, this),
            mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.PROPAGATE_SHARE_SUCESS, this._shareResult, this),
            mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.GROUP_SHARE_SUCCESS, this._forceShareResult, this),
            mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.GROUP_SHARE_FAIL, this._forceShareFail, this);
    },
    start: function() {},
    showRedPacket: function() {
        1 == mg.isShareOpenData.redPacketOpen ? this.topNode.active = !0 : (this.topNode.active = !1,
            this.redPacketFish.active = !1);
    },
    update: function() {
        this.redPacketFish.x < -cc.winSize.width / 2 + 100 ? this.redPacketFish.scaleX = 1 : this.redPacketFish.x > cc.winSize.width / 2 - 100 && (this.redPacketFish.scaleX = -1),
            this.redPacketFish.x += 1 * this.redPacketFish.scaleX;
    },
    btnClick: function() {
        if ("true" == fishMaster.gameData.getCanWatchVideo()) {
            var a = "提示",
                o = "观看视频,下一次钓鱼必定出现红包鱼",
                d = "放弃红包",
                s = "观看视频",
                c = this;
            wx.showModal({
                title: a,
                content: o,
                showCancel: !0,
                cancelText: d,
                confirmText: s,
                success: function(t) {
                    t.confirm ? mg.AD.createRewardedVideoAd(fishMaster.AD_ID.RedPacketId, function() {
                        c.showTips(!0), mg.mta.Bilog(fishMaster.Bi_EventID.clickBirdVieo), fishMaster.homeMain.hideBanner();
                    }, function() {
                        wx.showToast({
                            title: "视频失败"
                        }), mg.mta.Bilog(fishMaster.Bi_EventID.openBridVieo), fishMaster.homeMain.hideBanner();
                    }) : t.cancel && console.log("用户点击取消");
                },
                fail: function() {},
                complete: function() {}
            });
        } else a = "提示", o = "分享后下一次钓鱼必定出现红包鱼", d = "放弃分享", s = "去分享", c = this, wx.showModal({
            title: a,
            content: o,
            showCancel: !0,
            cancelText: d,
            confirmText: s,
            success: function(t) {
                t.confirm ? mg.GameShare.wxAutoShare(fishMaster.SharePoints.RedPacketFishPoint) : t.cancel && console.log("用户点击取消");
            },
            fail: function() {},
            complete: function() {}
        });
        mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1);
    },
    showTips: function(a) {
        if (1 == mg.isShareOpenData.redPacketOpen) {
            this.Tips.active = !0, this.Tips.stopAllActions(), this.Tips.getChildByName("success").active = a,
                this.Tips.getChildByName("fail").active = !a, a ? (fishMaster.isHaveRedPacketFish = !0,
                    this.redPacketFish.active = !1) : this.closeWin();
            var o = this;
            this.Tips.runAction(cc.sequence(cc.fadeIn(1), cc.fadeOut(3), cc.callFunc(function() {
                o.Tips.active = !1;
            })));
        }
    },
    showGetView: function() {
        mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1), this.showRedView.active = !0;
    },
    closeGetView: function() {
        mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1), this.showRedView.active = !1,
            this.showTips(!1);
    },
    openRedPacketBtn: function() {
        this.getMoneyView.getChildByName("saveMoneyBtn").getComponent(cc.Sprite).spriteFrame = 1 == mg.isShareOpenData.redPacketSaveShare && "true" == fishMaster.gameData.getCanWatchVideo() ? this.btnSprites[0] : this.btnSprites[1],
            mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1), this.showRedView.active = !1;
        var t = fishMaster.gameData.getRedPacketGiveMoney();
        this.giveMoney = D(1 + 7 * Math.random()) / 100, t < fishMaster.redPacketMoneyData.length && (this.giveMoney = fishMaster.redPacketMoneyData[t]),
            this.nowMoney.string = fishMaster.gameData.getRedPacketMoney().toString(),
            this.getMoney.string = this.giveMoney.toString().replace(/[\.]/g, "."), this.getMoneyView.active = !0;
    },
    closeGetMoneyView: function() {
        mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1), this.getMoneyView.active = !1,
            this.showTips(!1);
    },
    saveMoneyBtn: function() {
        if (1 == mg.isShareOpenData.redPacketSaveShare && "true" == fishMaster.gameData.getCanWatchVideo()) {
            var t = this;
            mg.AD.createRewardedVideoAd(fishMaster.AD_ID.RedPacketSaveId, function() {
                t.videoSuccessSaveMoney();
            }, function() {
                wx.showToast({
                    title: "领取失败"
                });
            });
        } else mg.GameShare.wxAutoShare(fishMaster.SharePoints.RedPacketPoint), mg.mta.Bilog(fishMaster.Bi_EventID.hongbaoShare);
        mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1);
    },
    _forceShareFail: function(a) {
        if (a) {
            var e = a.sharefrom;
            e != fishMaster.SharePoints.RedPacketPoint && e != fishMaster.SharePoints.RedPacketFishPoint || fishMaster.homeMain.failTips();
        }
    },
    _shareResult: function(a) {
        if (a) {
            var e = a.sharefrom;
            e != fishMaster.SharePoints.RedPacketPoint && e != fishMaster.SharePoints.RedPacketFishPoint || (1 == mg.isShareOpenData.isShareOpen ? mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.SHARE_RESULT, a) : this._successResult(a));
        }
    },
    _forceShareResult: function(t) {
        if (t) switch (t.sharefrom) {
            case fishMaster.SharePoints.RedPacketPoint:
                this.successSaveMoney();
                break;

            case fishMaster.SharePoints.RedPacketFishPoint:
                this.showTips(!0);
        }
    },
    _successResult: function(a) {
        var e = a.sharefrom,
            t = a.result;
        t.shareTickets && t.shareTickets[0] ? e === fishMaster.SharePoints.RedPacketPoint ? this.successSaveMoney() : e === fishMaster.SharePoints.RedPacketFishPoint ? this.showTips(!0) : void 0 : mg.util.wechatShowModal("获取失败，请分享到群", !1, "确认");
    },
    videoSuccessSaveMoney: function() {
        fishMaster.gameData.updataDailyTaskData(4, 1, 0), fishMaster.gameData.addRedPacketMoney(this.giveMoney),
            this.freshData(), this.closeWin(), this.getMoneyView.active = !1;
    },
    successSaveMoney: function() {
        mg.mta.Bilog(fishMaster.Bi_EventID.hongbaoShareSuccess), fishMaster.gameData.updataDailyTaskData(4, 1, 0),
            fishMaster.gameData.addRedPacketMoney(this.giveMoney), this.freshData(), this.closeWin(),
            this.getMoneyView.active = !1;
    },
    freshData: function() {
        mg.isShareOpenData && 1 == mg.isShareOpenData.redPacketOpen && (this.money.string = 0 == fishMaster.gameData.getRedPacketMoney() ? "0.00" : fishMaster.gameData.getRedPacketMoney().toString().replace(/[\.]/g, "."),
            this.redPacketFish.active = !1, 3 <= fishMaster.gameData.getRedPacketHookCount() && 8 > fishMaster.gameData.getRedPacketMoney() && (this.redPacketFish.active = !0),
            10 > fishMaster.gameData.getRedPacketMoney() && 8 <= fishMaster.gameData.getRedPacketMoney() && 5 <= fishMaster.gameData.getRedPacketHookCount() && (this.redPacketFish.active = !0),
            14 > fishMaster.gameData.getRedPacketMoney() && 10 <= fishMaster.gameData.getRedPacketMoney() && 8 <= fishMaster.gameData.getRedPacketHookCount() && (this.redPacketFish.active = !0),
            14 <= fishMaster.gameData.getRedPacketMoney() && 10 <= fishMaster.gameData.getRedPacketHookCount() && (this.redPacketFish.active = !0),
            19.88 <= fishMaster.gameData.getRedPacketMoney() && (this.redPacketFish.active = !1),
            this.redPacketFish.x = 464);
    },
    tixianView: function() {
        mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1), 0 == fishMaster.gameData.getRedPacketMoney() ? (this.money.string = "0.00",
                this.tixianMoney.string = "0.00") : (this.money.string = fishMaster.gameData.getRedPacketMoney().toString().replace(/[\.]/g, "."),
                this.tixianMoney.string = fishMaster.gameData.getRedPacketMoney().toString().replace(/[\.]/g, ".")),
            this.showTixianView.active = !0;
    },
    closeTixianView: function() {
        mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1), this.shareFailNode = this.showTixianView.getChildByName("failTips"),
            this.shareFailNode.stopAllActions(), this.shareFailNode.active = !1, this.showTixianView.active = !1;
    },
    tixianBtn: function() {
        mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1), this.shareFailNode = this.showTixianView.getChildByName("failTips"),
            this.shareFailNode.active = !0, this.shareFailNode.stopAllActions();
        var t = this;
        this.shareFailNode.runAction(cc.sequence(cc.fadeIn(1), cc.fadeOut(3), cc.callFunc(function() {
            t.shareFailNode.active = !1;
        })));
    },
    closeWin: function() {
        fishMaster.isHaveRedPacketFish = !1, fishMaster.gameData.resetRedPacketHookCount();
    }
})