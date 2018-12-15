mg.loginSDK = {
    SESSION_KEY: "MGG_SESSION_STORAGE",
    login: function() {
        mg.IsWechatPlatform() && (mg.loginSDK.getSystemInfo(), mg.loginSDK.wechatLogin(),
            "init" == fishMaster.gameData.getLocation() ? mg.loginSDK.getLocation() : (mg.UserInfo.location = fishMaster.gameData.getLocation(),
                mg.shareUtil.getCDNLocation(function() {
                    mg.shareUtil.isWarnStr();
                })));
    },
    wechatLogin: function() {
        mg.IsWechatPlatform() && (mg.mta.Bilog(fishMaster.Bi_EventID.wxLoginStart), wx.login({
            success: function(a) {
                if (a.code) {
                    var e = a.code;
                    mg.loginSDK.loginWithCode(e), mg.mta.Bilog(fishMaster.Bi_EventID.wxLoginSuccess);
                    mg.loginSDK.getAdsData();
                    mg.loginSDK.getSwitch();
                }
            },
            fail: function() {},
            complete: function() {}
        }));
    },
    loginWithCode: function(code) {
        console.log("log---------------code=:", code);
        mg.IsWechatPlatform() && (wx.showShareMenu({
            withShareTicket: !0
        }), mg.mta.Bilog(fishMaster.Bi_EventID.gameServerStart), wx.request({
            url: "https://api.yz061.com/auth",
            data: {
                flg: "xsdby",
                code: code,
                //channel: query.channel,
            },
            method: 'POST',
            success: function(t) {
                mg.UserInfo.wxgame_session_key = t.data.session_key, mg.UserInfo.userId = t.data.openid,
                    wx.setStorage({
                        key: mg.loginSDK.SESSION_KEY,
                        data: mg.UserInfo.wxgame_session_key
                    }), mg.mta.Bilog(fishMaster.Bi_EventID.gameServerSuccess), mg.LOGE("", "+++++++++++++++++loginWithCode+++++++++++++++++" + JSON.stringify(t));
            },
            fail: function() {},
            complete: function() {}
        }));
    },
    getLocation: function() {
        // mg.IsWechatPlatform() && (console.log("gangning", "getLocation" + fishMaster.gameData.getLocation()),
        //     wx.request({
        //         url: "https://api.xyx.mggworks.com/gaodeaddr/",
        //         header: {
        //             "content-type": "application/x-www-form-urlencoded"
        //         },
        //         success: function(t) {
        //             mg.UserInfo.location = JSON.stringify(t.data.city), fishMaster.gameData.setLocation(mg.UserInfo.location),
        //                 mg.shareUtil.getCDNLocation(function() {
        //                     mg.shareUtil.isWarnStr();
        //                 });
        //         },
        //         fail: function() {},
        //         complete: function() {}
        //     }));
    },

    getAdsData() {
        if (window.wx) {
            wx.request({
                url: "https://api.yz061.com/game/xsdby",
                data: {
                    flg: "xsdby"
                },
                method: 'GET',
                success: (resp) => {
                    mg.gameAds = resp.data.result;
                    console.log("log-------------mg.gameAds=:", mg.gameAds);
                },
                fail: function(res) {

                }
            })
        }
    },


    getSwitch() {
        if (window.wx) {
            wx.request({
                url: "https://api.yz061.com/additional",
                data: {
                    flg: "xsdby",
                },

                method: 'GET',
                success: (resp) => {
                    console.log("log-----------getSwitch---resp=:", resp);
                    if (resp.data.result.config["1.0.4"] == "0") {
                        mg.switch = false;
                    } else {
                        mg.switch = true;
                    }
                    if (mg.btnShare && mg.redPackageNode && mg.btnTask) {
                        mg.btnTask.active = mg.switch;
                        mg.btnShare.active = mg.switch;
                        mg.redPackageNode.active = mg.switch;
                    }
                },
                fail: function(res) {
                    GameCtr.getSwitch();
                }
            })
        }
    },

    uploadLocation: function() {
        // wx.request({
        //     url: "https://api.xyx.mggworks.com/log/?info=" + mg.UserInfo.location,
        //     header: {
        //         "content-type": "application/x-www-form-urlencoded"
        //     },
        //     success: function() {},
        //     fail: function() {},
        //     complete: function() {}
        // });
    },
    getSystemInfo: function() {
        mg.IsWechatPlatform() && wx.getSystemInfo({
            success: function(a) {
                var e = 0 <= a.model.indexOf("iPhone"),
                    t = a.windowHeight,
                    o = 0;
                o = e ? 812 == t ? 2 : 736 == t ? 4 : 1 : 3, mg.UserInfo.systemType = o, mg.UserInfo.wechatType = a.version,
                    mg.UserInfo.model = a.model, mg.UserInfo.system = a.system, mg.UserInfo.SDKVersion = a.SDKVersion;
            },
            fail: function() {},
            complete: function() {}
        });
    }
}, mg.WechatInterfaceInit = function() {
    mg.IsWechatPlatform() && wx.onShow(function(a) {
        mg.LOGE("", "+++++++++++++++++onShow+++++++++++++++++" + JSON.stringify(a)), mg.StateInfo.isShareState = !1;
        var e = "",
            t = a.scene,
            o = a.query;
        if (mg.showScene = t, mg.showQuery = o, mg.UserInfo.scene_id = t, mg.UserInfo.scene_param = o.from || "",
            mg.UserInfo.invite_id = o.shareid || 0, mg.StateInfo.isOnForeground = !0, mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.GAME_SHOW, a),
            o && o.shareid && (mg.ShareInfo.queryId = o.shareid), o && o.gdt_vid && o.weixinadinfo) {
            var r = "gdt." + o.weixinadinfo;
            mg.UserInfo.scene_param = r;
        } else o && o.sourceCode ? (mg.mta.Bilog(fishMaster.Bi_EventID.clickImgComeIn, {
            param1: o.image
        }), console.log("gangning", "param1" + o)) : mg.util.isSceneQrCode(t) && (o.hasOwnProperty("scene") ? e = o.scene : a.hasOwnProperty("path") && (e = a.path),
            e.replace(".html", ""), e = decodeURIComponent(e), mg.UserInfo.scene_param = e);
        mg.loginSDK.login();
    });
}, wx.onHide(function() {
    mg.UserInfo.scene_id = 0, mg.StateInfo.isOnForeground = !1, new Date().getTime(),
        mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.GAME_HIDE), mg.StateInfo.isShareState || 1 != mg.isShareOpenData.onHideQuit || wx.exitMiniProgram({
            success: function() {},
            fail: function() {},
            complete: function() {}
        });
}), mg.WechatInterfaceInit();