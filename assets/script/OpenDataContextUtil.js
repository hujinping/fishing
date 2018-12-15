mg.OpenDataContextUtil = {
    methodIndex: 0,
    methodCallDic: {},
    isOnTimer: !1,
    initCheckTimer: function() {
        this.isOnTimer || (this.isOnTimer = !0, mg.Timer.setTimer(cc.director, function() {
            mg.OpenDataContextUtil.checkOpenDataContextStat();
        }, .1, cc.macro.REPEAT_FOREVER, 0));
    },
    checkOpenDataContextStat: function() {
        var a = wx.getOpenDataContext().canvas.getContext("2d");
        for (var e in this.methodCallDic) a[e] ? (a[e].status, this.methodCallDic[e].eventType && mg.EventDispatcher.trigger(this.methodCallDic[e].eventType, [e, a[e].data]),
            delete a[e], delete this.methodCallDic[e]) : 2e3 < new Date().valueOf() - this.methodCallDic[e].time && (delete a[e],
            delete this.methodCallDic[e]);
    },
    getUserInfo: function() {
        var e = "getUserInfo" + this.methodIndex;
        return wx.getOpenDataContext().postMessage({
            method: "getUserInfo",
            method_id: e
        }), this.methodCallDic[e] = {
            time: new Date().valueOf(),
            eventType: mg.EventType.GETUSERINFO_SUCCESS
        }, e;
    },
    getFriendRankData: function() {
        var e = "getFriendRankData" + this.methodIndex;
        return wx.getOpenDataContext().postMessage({
            method: "getFriendRankData",
            method_id: e
        }), this.methodCallDic[e] = {
            time: new Date().valueOf(),
            eventType: mg.EventType.GETRFRIENDRANK_SUCCESS
        }, e;
    },
    getGroupRankData: function(t) {
        var a = "getGroupRankData" + this.methodIndex;
        return wx.getOpenDataContext().postMessage({
            method: "getGroupRankData",
            method_id: a,
            shareTicket: t
        }), this.methodCallDic[a] = {
            time: new Date().valueOf(),
            eventType: mg.EventType.GETGROUPRANK_SUCCESS
        }, a;
    },
    getOpenData: function() {
        if (!(0 > mg.util.compareVersion(mg.UserInfo.SDKVersion, "1.9.92"))) {
            var e = wx.getOpenDataContext();
            return e || null;
        }
        wx.showToast({
            title: "微信版本有点低哦~"
        });
    },
    upRankData: function(a, o) {
        var r = mg.OpenDataContextUtil.getOpenData(!0);
        r && r.postMessage({
            method: "updateMaxScore",
            maxscore: a,
            maxscore2: o,
            userId: mg.UserInfo.userId
        });
    },
    showFriendRank: function(a) {
        var o = mg.OpenDataContextUtil.getOpenData();
        console.log("log--------------showFriendRank--------");
        o && o.postMessage({
            method: "showFriendRank",
            userId: mg.UserInfo.userId,
            index: a
        });
    },
    showGroupRank: function(a, o) {
        var r = mg.OpenDataContextUtil.getOpenData();
        r && r.postMessage({
            method: "showGroupRank",
            userId: mg.UserInfo.userId,
            shareTicket: a,
            index: o
        });
    },
    showBeyondRank: function(a) {
        var o = mg.OpenDataContextUtil.getOpenData();
        o && o.postMessage({
            method: "showBeyond",
            userId: mg.UserInfo.userId,
            score: a
        });
    },
    showBeyondRankList: function() {
        var t = mg.OpenDataContextUtil.getOpenData();
        t && t.postMessage({
            method: "showBeyondList",
            userId: mg.UserInfo.userId
        });
    },
    showUserInfo: function() {
        var t = mg.OpenDataContextUtil.getOpenData();
        t && t.postMessage({
            method: "showUserInfo",
            userId: mg.UserInfo.userId
        });
    },
    clearShareCanvas: function() {
        var t = mg.OpenDataContextUtil.getOpenData();
        t && t.postMessage({
            method: "showOrigin"
        });
    }
}