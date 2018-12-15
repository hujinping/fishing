mg.systemInfo = {
    brand: "",
    model: "",
    pixelRatio: 0,
    screenWidth: 0,
    screenHeight: 0,
    windowWidth: 0,
    windowHeight: 0,
    language: "",
    version: "",
    system: "",
    platform: "",
    fontSizeSetting: 0,
    SDKVersion: "",
    benchmarkLevel: 0,
    battery: 0,
    wifiSignal: 0
}, mg.AD = {
    init: function() {
        mg.systemInfo = wx.getSystemInfoSync();
    },
    bannerAd: null,
    rewardedVideoAd: null,
    bannerRealWidth: 0,
    bannerRealHeight: 0,
    isBannerHide: !1,
    createBannerAd: function(a, o, d, s, c) {
        0 > mg.util.compareVersion(mg.UserInfo.SDKVersion, "2.0.4") ? wx.showToast({
            title: "微信版本有点低哦~"
        }) : (this.bannerAd = wx.createBannerAd({
            adUnitId: a,
            style: {
                left: o,
                top: d,
                width: s,
                height: c
            }
        }), this.bannerAd.show().catch(function(t) {
            return console.log(t);
        }), this.bannerAd.onError(function(t) {
            console.log(t);
        }), this.bannerAd.onLoad(function() {
            console.log("banner 广告加载成功");
        }));
    },
    createBannerAdOnBottom: function(o) {

        console.log("log------------createBannerAdOnBottom--------o=:", o);
        if (0 > mg.util.compareVersion(mg.UserInfo.SDKVersion, "2.0.4")) wx.showToast({
            title: "微信版本有点低哦~"
        });
        else if (1 != this.isBannerHide) {
            var d = this,
                t = wx.getSystemInfoSync(),
                s = t.screenWidth,
                c = t.screenHeight,
                n = c / cc.winSize.height * (cc.winSize.height - 300);
            this.bannerAdDestroy(), this.bannerAd = wx.createBannerAd({
                adUnitId: o,
                style: {
                    left: 0,
                    top: 0,
                    width: s
                }
            }), this.bannerAd.onResize(function(t) {
                d.bannerAd.style.left = (s - t.width) / 2;
                var e = c - n;
                t.height < e && (n += e - t.height), d.bannerAd.style.top = n;
            }), this.bannerAd.show().catch(function(t) {
                return console.log(t);
            });
        }
    },
    bannerAdDestroy: function() {
        this.bannerAd && (this.bannerAd.destroy(), this.bannerAd = null);
    },
    bannerAdHide: function() {
        this.bannerAd && (this.isBannerHide = !0, this.bannerAd.hide());
    },
    bannerAdShow: function() {
        this.bannerAd && (this.isBannerHide = !1, this.bannerAd.show());
    },
    bannerAdOnResize: function() {
        var a = this;
        this.bannerAd.onResize(function(e) {
            a.bannerRealWidth = e.width, a.bannerRealHeight = e.height;
        });
    },
    bannerAdOffResize: function() {
        this.bannerAd.offResize(function() {});
    },
    createRewardedVideoAd: function(o, d, s) {
        var c = this;
        if (1 != this.isLoadVideo) {
            if (mg.mta.Bilog(fishMaster.Bi_EventID.playVideo), mg.LOGD("fengbing", " *-*-*-*  网络类型  *-*-*-*-*- " + mg.StateInfo.networkConnected),
                0 == mg.StateInfo.networkConnected) return wx.showToast({
                title: "网络异常"
            }), void mg.LOGD("fengbing", " ---------  网络没有连接  -----------");
            if (0 > mg.util.compareVersion(mg.UserInfo.SDKVersion, "2.0.4")) return wx.showToast({
                title: "微信版本有点低哦~"
            }), void("function" == typeof s && s());
            mg.StateInfo.isShareState = !0, this.isLoadVideo = !0, this.rewardedVideoAd = wx.createRewardedVideoAd({
                adUnitId: o
            });
            var f = this,
                r = function a(e) {
                    f.rewardedVideoAd.offClose(a), f._resumeMusic(), !e || e && e.isEnded ? "function" == typeof d && (d(),
                        fishMaster.gameData.updataDailyTaskData(2, 1, 0), fishMaster.gameData.setTotalVideoCount(),
                        fishMaster.gameData.setDailyVideoCount(), mg.mta.Bilog(fishMaster.Bi_EventID.playVideoSuccess)) : "function" == typeof s && s();
                };
            this.rewardedVideoAd.load().then(function() {
                return c._preMusicState = mg.AudioHelper.getMusicState(), mg.AudioHelper.closeMusic(),
                    c.rewardedVideoAd.onClose(r), f.bannerAdHide(), c.rewardedVideoAd.show();
            }).catch(function() {
                f.bannerAdShow(), mg.isShareOpenData.version == mg.version || 0 == mg.isShareOpenData.isShareOpen ? "function" == typeof d && (f._resumeMusic(),
                    fishMaster.gameData.updateCanWatchVideo(!0), d()) : "function" == typeof s && (f._resumeMusic(),
                    fishMaster.gameData.updateCanWatchVideo(!1), s("loadfail"));
            }), this.rewardedVideoAd.onLoad(function() {
                console.log("video 视频加载成功");
            }), this.rewardedVideoAd.onError(function(t) {
                console.log("gangning onError", t), mg.LOGD("fengbing", " ---------  rewarded video ad onerror  -----------"),
                    f._resumeMusic();
            });
        }
    },
    _resumeMusic: function() {
        var t = this._preMusicState;
        this.isLoadVideo = !1, this.bannerAdShow(), mg.StateInfo.isShareState = !1, mg.LOGD("fengbing", "  resume music :  " + t),
            1 == t && (mg.AudioHelper.openMusic(), mg.LOGD("fengbing", "  open music :  " + t),
                this.bannerAdShow());
    }
}