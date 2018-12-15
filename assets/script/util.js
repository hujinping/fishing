var D = Math.floor;
var S = Math.max;
mg.util = {
    getVectorRadians: function (d, e, t, i) {
        var r = Math.atan, f = i - e, n = t - d, a = a = c(f) / c(n), s = 0;
        return 0 < f && 0 > n ? s = 180 * r(a) / _ - 90 : 0 < f && 0 < n ? s = 90 - 180 * r(a) / _ : 0 > f && 0 > n ? s = 180 * -r(a) / _ - 90 : 0 > f && 0 < n && (s = 180 * r(a) / _ + 90),
            s;
    },
    range: function (o, e) {
        return function (t) {
            var d = [], a, r;
            for (a = 0; a < t; a++) r = D(Math.random() * (e - o + 1) + o), 0 > d.indexOf(r) ? d.push(r) : a--;
            console.log(d);
        };
    },
    shuffle: function (a) {
        for (var e = a.length, o, t; e; o = D(1e3 * Math.random() % 10 / 10 * e), t = a[--e],
            a[e] = a[o], a[o] = t);
        return a;
    },
    setItemToLocalStorage: function (a, e) {
        try {
            cc.sys.localStorage.setItem(a, e + "");
        } catch (t) {
            fishMaster.LOGE("fishMaster.Util", "setItemToLocalStorage fail");
        }
    },
    getItemFromLocalStorage: function (a, e) {
        if (!cc.sys.localStorage.getItem) return e;
        var t = cc.sys.localStorage.getItem(a);
        return t ? t + "" : e;
    },
    getSpriteFrame: function (a) {
        if (mg.isInCreator) return new cc.SpriteFrame(cc.url.raw(a));
        mg.LOGD("getSpriteFrame", "getSpriteFrame  name = " + mg.Mg.removePath(a)), null == this.spriteFrameArray && mggwx.LOGD("getSpriteFrame", "当前  this.spriteFrameArray = null ");
        var e = this.spriteFrameArray[mggwx.Mg.removePath(a)];
        return null == e ? (mg.LOGD("getSpriteFrame", "获取图片失败  = " + mg.Mg.removePath(a)),
            null) : e;
    },
    isLastLoginToday: function () {
        var a = new Date().toLocaleDateString(), e = "";
        return fishMaster.gameData.getLastLoginDate() && (e = fishMaster.gameData.getLastLoginDate()),
            a == e;
    },
    isNextDate: function (a, e) {
        return a.getYear() > e.getYear() || a.getMonth() > e.getMonth() || a.getDate() > e.getDate();
    },
    isSceneQrCode: function (t) {
        return -1 < [1047, 1048, 1049].indexOf(t);
    },
    compareVersion: function (o, e) {
        o = o.split("."), e = e.split(".");
        for (var t = S(o.length, e.length); o.length < t;) o.push("0");
        for (; e.length < t;) e.push("0");
        for (var d = 0; d < t; d++) {
            var r = parseInt(o[d]), n = parseInt(e[d]);
            if (r > n) return 1;
            if (r < n) return -1;
        }
        return 0;
    },
    wechatShowModal: function (a, o, d, s, r) {
        d || (d = ""), wx.showModal({
            content: a,
            showCancel: o,
            confirmText: d,
            success: function () {
                s && s();
            },
            fail: function () {
                r && r();
            },
            complete: function () { }
        });
    },
    vibrateShort: function () {
        wx.vibrateShort({
            success: function () { },
            fail: function () { },
            complete: function () { }
        });
    },
    vibrateLong: function () {
        wx.vibrateLong({
            success: function () { },
            fail: function () { },
            complete: function () { }
        });
    },
    navigateToMiniProgram: function (t) {
        mg.StateInfo.isShareState = !0, wx.navigateToMiniProgram({
            appId: t,
            envVersion: "release",
            success: function () {
                console.log("跳转", "success");
            },
            fail: function () {
                console.log("跳转", "fail"), mg.StateInfo.isShareState = !1;
            },
            complete: function () {
                console.log("跳转", "complete");
            }
        });
    }
}