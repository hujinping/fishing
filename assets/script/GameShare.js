mg.GameShare = {
                destroy: function() {
                    mg.EventDispatcher.ignoreScope(this);
                },
                wxAutoShare: function(a, o) {
                    if (1 != this._inshare) {
                        this._shareparam = o, this._sharepoint = a;
                        var t = mg.shareUtil.getShareInfo(), n = {
                            title: t.title,
                            imageUrl: t.imgurl,
                            sharePointId: a,
                            shareSchemeId: a,
                            imageName: t.imageName
                        };
                        this._inshare = !0, n && (this._inshare = !1, mg.ShareInterface.share(n.title, n.imageUrl, n.sharePointId, n.shareSchemeId, this._successCallBack, this._failCallBack, a, n.imageName));
                    }
                },
                _successCallBack: function(a) {
                    if (a) {
                        var o = {
                            result: a,
                            sharefrom: mg.GameShare._sharepoint,
                            param: mg.GameShare._shareparam
                        };
                        mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.PROPAGATE_SHARE_SUCESS, o);
                        var t = o.result;
                        t.shareTickets && t.shareTickets[0] && 0 == mg.isShareOpenData.isShareOpen && fishMaster.gameData.updataDailyTaskData(3, 1, 0);
                    }
                    wx.showToast({
                        title: "分享成功"
                    });
                },
                _failCallBack: function() {
                    mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.PROPAGATE_SHARE_FAIL), wx.showToast({
                        title: "分享失败"
                    });
                }
            }, mg.shareUtil = {
                initShareData: function() {
                    this.CDNPath = mg.SystemInfo.cdnPath;
                    var a = this.CDNPath + "share/gofish_shareImg.json";
                    cc.loader.load(a, function(a, e) {
                        a || (this.shareData = e);
                    }.bind(this));
                    var e = this.CDNPath + "share/gofish_shareDangerImg.json";
                    cc.loader.load(e, function(a, e) {
                        a || (this.shareDangerData = e);
                    }.bind(this));
                    var t = this.CDNPath + "jump/jump.json";
                    cc.loader.load(t, function(a, e) {
                        a || (this.jumpToOtherGameData = e);
                    }.bind(this));
                },
                getShareInfo: function() {
                    this.CDNPath = mg.SystemInfo.cdnPath;
                    var a = this.shareData, e = {
                        title: "只需5秒，忘掉所有烦恼，体验奇妙的海底世界！",
                        imgurl: "res/raw-assets/resources/ff_share.jpg",
                        imageName: "ff_share.jpg"
                    };
                    fishMaster.gameData.getDailyShareCount() >= mg.isShareOpenData.dailyDangerImg && (a = this.shareDangerData, 
                    e = {
                        title: "近日帝都大量美女沉迷钓鱼无法自拔，专家建议不要点开它！",
                        imgurl: "res/raw-assets/resources/ff_shareDanger.jpg",
                        imageName: "ff_share.jpg"
                    }), fishMaster.gameData.getTotalShareCount() >= mg.isShareOpenData.totalShareCount && fishMaster.gameData.getDailyShareCount() >= mg.isShareOpenData.shareDangerImg && (a = this.shareDangerData, 
                    e = {
                        title: "近日帝都大量美女沉迷钓鱼无法自拔，专家建议不要点开它！",
                        imgurl: "res/raw-assets/resources/ff_shareDanger.jpg",
                        imageName: "ff_share.jpg"
                    }), "init" != fishMaster.gameData.getLimitLocData() && (mg.isShareOpenData.isShareOpen = 0), 
                    0 == mg.isShareOpenData.isShareOpen && (a = this.shareData, e = {
                        title: "只需5秒，忘掉所有烦恼，体验奇妙的海底世界！",
                        imgurl: "res/raw-assets/resources/ff_share.jpg",
                        imageName: "ff_share.jpg"
                    });
                    var t = a && a.length, o = D(t * Math.random());
                    return a && (e = {
                        title: a[o].shareTitle,
                        imgurl: this.CDNPath + a[o].shareImage,
                        imageName: a[o].shareImage
                    }), e;
                },
                getCDNConfig: function(a) {
                    var e = mg.SystemInfo.cdnPath + "share/gofish_open.json";
                    cc.loader.load(e, function(e, t) {
                        e || (t.version === mg.version ? mg.isShareOpenData.onHideQuit = 0 : mg.isShareOpenData = t, 
                        "init" != fishMaster.gameData.getLimitLocData() && (mg.isShareOpenData.isShareOpen = 0, 
                        mg.isShareOpenData.redPacketOpen = 0), a && a());
                    });
                },
                getCDNLocation: function(a) {
                    mg.limitLocationData = [ "北京", "上海", "广州", "深圳", "杭州", "南京", "福州", "厦门", "郑州", "长沙", "成都", "武汉", "苏州" ];
                    var e = mg.SystemInfo.cdnPath + "share/gofish_location.json";
                    cc.loader.load(e, function(e, t) {
                        e || (mg.limitLocationData = t), a && a();
                    });
                },
                isWarnStr: function() {
                    var a = mg.limitLocationData, e = mg.UserInfo.location;
                    fishMaster.gameData.setLimitLocDatrequire("init");
                    for (var t = 0, o; t < a.length; t++) if (o = new RegExp(a[t], "g"), -1 != e.indexOf(a[t])) {
                        var r = e.replace(o, "敏感词不可用");
                        fishMaster.gameData.setLimitLocData(r), mg.isShareOpenData && (mg.isShareOpenData.isShareOpen = 0, 
                        mg.isShareOpenData.redPacketOpen = 0), console.log("含有敏感词", "" + r);
                    }
                    fishMaster.redPacket && fishMaster.redPacket.showRedPacket();
                },
                getJumpToOther: function() {
                    this.CDNPath = mg.SystemInfo.cdnPath;
                    var a = this.jumpToOtherGameData, e = {
                        appid: "wx2022eed6278af19c",
                        imgurl: "res/raw-assets/resources/fishingrich.png",
                        probability: 100
                    }, t = a && a.length, o = 100 * Math.random();
                    if (a) for (var r = 0; r < t; r++) if (a[r].probability >= o) {
                        e = {
                            appid: a[r].appId,
                            imgurl: this.CDNPath + a[r].imgUrl,
                            probability: a[r].probability
                        };
                        break;
                    }
                    return e;
                }
            }