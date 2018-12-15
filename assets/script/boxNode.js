cc.Class({
    extends: cc.Component,
    properties: {
        boxNode: cc.Node,
        btnSprites: [cc.SpriteFrame]
    },
    onLoad: function() {
        fishMaster.boxView = this, mg.EventDispatcher.listen(fishMaster.EVENT_GAME.PROPAGATE_SHARE_SUCESS, this._shareResult, this),
            mg.EventDispatcher.listen(fishMaster.EVENT_GAME.GROUP_SHARE_SUCCESS, this._forceShareResult, this),
            mg.EventDispatcher.listen(fishMaster.EVENT_GAME.GROUP_SHARE_FAIL, this._forceShareFail, this);
    },
    onDestroy: function() {
        mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.PROPAGATE_SHARE_SUCESS, this._shareResult, this),
            mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.GROUP_SHARE_SUCCESS, this._forceShareResult, this),
            mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.GROUP_SHARE_FAIL, this._forceShareFail, this);
    },
    showBoxNode: function() {
        fishMaster.homeMain.showBanner(), this.boxNode.active = !0, this.boxNode.getChildByName("guangquan").runAction(cc.rotateBy(1, 50, 50).repeatForever()),
            this.boxNode.getChildByName("openBoxBtn").getComponent(cc.Sprite).spriteFrame = 1 == mg.isShareOpenData.boxShare && "true" == fishMaster.gameData.getCanWatchVideo() ? this.btnSprites[0] : this.btnSprites[1],
            this.boxNode.getChildByName("openBoxBtn").getChildByName("gold").getComponent(cc.Label).string = "$" + (5 * fishMaster.homeMain.collectGoldNum).toString(),
            mg.mta.Bilog(fishMaster.Bi_EventID.openBox);
    },
    openWindows: function() {
        this.boxNode.active = !0;
    },
    closeWindows: function() {
        this.boxNode.active = !1, fishMaster.homeMain.hideBanner();
    },
    giveBtnFun: function() {
        if (1 == mg.isShareOpenData.boxShare && "true" == fishMaster.gameData.getCanWatchVideo()) {
            var t = this;
            mg.AD.createRewardedVideoAd(fishMaster.AD_ID.BoxId, function() {
                t.giveFun();
            }, function() {
                wx.showToast({
                    title: "领取失败"
                });
            });
        } else mg.GameShare.wxAutoShare(fishMaster.SharePoints.GameViewBoxPoint), mg.mta.Bilog(fishMaster.Bi_EventID.boxShare);
    },
    giveFun: function() {
        fishMaster.achieveView.showAchieveNode(), this.closeWindows();
    },
    _forceShareFail: function(t) {
        t && t.sharefrom == fishMaster.SharePoints.GameViewBoxPoint && fishMaster.homeMain.failTips();
    },
    _shareResult: function(t) {
        t && t.sharefrom == fishMaster.SharePoints.GameViewBoxPoint && (1 == mg.isShareOpenData.isShareOpen ? mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.SHARE_RESULT, t) : this._successResult(t));
    },
    _forceShareResult: function(t) {
        if (t) switch (t.sharefrom) {
            case fishMaster.SharePoints.GameViewBoxPoint:
                this.giveFun(), mg.mta.Bilog(fishMaster.Bi_EventID.boxShareSuccess);
        }
    },
    _successResult: function(a) {
        var e = a.sharefrom,
            t = a.result;
        t.shareTickets && t.shareTickets[0] ? e === fishMaster.SharePoints.GameViewBoxPoint ? (this.giveFun(),
            mg.mta.Bilog(fishMaster.Bi_EventID.boxShareSuccess)) : void 0 : mg.util.wechatShowModal("获取失败，请分享到群", !1, "确认");
    }
})