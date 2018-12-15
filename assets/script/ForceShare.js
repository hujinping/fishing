var d = require("crypto");
                cc.Class({
                    ctor: function() {
                        this.SHARE_MAX_NUM = 3, this.openGids = [], this.sharetime = 0, this.readLocal(), 
                        mg.EventDispatcher.listen(fishMaster.EVENT_GAME.SHARE_RESULT, this.shareResult, this);
                    },
                    onDestroy: function() {
                        mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.SHARE_RESULT);
                    },
                    isCanShare: function() {
                        return 1 == mg.isShareOpenData.isShareOpen && this.sharetime < this.SHARE_MAX_NUM;
                    },
                    saveLocal: function() {
                        cc.sys.localStorage.setItem("usershare_time", this.sharetime), cc.sys.localStorage.setItem("usershare_keys", this.openGids.join(",")), 
                        cc.sys.localStorage.setItem("usershare_date", new Date().getTime());
                    },
                    readLocal: function() {
                        this.sharetime = cc.sys.localStorage.getItem("usershare_time") || 0;
                        var a = cc.sys.localStorage.getItem("usershare_keys") || null, e = cc.sys.localStorage.getItem("usershare_date") || 0;
                        this.openGids = null == a ? [] : a.split(","), mg.util.isNextDate(new Date(), new Date(e)) && (this.openGids = []);
                    },
                    clearData: function() {
                        this.sharetime = 0, this.openGids = [], this.saveLocal();
                    },
                    shareResult: function(a) {
                        var e = this, t = a.result;
                        mg.LOGD("gangning", "shareResult" + JSON.stringify(a)), t.shareTickets && t.shareTickets[0] ? wx.getShareInfo({
                            shareTicket: t.shareTickets[0],
                            success: function(t) {
                                mg.LOGD("gangning", "分享成功回调" + JSON.stringify(a)), e.getShareTicketInformation(t, a);
                            },
                            fail: function() {},
                            complete: function() {}
                        }) : mg.util.wechatShowModal("获取失败，请分享到群", !1, "确认");
                    },
                    getShareTicketInformation: function(o, e) {
                        if (o) {
                            var t = o, d = t.iv, r = t.encryptedData, n = this.decrypt(mg.UserInfo.wxgame_session_key, d, r);
                            if (mg.LOGD("gangning", "encryptedData" + r), n && 0 != n) try {
                                var a = (n = JSON.parse(n)).openGId;
                                a && 0 > this.openGids.indexOf(a) ? (this.openGids.push(a), this.saveLocal(), mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.GROUP_SHARE_SUCCESS, e), 
                                fishMaster.gameData.updataDailyTaskData(3, 1, 0)) : mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.GROUP_SHARE_FAIL, e);
                            } catch (t) {
                                mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.GROUP_SHARE_SUCCESS, e), fishMaster.gameData.updataDailyTaskData(3, 1, 0);
                            } else mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.GROUP_SHARE_SUCCESS, e), 
                            fishMaster.gameData.updataDailyTaskData(3, 1, 0);
                        }
                    },
                    decrypt: function(r, e, t) {
                        var n = 0;
                        try {
                            t = new o(t, "base64"), e = new o(e, "base64"), r = new o(r, "base64");
                            var a = d.createDecipheriv("aes-128-cbc", r, e);
                            a.setAutoPadding(!0), n = a.update(t, "binary", "utf8"), n += a.final("utf8");
                        } catch (t) {
                            mg.LOGD("gangning", " catch error: " + t);
                        }
                        return n;
                    }
                })