(function() {
    window.mg = {}, window.fishMaster = {}, mg.isInCreator = "wechatgame" !== cc.sys.browserType,
        mg.StateInfo = {
            networkConnected: !0,
            networkType: "none",
            debugMode: !0,
            isOnForeground: !0,
            isShareState: !1
        }, mg.ShareInfo = {
            queryId: -1
        }, mg.SystemInfo = {
            cdnPath: "https://qcloud.cdn.xyx.mggworks.com/gofish/"
        }, mg.UserInfo = {
            userId: 0,
            userName: "mgWechatGame",
            systemType: 0,
            wechatType: "6.6.1",
            model: "未知设备",
            system: "iOS 10.0.1",
            loc: "",
            authorCode: "",
            userPic: "",
            scene_param: "",
            invite_id: 0,
            wxgame_session_key: "",
            scene_id: "",
            SDKVersion: "",
            location: ""
        }, mg.switch = null, mg.version = "1.0.13", mg.isShareOpenData = {
            version: mg.version,
            isShareOpen: 0,
            redPacketOpen: 1,
            jumpToOthersOpen: 0,
            onHideQuit: 1,
            collectDoubleShare: 1,
            collectThreeShare: 1,
            offlineCollectDoubleShare: 1,
            boxShare: 1,
            upgradeShare: 1,
            redPacketSaveShare: 1,
            dailyVideoToShare: 5,
            totalVideoCount: 20,
            videoToShare: 2,
            dailyDangerImg: 5,
            totalShareCount: 20,
            shareDangerImg: 2,
            bannerFresh: 6
        }, mg.IsWechatPlatform = function() {
            try {
                return wx, wx.showShareMenu(), !0;
            } catch (a) {
                return !1;
            }
        }, mg.isInCreator && (wx = {
            vibrateLong: function() {},
            vibrateShort: function() {},
            showShareMenu: function() {},
            showToast: function() {},
            getUserInfo: function() {},
            onError: function() {},
            onShow: function() {},
            getNetworkType: function() {},
            getOpenDataContext: function() {},
            createInnerAudioContext: function() {},
            onShareAppMessage: function() {},
            onHide: function() {},
            createGameClubButton: function() {},
            getSystemInfo: function() {},
            shareAppMessage: function() {},
            getStorage: function() {},
            getSystemInfoSync: function() {},
            request: function() {},
            onNetworkStatusChange: function() {},
            getSetting: function() {}
        }), mg._log = {
            debug: !1,
            info: function(a, b) {
                this.debug && cc.info(a, b);
            },
            log: function(a, b) {
                this.debug && cc.log(a, b);
            },
            error: function(a, b) {
                this.debug && cc.error(a, b);
            },
            warn: function(a, b) {
                this.debug && cc.warn(a, b);
            }
        }, mg.LOGD = function(a, b) {
            mg._log.log(a, b);
        }, mg.LOGE = function(a, b) {
            mg._log.error(a, b);
        }, Array.prototype.in_array = function(a) {
            return new RegExp("," + a + ",").test("," + this.join(this.S) + ",");
        };
})();