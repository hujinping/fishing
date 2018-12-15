var o = cc.Enum({
    DEFAULT: 1,
    FRIEND1: 2,
    FRIEND2: 3,
    GROUP1: 4,
    GROUP2: 5
});
cc.Class({
    extends: cc.Component,
    properties: {
        layer: cc.Node,
        rankList: {
            default: null,
            type: cc.Node
        },
        rankCanvas: cc.Node,
        group: cc.Node,
        friendNode: cc.Node,
        curShareTicket: cc.String,
        scrollView: cc.ScrollView,
        shareBtn: cc.Node,
        totalBtn: cc.Sprite,
        depthBtn: cc.Sprite,
        btnSp: [cc.SpriteFrame]
    },
    btnCloseSelf: function() {
        this.layer.active = !1, mg.Timer.cancelTimer(this, this.main);
    },
    onLoad: function() {
        this.layer.active = !1, mg.EventDispatcher.listen(fishMaster.EVENT_GAME.PROPAGATE_SHARE_SUCESS, this._shareResult, this);
    },
    showFriendRankList: function(o) {
        if (!mg.isInCreator) {
            mg.Timer.cancelTimer(this, this.main), this.layer.active = !0, this.totalBtn.spriteFrame = this.btnSp[1 == o ? 0 : 1],
                this.depthBtn.spriteFrame = this.btnSp[1 == o ? 1 : 0];
            var e = mg.OpenDataContextUtil.getOpenData();
            console.log("log-----------e=:", e);
            if (e) {
                mg.OpenDataContextUtil.showFriendRank(o);
                var t = e.canvas;
                t.width = 560, t.height = 2340, this.texture = new cc.Texture2D(), this.spriteFrame = new cc.SpriteFrame(this.texture);
                var d = this.texture,
                    r = this.spriteFrame,
                    n = this.rankCanvas.getComponent(cc.Sprite);
                this.main = function() {
                    mg.LOGD("gangning  ", "main   showFriendRankList"), d.initWithElement(t), d.handleLoadedTexture(),
                        n.spriteFrame = r, n.spriteFrame._refreshTexture(d);
                }, this.main(), mg.Timer.setTimer(this, this.main, .1, 10);
            }
        }
    },
    showGroupRankList: function(o, e) {
        if (!mg.isInCreator) {
            mg.Timer.cancelTimer(this, this.main), this.curShareTicket = o, this.layer.active = !0,
                this.totalBtn.spriteFrame = this.btnSp[1 == e ? 0 : 1], this.depthBtn.spriteFrame = this.btnSp[1 == e ? 1 : 0];
            var t = mg.OpenDataContextUtil.getOpenData();
            if (t) {
                mg.OpenDataContextUtil.showGroupRank(o, e);
                var d = t.canvas;
                d.width = 560, d.height = 2340, this.texture = new cc.Texture2D(), this.spriteFrame = new cc.SpriteFrame(this.texture);
                var r = this.texture,
                    n = this.spriteFrame,
                    a = this.rankCanvas.getComponent(cc.Sprite);
                this.main = function() {
                    mg.LOGD("gangning  ", "main   showGroupRankList"), r.initWithElement(d), r.handleLoadedTexture(),
                        a.spriteFrame = n, a.spriteFrame._refreshTexture(r);
                }, this.main(), mg.Timer.setTimer(this, this.main, .1, 10);
            }
        }
    },
    changeState: function(t) {
        switch (this.state = t, t) {
            case o.DEFAULT:
                break;

            case o.FRIEND1:
                this.group.active = !1, this.friendNode.active = !0, this.shareBtn.active = !0,
                    this.scrollView.scrollToTop(), this.showFriendRankList(1);
                break;

            case o.FRIEND2:
                console.log("log-------------o.FRIEND2");
                this.group.active = !1, this.friendNode.active = !0, this.shareBtn.active = !0,
                    this.scrollView.scrollToTop();
                this.showFriendRankList(2);
                break;

            case o.GROUP1:
                this.group.active = !0, this.friendNode.active = !1, this.shareBtn.active = !1,
                    this.scrollView.scrollToTop(), this.showGroupRankList(this.curShareTicket, 1);
                break;

            case o.GROUP2:
                this.group.active = !0, this.friendNode.active = !1, this.shareBtn.active = !1,
                    this.scrollView.scrollToTop(), this.showGroupRankList(this.curShareTicket, 2);
        }
    },
    showOnlyFriendRank: function() {
        this.changeState(o.FRIEND1);
    },
    showHookSize: function() {
        console.log("log-----------------showHookSize---------");
        this.group.active && this.changeState(o.GROUP1), this.friendNode.active && this.changeState(o.FRIEND1);
    },
    showDepthBtn: function() {
        console.log("log-----------------showDepthBtn---------");
        this.group.active && this.changeState(o.GROUP2);
        this.friendNode.active && this.changeState(o.FRIEND2);


        console.log("log-------------this.friendNode.active=:", this.friendNode.active);
    },
    onDestroy: function() {
        mg.Timer.cancelTimer(this, this.main), mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.PROPAGATE_SHARE_SUCESS, this._shareResult, this);
    },
    onShareClick: function() {
        mg.GameShare.wxAutoShare(fishMaster.SharePoints.RankViewBtnPoint), mg.mta.Bilog(fishMaster.Bi_EventID.groupShare);
    },
    _shareResult: function(a) {
        if (mg.LOGD("gangning", "智能分享成功" + JSON.stringify(a)), a && a.sharefrom === fishMaster.SharePoints.RankViewBtnPoint) {
            var e = a.result;
            e.shareTickets && e.shareTickets[0] ? (this.curShareTicket = e.shareTickets[0],
                this.changeState(o.GROUP1, e.shareTickets[0])) : mg.util.wechatShowModal("获取失败，请分享到群", !1, "确认");
        }
    }
})