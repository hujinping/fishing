mg.ShareInterface = {
                OnShareAppMessageInfo: null,
                setOnShareAppMessageInfo: function(a, o, n, d) {
                    this.OnShareAppMessageInfo = {
                        title: a,
                        imageUrl: o,
                        sharePointId: n,
                        shareSchemeId: d
                    };
                },
                getOnShareAppMessageInfo: function() {
                    return this.OnShareAppMessageInfo;
                },
                getRandomOnShareAppMessageInfo: function() {
                    var a = Object.keys(mg.PropagateInterface.ShareConfig);
                    if (a && 0 < a.length) {
                        var e = D(1e4 * Math.random()) % a.length, t = a[e], o = mg.PropagateInterface.ShareConfig[t];
                        if (o && 0 < o.length) return {
                            title: o[e = D(1e4 * Math.random()) % o.length].shareContent,
                            imageUrl: o[e].sharePicUrl,
                            sharePointId: o[e].sharePointId,
                            shareSchemeId: o[e].shareSchemeId
                        };
                    }
                    return null;
                },
                share: function(d, c, f, i, r, n, a, s) {
                    mg.IsWechatPlatform() && (mg.StateInfo.isShareState = !0, mg.mta.Bilog(fishMaster.Bi_EventID.allShare, {
                        param1: mg.UserInfo.userId,
                        param2: s
                    }), wx.shareAppMessage({
                        title: d,
                        imageUrl: c,
                        query: "inviteCode=" + mg.UserInfo.userId + "&sourceCode=" + f + "&inviteName=" + mg.UserInfo.userId + "&imageType=" + i + "&shareid=" + mg.UserInfo.userId + "&image=" + s,
                        success: function(t) {
                            r && (r(t), fishMaster.gameData.setTotalShareCount(), fishMaster.gameData.setDailyShareCount(), 
                            mg.mta.Bilog(fishMaster.Bi_EventID.allShareSuccess, {
                                param1: mg.UserInfo.userId,
                                param2: s
                            }));
                        },
                        fail: function(t) {
                            n && n(t);
                        },
                        complete: function() {}
                    }));
                }
            }, mg.onShareAppMessageInit = function() {
                mg.IsWechatPlatform() && wx.onShareAppMessage(function() {
                    mg.StateInfo.isShareState = !0;
                    var e = mg.shareUtil.getShareInfo(), t = {
                        title: e.title,
                        imageUrl: e.imgurl,
                        sharePointId: "right_up_sharePoint",
                        shareSchemeId: "right_up_sharePoint"
                    };
                    return {
                        title: t.title,
                        imageUrl: t.imageUrl,
                        query: "inviteCode=" + mg.UserInfo.userId + "&sourceCode=" + t.sharePointId + "&inviteName=" + mg.UserInfo.userId + "&imageType=" + t.shareSchemeId,
                        success: function() {
                            mg.mta.Bilog(fishMaster.Bi_EventID.rightTopShare);
                        },
                        fail: function() {},
                        complete: function() {}
                    };
                });
            }, mg.onShareAppMessageInit()