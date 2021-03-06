var t = require("ForceShare");
cc.Class({
    extends: cc.Component,
    properties: {
        goldPic: cc.Node,
        gameMoney: cc.Label,
        hookSize: cc.Node,
        depth: cc.Node,
        inCome: cc.Node,
        homeNode: cc.Node,
        collectNode: cc.Node,
        offlineNode: cc.Node,
        rankNode: cc.Node,
        dailyTasksNode: cc.Node,
        soundSprites: {
            default: [],
            type: [cc.SpriteFrame]
        },
        _isSoundOpen: !0,
        soundBtn: cc.Sprite,
        collectBtnSprites: {
            default: [],
            type: [cc.SpriteFrame]
        },
        playGoldAni: cc.Node,
        goldPrefab: cc.Prefab,
        playMoneyAni: cc.Node,
        moneyPrefab: cc.Prefab,
        likeAd: cc.Prefab,
        hotAd: cc.Prefab,
        deadAd: cc.Prefab,
        jumpToOtherGameBtn: cc.Node,
        likeAdNodeArr: [],
        deadAdNodeArr: [],
        hotAd0NodeArr: [],
        hotAd1NodeArr: [],

        likeAdDataArr: [],
        deadAdDataArr: [],
        hotAd0DataArr: [],
        hotAd1DataArr: [],

        deadAdPosArr: [],
        likeAdLocation: null,
        deadAdLocation: null,
        hotAd0Location: null,
        hotAd1Location: null,
        carouselHotAd0Index: 0,
        carouselHotAd1Index: 1,
    },
    initGameStartData: function() {
        fishMaster.homeMain = this, fishMaster.collectNumber = 0, fishMaster.disNum = 0,
            fishMaster.fishDisNum = 0, fishMaster.redPacketFishDisNum = 0, this.collectGoldNum = 0,
            this.canClick = !0, mg.shareinfo = new t(), mg.shareinfo.saveLocal(), mg.shareUtil.initShareData(),
            mg.shareUtil.getCDNConfig(function() {
                fishMaster.redPacket.showRedPacket();
            }), this.upCountToShare = [0, 6, 6, 6], fishMaster.addRedPacketMoneyCount = 0,
            fishMaster.openFishArr = [], fishMaster.buff = 1;
    },
    onLoad: function() {
        mg.homeMain = this;
        this.deadAdPosArr.push({ x: -305, y: 543 });
        this.deadAdPosArr.push({ x: 0, y: 543 });
        this.deadAdPosArr.push({ x: 305, y: 543 });
        this.deadAdPosArr.push({ x: -305, y: 138 });
        this.deadAdPosArr.push({ x: 0, y: 138 });
        this.deadAdPosArr.push({ x: 305, y: 138 });

        this.initGameStartData(), mg.AudioHelper.init(), this._updateSoundState(), this.gameOnShow(),
            this.showHomeViewAction();
        mg.mta.Bilog(fishMaster.Bi_EventID.comeInGame);
        this.homeNode.on(cc.Node.EventType.TOUCH_START, this.startGame, this),
            mg.EventDispatcher.listen(fishMaster.EVENT_GAME.CHANGE_GAME_STATE, this.changeGameState, this),
            mg.EventDispatcher.listen(fishMaster.EVENT_GAME.SHOW_BOX, this.showBox, this), mg.EventDispatcher.listen(fishMaster.EVENT_GAME.GAME_HIDE, this.gameOnHide, this),
            mg.EventDispatcher.listen(fishMaster.EVENT_GAME.GAME_SHOW, this.gameOnShow, this),
            mg.EventDispatcher.listen(fishMaster.EVENT_GAME.PROPAGATE_SHARE_SUCESS, this._shareResult, this),
            mg.EventDispatcher.listen(fishMaster.EVENT_GAME.GROUP_SHARE_SUCCESS, this._forceShareResult, this),
            mg.EventDispatcher.listen(fishMaster.EVENT_GAME.GROUP_SHARE_FAIL, this._forceShareFail, this),
            this.hookSizeText = this.hookSize.getChildByName("text"), this.hookSizeLabel = this.hookSize.getChildByName("size").getComponent(cc.Label),
            this.hookSizeMoney = this.hookSize.getChildByName("gold").getComponent(cc.Label),
            this.hookSizeFreeSp = this.hookSize.getChildByName("freeVideo"), this.depthText = this.depth.getChildByName("text"),
            this.depthLabel = this.depth.getChildByName("size").getComponent(cc.Label), this.depthMoney = this.depth.getChildByName("gold").getComponent(cc.Label),
            this.depthFreeSp = this.depth.getChildByName("freeVideo"), this.inComeText = this.inCome.getChildByName("text"),
            this.inComeLabel = this.inCome.getChildByName("size").getComponent(cc.Label), this.inComeMoney = this.inCome.getChildByName("gold").getComponent(cc.Label),
            this.inComeFreeSp = this.inCome.getChildByName("freeVideo"), this.hookSizeBtn = this.hookSize.getComponent(cc.Button),
            this.depthBtn = this.depth.getComponent(cc.Button), this.inComeBtn = this.inCome.getComponent(cc.Button),
            this.shareFailNode = this.node.getChildByName("shareFail");

        mg.btnShare = this.node.getChildByName("homeNode").getChildByName("commonNode").getChildByName("shareBtn");
        mg.btnTask = this.node.getChildByName("homeNode").getChildByName("commonNode").getChildByName("dailyTasksBtn");
        mg.redPackageNode = this.node.getChildByName("homeNode").getChildByName("hongbaoNode");
        mg.likeAdsNode = this.node.getChildByName("homeNode").getChildByName("likeAdsNode");
        mg.hotAd0Node = this.node.getChildByName("homeNode").getChildByName("hotAd0");
        mg.hotAd1Node = this.node.getChildByName("homeNode").getChildByName("hotAd1");
        mg.deadAdsNode = this.node.getChildByName("collectNode").getChildByName("adNode");

        mg.btnShare.active = false;
        mg.btnTask.active = false;
        mg.redPackageNode.active = false;
        mg.likeAdsNode.active = false;
        mg.hotAd0Node.active = false;
        mg.hotAd1Node.active = false;
        mg.deadAdsNode.active = false;

        if (mg.switch != null) {
            mg.btnShare.active = mg.switch;
            mg.btnTask.active = mg.switch;
            mg.redPackageNode.active = mg.switch;
            mg.likeAdsNode.active = mg.switch;
            mg.hotAd0Node.active = mg.switch;
            mg.hotAd1Node.active = mg.switch;
            mg.deadAdsNode.active = mg.switch;
        }

    },
    start: function() {
        this.showGuide(1), fishMaster.fishManage.createFish(), mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.CHANGE_GAME_STATE, fishMaster.GameDefine.GAME_STATE.DEFAULT);
        if (mg.gameAds && mg.notShowAd) {
            this.showLikeAds();
            this.showDeadAD();
            this.showHotAd0();
            this.showHotAd1();
        }
    },
    onDestroy: function() {
        this.destroyBanner(), this.homeNode.off(cc.Node.EventType.TOUCH_START, this.startGame, this),
            mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.CHANGE_GAME_STATE, this.changeGameState, this),
            mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.SHOW_BOX, this.showBox, this), mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.GAME_HIDE, this.gameOnHide, this),
            mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.GAME_SHOW, this.gameOnShow, this),
            mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.PROPAGATE_SHARE_SUCESS, this._shareResult, this),
            mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.GROUP_SHARE_SUCCESS, this._forceShareResult, this),
            mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.GROUP_SHARE_FAIL, this._forceShareFail, this);
    },
    showHomeViewAction: function() {
        this.dailyTasksNode.getComponent("dailyTaskNode").onLoad(), fishMaster.gameData.updataDailyTaskData(-1, 0, 0),
            mg.AudioHelper.playLocalMusic(fishMaster.GameDefine.Sound.HOMEBGM, !0, .75);
        var t = this.homeNode.getChildByName("yunNode");
        t.getChildByName("yun1").runAction(cc.sequence(cc.moveBy(10, -400, 0), cc.moveBy(10, 400, 0)).repeatForever()),
            t.getChildByName("yun2").runAction(cc.sequence(cc.moveBy(20, 420, 0), cc.moveBy(20, -420, 0)).repeatForever()),
            t.getChildByName("yun3").runAction(cc.sequence(cc.moveBy(13, 200, 0), cc.moveBy(13, -200, 0)).repeatForever()),
            this.homeNode.getChildByName("startGame").runAction(cc.sequence(cc.scaleTo(1, 1.2, 1.2), cc.scaleTo(1, 1, 1)).repeatForever());
    },
    showGuide: function(t) {
        fishMaster.redPacket.freshData(), fishMaster.gameData.getGuideIndex(t) || fishMaster.guide.showGuide(t, function() {});
    },
    startGame: function() {
        if (this.canClick) {
            this.initBannerAdNode(),
                this.homeNode.active = !1, this.collectNode.active = !1,
                this.offlineNode.active = !1, fishMaster.addRedPacketMoneyCount = 0, fishMaster.openFishArr = [],
                mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.CHANGE_GAME_STATE, fishMaster.GameDefine.GAME_STATE.START),
                mg.AudioHelper.playLocalMusic(fishMaster.GameDefine.Sound.GAMEBGM, !0, .75);
            for (var t = 1; 4 > t; t++) 0 == fishMaster.gameData.getUpGradeCount(t) % this.upCountToShare[t] && (3 <= fishMaster.gameData.getStartCount(t) ? (fishMaster.gameData.setUpGradeCount(t),
                fishMaster.gameData.reStartCount(t)) : fishMaster.gameData.setStartCount(t));
            this.gameMoney.string = "$" + fishMaster.gameData.getGameMoney().toString(), mg.Timer.cancelTimer(this, this.runChangeUserScore),
                this.playGoldAni.removeAllChildren(), mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.GAME_SCORE_CHANGE),
                mg.mta.Bilog(fishMaster.Bi_EventID.getfishNum, {
                    param1: fishMaster.gameData.getFallingDepth(),
                    param2: fishMaster.gameData.getHookSize()
                }), mg.Timer.cancelTimer(this, this.jumpToOtherGameRe);
        }
    },
    runChangeUserScore: function() {
        var a = parseInt(this.gameMoney.string.replace(/[\$|\:]/g, "")),
            e = fishMaster.gameData.getGameMoney(),
            t = e - a;
        1 < c(t) ? (a += .5 * t, this.gameMoney.string = "$" + D(a).toString(), 0 < t && this.showGetGoldAction()) : (this.playGoldAni.removeAllChildren(),
            fishMaster.gameData.addGameMoney(0), this.gameMoney.string = "$" + e.toString(),
            mg.Timer.cancelTimer(this, this.runChangeUserScore));
    },
    initData: function() {
        this.freshShareVideoData(), fishMaster.open_rank.hideNode(), fishMaster.disNum = 0,
            fishMaster.fishDisNum = 0, fishMaster.redPacketFishDisNum = 0, this.collectGoldNum = 0,
            fishMaster.redPacket.showRedPacket(), mg.Timer.cancelTimer(this, this.jumpToOtherGameRe),
            mg.Timer.setTimer(this, this.jumpToOtherGameRe, 5), 0 < fishMaster.addRedPacketMoneyCount && this.showGetMoneyAction(fishMaster.addRedPacketMoneyCount),
            this.gameMoney.string = "$" + fishMaster.gameData.getPreGameMoney(), mg.Timer.setTimer(this, this.runChangeUserScore, .1),
            fishMaster.gameData.getPreGameMoney() != fishMaster.gameData.getGameMoney() && mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.GOLD, !1),
            this.hookSizeLabel.string = fishMaster.gameData.getHookSize() + "条", this.hookSizeMoney.string = "$" + fishMaster.gameData.getHookSizeMoney(),
            this.depthLabel.string = fishMaster.gameData.getFallingDepth() + "米", this.depthMoney.string = "$" + fishMaster.gameData.getFallingDepthMoney(),
            this.inComeLabel.string = "$" + fishMaster.gameData.getOfflineIncome() + "/分", this.inComeMoney.string = "$" + fishMaster.gameData.getOfflineIncomeMoney();
        var a = 1 == mg.isShareOpenData.upgradeShare && "true" == fishMaster.gameData.getCanWatchVideo();
        this.hookSizeFreeSp.active = 0 == fishMaster.gameData.getUpGradeCount(1) % this.upCountToShare[1],
            this.hookSizeFreeSp.getComponent(cc.Sprite).spriteFrame = a ? this.collectBtnSprites[5] : this.collectBtnSprites[4],
            this.hookSizeMoney.node.active = 0 != fishMaster.gameData.getUpGradeCount(1) % this.upCountToShare[1],
            this.depthFreeSp.active = 0 == fishMaster.gameData.getUpGradeCount(2) % this.upCountToShare[2],
            this.depthFreeSp.getComponent(cc.Sprite).spriteFrame = a ? this.collectBtnSprites[5] : this.collectBtnSprites[4],
            this.depthMoney.node.active = 0 != fishMaster.gameData.getUpGradeCount(2) % this.upCountToShare[2],
            this.inComeFreeSp.active = 0 == fishMaster.gameData.getUpGradeCount(3) % this.upCountToShare[3],
            this.inComeFreeSp.getComponent(cc.Sprite).spriteFrame = a ? this.collectBtnSprites[5] : this.collectBtnSprites[4],
            this.inComeMoney.node.active = 0 != fishMaster.gameData.getUpGradeCount(3) % this.upCountToShare[3];
        var e = fishMaster.gameData.getGameMoney() >= fishMaster.gameData.getHookSizeMoney() || 0 == fishMaster.gameData.getUpGradeCount(1) % this.upCountToShare[1],
            t = fishMaster.gameData.getGameMoney() >= fishMaster.gameData.getFallingDepthMoney() || 0 == fishMaster.gameData.getUpGradeCount(2) % this.upCountToShare[2],
            o = fishMaster.gameData.getGameMoney() >= fishMaster.gameData.getOfflineIncomeMoney() || 0 == fishMaster.gameData.getUpGradeCount(3) % this.upCountToShare[3];
        this.hookSizeBtn.interactable = e, this.depthBtn.interactable = t, this.inComeBtn.interactable = o,
            this.hookSizeText.color = e ? cc.color(255, 255, 255, 255) : cc.color(0, 0, 0, 255),
            this.depthText.color = t ? cc.color(255, 255, 255, 255) : cc.color(0, 0, 0, 255),
            this.inComeText.color = o ? cc.color(255, 255, 255, 255) : cc.color(0, 0, 0, 255),
            this.hookSizeLabel.node.color = e ? cc.color(122, 72, 0, 255) : cc.color(0, 0, 0, 255),
            this.depthLabel.node.color = t ? cc.color(122, 72, 0, 255) : cc.color(0, 0, 0, 255),
            this.inComeLabel.node.color = o ? cc.color(122, 72, 0, 255) : cc.color(0, 0, 0, 255),
            this.hookSizeMoney.node.color = e ? cc.color(255, 255, 255, 255) : cc.color(0, 0, 0, 255),
            this.depthMoney.node.color = t ? cc.color(255, 255, 255, 255) : cc.color(0, 0, 0, 255),
            this.inComeMoney.node.color = o ? cc.color(255, 255, 255, 255) : cc.color(0, 0, 0, 255),
            mg.OpenDataContextUtil.upRankData(fishMaster.gameData.getFishTotal(), fishMaster.gameData.getFallingDepth());
        var r = new Date().getTime();
        fishMaster.gameData.setOfflineTime(r.toString()), !fishMaster.gameData.getGuideIndex(3) && fishMaster.gameData.getGuideIndex(1) && 281 <= fishMaster.gameData.getGameMoney() && fishMaster.guide.showGuide(3, function() {});
    },
    initData2: function() {
        this.freshShareVideoData(), this.gameMoney.string = "$" + fishMaster.gameData.getPreGameMoney(),
            mg.Timer.setTimer(this, this.runChangeUserScore, .1), fishMaster.gameData.getPreGameMoney() != fishMaster.gameData.getGameMoney() && mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.GOLD, !1);
        var a = 1 == mg.isShareOpenData.upgradeShare && "true" == fishMaster.gameData.getCanWatchVideo();
        this.hookSizeFreeSp.active = 0 == fishMaster.gameData.getUpGradeCount(1) % this.upCountToShare[1],
            this.hookSizeFreeSp.getComponent(cc.Sprite).spriteFrame = a ? this.collectBtnSprites[5] : this.collectBtnSprites[4],
            this.hookSizeMoney.node.active = 0 != fishMaster.gameData.getUpGradeCount(1) % this.upCountToShare[1],
            this.depthFreeSp.active = 0 == fishMaster.gameData.getUpGradeCount(2) % this.upCountToShare[2],
            this.depthFreeSp.getComponent(cc.Sprite).spriteFrame = a ? this.collectBtnSprites[5] : this.collectBtnSprites[4],
            this.depthMoney.node.active = 0 != fishMaster.gameData.getUpGradeCount(2) % this.upCountToShare[2],
            this.inComeFreeSp.active = 0 == fishMaster.gameData.getUpGradeCount(3) % this.upCountToShare[3],
            this.inComeFreeSp.getComponent(cc.Sprite).spriteFrame = a ? this.collectBtnSprites[5] : this.collectBtnSprites[4],
            this.inComeMoney.node.active = 0 != fishMaster.gameData.getUpGradeCount(3) % this.upCountToShare[3];
        var e = fishMaster.gameData.getGameMoney() >= fishMaster.gameData.getHookSizeMoney() || 0 == fishMaster.gameData.getUpGradeCount(1) % this.upCountToShare[1],
            t = fishMaster.gameData.getGameMoney() >= fishMaster.gameData.getFallingDepthMoney() || 0 == fishMaster.gameData.getUpGradeCount(2) % this.upCountToShare[2],
            o = fishMaster.gameData.getGameMoney() >= fishMaster.gameData.getOfflineIncomeMoney() || 0 == fishMaster.gameData.getUpGradeCount(3) % this.upCountToShare[3];
        this.hookSizeBtn.interactable = e, this.depthBtn.interactable = t, this.inComeBtn.interactable = o,
            this.hookSizeText.color = e ? cc.color(255, 255, 255, 255) : cc.color(0, 0, 0, 255),
            this.depthText.color = t ? cc.color(255, 255, 255, 255) : cc.color(0, 0, 0, 255),
            this.inComeText.color = o ? cc.color(255, 255, 255, 255) : cc.color(0, 0, 0, 255),
            this.hookSizeLabel.node.color = e ? cc.color(122, 72, 0, 255) : cc.color(0, 0, 0, 255),
            this.depthLabel.node.color = t ? cc.color(122, 72, 0, 255) : cc.color(0, 0, 0, 255),
            this.inComeLabel.node.color = o ? cc.color(122, 72, 0, 255) : cc.color(0, 0, 0, 255),
            this.hookSizeMoney.node.color = e ? cc.color(255, 255, 255, 255) : cc.color(0, 0, 0, 255),
            this.depthMoney.node.color = t ? cc.color(255, 255, 255, 255) : cc.color(0, 0, 0, 255),
            this.inComeMoney.node.color = o ? cc.color(255, 255, 255, 255) : cc.color(0, 0, 0, 255),
            mg.OpenDataContextUtil.upRankData(fishMaster.gameData.getFishTotal(), fishMaster.gameData.getFallingDepth());
        var r = new Date().getTime();
        fishMaster.gameData.setOfflineTime(r.toString());
    },
    jumpToOtherGameRe: function() {
        if (1 == mg.isShareOpenData.jumpToOthersOpen && 0 <= mg.util.compareVersion(mg.UserInfo.SDKVersion, "2.2.0") && 1 == mg.isShareOpenData.isShareOpen) {
            var a = this,
                e = mg.shareUtil.getJumpToOther().imgurl;
            cc.loader.load({
                url: e,
                type: "png"
            }, function(e, t) {
                var o = new cc.SpriteFrame(t);
                a.jumpToOtherGameBtn.getComponent(cc.Sprite).spriteFrame = o, a.jumpToOtherGameBtn.active = !0;
            });
        } else this.jumpToOtherGameBtn.active = !1;
    },
    jumpToOtherGame: function() {
        var t = mg.shareUtil.getJumpToOther().appid;
        mg.util.navigateToMiniProgram(t);
    },
    showGetGoldAction: function() {
        console.log('log--------------showGetGoldAction---------');
        var t = cc.instantiate(this.goldPrefab);
        t.parent = this.playGoldAni, t.position = cc.v2(360 * (Math.random() - .5), 100 * Math.random()),
            t.runAction(cc.sequence(cc.moveTo(.8, 0, 530), cc.callFunc(function() {
                t.removeFromParent();
            })));
    },
    showGetMoneyAction: function(t) {
        mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.GOLD, !1), .12 < t && (t = .12),
            mg.Timer.setTimer(this, function() {
                var t = cc.instantiate(this.moneyPrefab);
                t.parent = this.playMoneyAni, t.position = cc.v2(360 * (Math.random() - .5), 100 * Math.random()),
                    t.runAction(cc.sequence(cc.moveTo(.8, -220, 530), cc.callFunc(function() {
                        t.removeFromParent();
                    })));
            }, .1, 4 + 100 * t), fishMaster.addRedPacketMoneyCount = 0;
    },
    changeGameState: function(t) {
        switch (this.gameState = t, t) {
            case fishMaster.GameDefine.GAME_STATE.DEFAULT:
                this.homeNode.active = !0, this.initData(), fishMaster.camera.showSize(!1), mg.AudioHelper.playLocalMusic(fishMaster.GameDefine.Sound.HOMEBGM, !0, .75);
                break;

            case fishMaster.GameDefine.GAME_STATE.START:
            case fishMaster.GameDefine.GAME_STATE.PLAYING:
                break;

            case fishMaster.GameDefine.GAME_STATE.ENDGAME:
                this.endGame();
        }
    },
    showBox: function() {
        fishMaster.boxView.showBoxNode();
    },
    destroyBanner: function() {
        mg.AD.bannerAdDestroy();
    },
    showBanner: function() {
        mg.AD.bannerAdShow();
    },
    hideBanner: function() {
        fishMaster.homeMain.homeNode.active && (0 == fishMaster.collectNumber % mg.isShareOpenData.bannerFresh ? mg.AD.bannerAdDestroy() : mg.AD.bannerAdHide());
    },
    initBannerAdNode: function() {
        0 == fishMaster.collectNumber % mg.isShareOpenData.bannerFresh && (this._openBannerAd(),
            mg.AD.bannerAdHide());
    },
    _openBannerAd: function() {
        mg.AD.createBannerAdOnBottom(fishMaster.AD_ID.BannerId);
    },
    getFishFun: function() {
        0 < fishMaster.openFishArr.length && fishMaster.getFishView.showFishNode();
    },
    endGame: function() {
        console.log("gangning", "fishMaster.openFishArr" + fishMaster.openFishArr), fishMaster.open_rank.hideNode(),
            this.collectNode.active || (this.getFishFun(), fishMaster.camera.showSize(!1), mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.ENDGAME, !1),
                this.collectNode.getChildByName("buff").getComponent(cc.Label).string = 1 < fishMaster.buff ? "金钱+" + 100 * fishMaster.buff + "%" : "",
                this.collectGoldNum = d(this.collectGoldNum * fishMaster.buff), this.collectNode.getChildByName("getGoldText").getComponent(cc.Label).string = "$" + this.collectGoldNum.toString(),
                this.collectNode.getChildByName("collectDoubleBtn").getChildByName("gold").getComponent(cc.Label).string = "$" + (5 * this.collectGoldNum).toString(),
                this.collectNode.getChildByName("collectThreeBtn").getChildByName("gold").getComponent(cc.Label).string = "$" + (10 * this.collectGoldNum).toString(),
                this.collectNode.active = !0, fishMaster.collectNumber += 1, 0 == fishMaster.collectNumber % 5 ? (this.collectNode.getChildByName("collectDoubleBtn").active = !1,
                    this.collectNode.getChildByName("collectThreeBtn").active = !0) : (this.collectNode.getChildByName("collectDoubleBtn").active = !0,
                    this.collectNode.getChildByName("collectThreeBtn").active = !1), 1 == mg.isShareOpenData.collectDoubleShare && "true" == fishMaster.gameData.getCanWatchVideo() ? (this.collectNode.getChildByName("collectDoubleBtn").getComponent(cc.Sprite).spriteFrame = this.collectBtnSprites[1],
                    this.collectNode.getChildByName("collectThreeBtn").getComponent(cc.Sprite).spriteFrame = this.collectBtnSprites[3]) : (this.collectNode.getChildByName("collectDoubleBtn").getComponent(cc.Sprite).spriteFrame = this.collectBtnSprites[0],
                    this.collectNode.getChildByName("collectThreeBtn").getComponent(cc.Sprite).spriteFrame = this.collectBtnSprites[2]),
                fishMaster.gameData.addRedPacketHookCount(), fishMaster.redPacket.freshData(), setTimeout(function() {
                    fishMaster.fishManage.createFish();
                }, 50) //, this.showBanner()
            );
    },
    runChangeEndScore: function() {
        var a = parseInt(this.collectNode.getChildByName("getGoldText").getComponent(cc.Label).string.replace(/[\;|\:]/g, "")),
            e = this.collectGoldNum,
            t = e - a;
        1 < c(t) ? (a += .5 * t, this.collectNode.getChildByName("getGoldText").getComponent(cc.Label).string = "$" + D(a).toString()) : (fishMaster.gameData.addGameMoney(0),
            this.collectNode.getChildByName("getGoldText").getComponent(cc.Label).string = "$" + e.toString(),
            mg.Timer.cancelTimer(this, this.runChangeEndScore));
    },
    refreshEndGame: function(t) {
        this.collectNode.getChildByName("getGoldText").getComponent(cc.Label).string = "$" + this.collectGoldNum.toString(),
            this.collectGoldNum += t, mg.Timer.setTimer(this, this.runChangeEndScore, .1), mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.GOLD, !1),
            this.collectNode.getChildByName("collectDoubleBtn").getChildByName("gold").getComponent(cc.Label).string = "$" + (2 * this.collectGoldNum).toString(),
            this.collectNode.getChildByName("collectThreeBtn").getChildByName("gold").getComponent(cc.Label).string = "$" + (3 * this.collectGoldNum).toString();
    },
    upgradeHook: function() {
        if (!(0 == fishMaster.gameData.getUpGradeCount(1) % this.upCountToShare[1])) fishMaster.gameData.getGameMoney() >= fishMaster.gameData.getHookSizeMoney() && (fishMaster.gameData.addGameMoney(-fishMaster.gameData.getHookSizeMoney()),
            this.upGradeComponent("hook"));
        else if (1 == mg.isShareOpenData.upgradeShare && "true" == fishMaster.gameData.getCanWatchVideo()) {
            var t = this;
            mg.AD.createRewardedVideoAd(fishMaster.AD_ID.UpGradeId, function() {
                t.upGradeComponent("hook");
            }, function() {
                wx.showToast({
                    title: "升级失败"
                }), t.hideBanner();
            });
        } else mg.GameShare.wxAutoShare(fishMaster.SharePoints.UpGradePoint, "hook"), mg.mta.Bilog(fishMaster.Bi_EventID.freeUpgrade, {
            param1: "hook"
        });
    },
    upgradeDepth: function() {
        if (!(0 == fishMaster.gameData.getUpGradeCount(2) % this.upCountToShare[2])) fishMaster.gameData.getGameMoney() >= fishMaster.gameData.getFallingDepthMoney() && (fishMaster.gameData.addGameMoney(-fishMaster.gameData.getFallingDepthMoney()),
            this.upGradeComponent("depth"));
        else if (1 == mg.isShareOpenData.upgradeShare && "true" == fishMaster.gameData.getCanWatchVideo()) {
            var t = this;
            mg.AD.createRewardedVideoAd(fishMaster.AD_ID.UpGradeId, function() {
                t.upGradeComponent("depth");
            }, function() {
                wx.showToast({
                    title: "升级失败"
                }), t.hideBanner();
            });
        } else mg.GameShare.wxAutoShare(fishMaster.SharePoints.UpGradePoint, "depth"), mg.mta.Bilog(fishMaster.Bi_EventID.freeUpgrade, {
            param1: "depth"
        });
    },
    upgradeInCome: function() {
        if (!(0 == fishMaster.gameData.getUpGradeCount(3) % this.upCountToShare[3])) fishMaster.gameData.getGameMoney() >= fishMaster.gameData.getOfflineIncomeMoney() && (fishMaster.gameData.addGameMoney(-fishMaster.gameData.getOfflineIncomeMoney()),
            this.upGradeComponent("income"));
        else if (1 == mg.isShareOpenData.upgradeShare && "true" == fishMaster.gameData.getCanWatchVideo()) {
            var t = this;
            mg.AD.createRewardedVideoAd(fishMaster.AD_ID.UpGradeId, function() {
                t.upGradeComponent("income");
            }, function() {
                wx.showToast({
                    title: "升级失败"
                }), t.hideBanner();
            });
        } else mg.GameShare.wxAutoShare(fishMaster.SharePoints.UpGradePoint, "income"),
            mg.mta.Bilog(fishMaster.Bi_EventID.freeUpgrade, {
                param1: "income"
            });
    },
    collectBtn: function() {
        fishMaster.gameData.addGameMoney(this.collectGoldNum), this.collectNode.active = !1,
            this.freshHomeView(), mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1),
            mg.mta.Bilog(fishMaster.Bi_EventID.collection);
    },
    collectDoubelBtn: function() {
        if (1 == mg.isShareOpenData.collectDoubleShare && "true" == fishMaster.gameData.getCanWatchVideo()) {
            var t = this;
            mg.AD.createRewardedVideoAd(fishMaster.AD_ID.CollectTimesId, function() {
                t.collectDoubel(5);
            }, function() {
                wx.showToast({
                    title: "领取失败"
                });
            });
        } else mg.GameShare.wxAutoShare(fishMaster.SharePoints.CollectDoublePoint), mg.mta.Bilog(fishMaster.Bi_EventID.doubleShare);
        mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1);
    },
    collectThreeBtn: function() {
        if (1 == mg.isShareOpenData.collectThreeShare && "true" == fishMaster.gameData.getCanWatchVideo()) {
            var t = this;
            mg.AD.createRewardedVideoAd(fishMaster.AD_ID.CollectThreeId, function() {
                t.collectDoubel(10);
            }, function() {
                wx.showToast({
                    title: "领取失败"
                });
            });
        } else mg.GameShare.wxAutoShare(fishMaster.SharePoints.CollectThreePoint), mg.mta.Bilog(fishMaster.Bi_EventID.threeShare);
        mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1);
    },
    collectDoubel: function(t) {
        fishMaster.gameData.addGameMoney(this.collectGoldNum * t), this.collectNode.active = !1,
            this.freshHomeView();
    },
    collectCloseBtn: function() {
        this.collectNode.active = !1, mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1);
    },
    offlineCollectBtn: function() {
        mg.mta.Bilog(fishMaster.Bi_EventID.offlineCollect), fishMaster.gameData.addGameMoney(this.offlineGoldNum),
            this.offlineNode.active = !1, this.freshGoldLabel(), mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1);
    },
    offlineCollectDoubelBtn: function() {
        if (1 == mg.isShareOpenData.offlineCollectDoubleShare && "true" == fishMaster.gameData.getCanWatchVideo()) {
            var t = this;
            mg.AD.createRewardedVideoAd(fishMaster.AD_ID.OfflineCollectDoubelId, function() {
                t.offlineCollectDoubel(), mg.mta.Bilog(fishMaster.Bi_EventID.clickGetCoinOutVieo);
            }, function() {
                wx.showToast({
                    title: "领取失败"
                }), mg.mta.Bilog(fishMaster.Bi_EventID.openGetCoinOutVieo);
            });
        } else mg.GameShare.wxAutoShare(fishMaster.SharePoints.OfflineDoublePoint), mg.mta.Bilog(fishMaster.Bi_EventID.offlineShare);
        mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1);
    },
    offlineCollectDoubel: function() {
        fishMaster.gameData.addGameMoney(5 * this.offlineGoldNum), this.offlineNode.active = !1,
            this.freshGoldLabel();
    },
    offlineCollectCloseBtn: function() {
        this.offlineNode.active = !1, mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1);
    },
    freshHomeView: function() {
        this.canClick = !1, this.homeNode.active = !0, this.hideBanner();
        var t = this;
        setTimeout(function() {
            mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.CHANGE_GAME_STATE, fishMaster.GameDefine.GAME_STATE.DEFAULT),
                t.canClick = !0;
        }, 200);
    },
    freshGoldLabel: function() {
        this.hideBanner();
        var t = this;
        setTimeout(function() {
            t.initData2();
        }, 200);
    },
    failTips: function() {
        this.shareFailNode.active = !0, this.shareFailNode.stopAllActions();
        var t = this;
        this.shareFailNode.runAction(cc.sequence(cc.fadeIn(1), cc.fadeOut(1), cc.callFunc(function() {
            t.shareFailNode.active = !1;
        })));
    },
    _forceShareFail: function(a) {
        if (a) {
            var e = a.sharefrom;
            e != fishMaster.SharePoints.CollectDoublePoint && e != fishMaster.SharePoints.CollectThreePoint && e != fishMaster.SharePoints.OfflineDoublePoint && e != fishMaster.SharePoints.UpGradePoint || this.failTips();
        }
    },
    _shareResult: function(a) {
        if (a) {
            var e = a.sharefrom;
            e != fishMaster.SharePoints.CollectDoublePoint && e != fishMaster.SharePoints.CollectThreePoint && e != fishMaster.SharePoints.OfflineDoublePoint && e != fishMaster.SharePoints.UpGradePoint || (1 == mg.isShareOpenData.isShareOpen ? mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.SHARE_RESULT, a) : this._successResult(a));
        }
    },
    _forceShareResult: function(a) {
        if (a) {
            var e = a.sharefrom,
                t = a.param;
            e === fishMaster.SharePoints.CollectDoublePoint ? (this.collectDoubel(2), mg.mta.Bilog(fishMaster.Bi_EventID.doubleShareSuccess)) : e === fishMaster.SharePoints.CollectThreePoint ? (this.collectDoubel(3),
                mg.mta.Bilog(fishMaster.Bi_EventID.doubleShareSuccess)) : e === fishMaster.SharePoints.OfflineDoublePoint ? (this.offlineCollectDoubel(),
                mg.mta.Bilog(fishMaster.Bi_EventID.offlineShareSuccess)) : e === fishMaster.SharePoints.UpGradePoint ? (this.upGradeComponent(t),
                mg.mta.Bilog(fishMaster.Bi_EventID.freeUpgradeSuccess, {
                    param1: t
                })) : void 0;
        }
    },
    _successResult: function(a) {
        var e = a.sharefrom,
            t = a.param,
            o = a.result;
        o.shareTickets && o.shareTickets[0] ? e === fishMaster.SharePoints.CollectDoublePoint ? this.collectDoubel(2) : e === fishMaster.SharePoints.CollectThreePoint ? this.collectDoubel(3) : e === fishMaster.SharePoints.OfflineDoublePoint ? (this.offlineCollectDoubel(),
            mg.mta.Bilog(fishMaster.Bi_EventID.offlineShareSuccess)) : e === fishMaster.SharePoints.UpGradePoint ? (this.upGradeComponent(t),
            mg.mta.Bilog(fishMaster.Bi_EventID.freeUpgradeSuccess, {
                param1: t
            })) : void 0 : mg.util.wechatShowModal("获取失败，请分享到群", !1, "确认");
    },
    upGradeComponent: function(t) {
        switch (this.hideBanner(), fishMaster.gameData.addGameMoney(0), t) {
            case "hook":
                fishMaster.gameData.setHookSize(), fishMaster.gameData.setUpGradeCount(1), this.initData(),
                    mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.UPGRADE, !1), fishMaster.gameData.updataDailyTaskData(0, 1, 0),
                    mg.mta.Bilog(fishMaster.Bi_EventID.updateGetfishNum);
                break;

            case "depth":
                fishMaster.gameData.setFallingDepth(), fishMaster.gameData.setUpGradeCount(2), this.initData(),
                    mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.UPGRADE, !1), fishMaster.gameData.updataDailyTaskData(0, 1, 0),
                    mg.mta.Bilog(fishMaster.Bi_EventID.updateGetfishDeep);
                break;

            case "income":
                fishMaster.gameData.setOfflineIncome(), fishMaster.gameData.setUpGradeCount(3),
                    this.initData(), mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.UPGRADE, !1),
                    fishMaster.gameData.updataDailyTaskData(0, 1, 0), mg.mta.Bilog(fishMaster.Bi_EventID.updateGetCoinOut);
        }
    },
    shareBtnFun: function() {
        mg.GameShare.wxAutoShare(fishMaster.SharePoints.MainViewBtnPoint), mg.mta.Bilog(fishMaster.Bi_EventID.homeShare),
            mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1);
    },
    rankBtnFun: function() {
        this.rankNode.getComponent("rank").showOnlyFriendRank(), mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1),
            mg.mta.Bilog(fishMaster.Bi_EventID.friendRank);
    },
    soundBtnFun: function() {
        this._isSoundOpen = !this._isSoundOpen, this._onSoundStateChange();
    },
    dailyTasksBtnFun: function() {
        this.dailyTasksNode.getComponent("dailyTaskNode").updateTaskData(), this.dailyTasksNode.active = !0,
            mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1);
    },
    refreshDailyTaskRedPoint: function(t) {
        this.homeNode.getChildByName("commonNode").getChildByName("dailyTasksBtn").getChildByName("redPoint").active = t;
    },
    handBookBtn: function() {
        fishMaster.handBook.openSelf(), mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1);
    },
    _updateSoundState: function() {
        var t = mg.AudioHelper.getMusicState();
        this._isSoundOpen = -1 !== t, this._onSoundStateChange();
    },
    _onSoundStateChange: function() {
        this._isSoundOpen ? (mg.AudioHelper.openMusic(), mg.AudioHelper.setMusicVolume(1),
            mg.AudioHelper.setEffectsVolume(1), this.soundBtn.spriteFrame = this.soundSprites[1],
            mg.AudioHelper.playLocalMusic(fishMaster.GameDefine.Sound.HOMEBGM, !0, .75)) : (mg.AudioHelper.closeMusic(),
            mg.AudioHelper.setMusicVolume(0), mg.AudioHelper.setEffectsVolume(0), this.soundBtn.spriteFrame = this.soundSprites[0]);
    },
    freshShareVideoData: function() {
        mg.isShareOpenData.version != mg.version && 0 != mg.isShareOpenData.isShareOpen ? (fishMaster.gameData.getDailyVideoCount() >= mg.isShareOpenData.dailyVideoToShare && fishMaster.gameData.updateCanWatchVideo(!1),
            fishMaster.gameData.getTotalVideoCount() >= mg.isShareOpenData.totalVideoCount && fishMaster.gameData.getDailyVideoCount() >= mg.isShareOpenData.videoToShare && fishMaster.gameData.updateCanWatchVideo(!1)) : fishMaster.gameData.updateCanWatchVideo(!0);
    },
    gameOnHide: function() {},
    gameOnShow: function() {
        if (fishMaster.gameData.freshLocalData(), mg.AudioHelper.rePlayMusic(), !this.offlineNode.active) {
            var a = new Date().getTime();
            if (0 < fishMaster.gameData.getOfflineTime() && 12e4 < a - fishMaster.gameData.getOfflineTime()) {
                var e = 120 < (a - fishMaster.gameData.getOfflineTime()) / 1e3 / 60 ? 120 : (a - fishMaster.gameData.getOfflineTime()) / 1e3 / 60;
                this.offlineGoldNum = d(e * fishMaster.gameData.getOfflineIncome()), this.offlineNode.getChildByName("getGoldText").getComponent(cc.Label).string = "$" + this.offlineGoldNum.toString(),
                    this.offlineNode.getChildByName("collectDoubleBtn").getChildByName("gold").getComponent(cc.Label).string = "$" + (2 * this.offlineGoldNum).toString(),
                    this.offlineNode.getChildByName("collectDoubleBtn").getComponent(cc.Sprite).spriteFrame = 1 == mg.isShareOpenData.offlineCollectDoubleShare && "true" == fishMaster.gameData.getCanWatchVideo() ? this.collectBtnSprites[1] : this.collectBtnSprites[0],
                    this.offlineNode.active = !0, this.showBanner();
            } else this.freshGoldLabel();
        }
    },


    /*************************************猜你喜欢广告模块*************************************/
    showLikeAds() {
        this.unscheduleAllCallbacks();
        var mask = mg.likeAdsNode.getChildByName("mask");
        if (!(mg.gameAds && mg.gameAds.length > 0)) { return }
        for (let i = 0; i < mg.gameAds.length; i++) {
            if (mg.gameAds[i].location_flg == "C") {
                this.likeAdLocation = mg.gameAds[i].location_id;
                mg.loginSDK.getAdDes(mg.gameAds[i].url, (data) => {
                    console.log("log----------------猜你喜欢------", data.data.result);
                    this.likeAdDataArr = data.data.result;
                    console.log("log----------------猜你喜欢111------", this.likeAdDataArr);
                    mask.removeAllChildren();
                    for (var i = 0; i < this.likeAdDataArr.length; i++) {
                        var ad = cc.instantiate(this.likeAd);
                        ad.parent = mask;
                        ad.x = -375 + 250 * i;
                        let adSprite = ad.getChildByName("adSprite");
                        let spComponent = adSprite.getComponent(cc.Sprite)
                        mg.loginSDK.loadImg(spComponent, this.likeAdDataArr[i].ad_img);

                        let adData = { ad_id: this.likeAdDataArr[i].ad_id, appid: this.likeAdDataArr[i].ad_appid, path: this.likeAdDataArr[i].ad_path, ad_qrimg: this.likeAdDataArr[i].ad_qrimg };
                        ad.on(cc.Node.EventType.TOUCH_START, (e) => {
                            mg.loginSDK.reportClickInfo(adData.ad_id, this.likeAdLocation);
                            this.refreshLikeAd(adData.appid);
                            mg.loginSDK.gotoOther(adData);
                        });
                        this.likeAdNodeArr.push(ad);
                    }
                });

                this.scheduleOnce(this.doAciton.bind(this), 2);
                this.scheduleOnce(this.doCarousel.bind(this), 10);
            }
        }
    },

    refreshLikeAd(appid) {
        var mask = mg.likeAdsNode.getChildByName("mask");

        if (this.likeAdDataArr.length <= 4) {
            return;
        }
        this.unscheduleAllCallbacks();
        mask.removeAllChildren();
        this.likeAdNodeArr.splice(0, this.likeAdNodeArr.length)
        for (let i = 0; i < this.likeAdDataArr.length; i++) {
            if (appid == this.likeAdDataArr[i].ad_appid) {
                this.likeAdDataArr.splice(i, 1);
            }
        }
        for (let i = 0; i < this.likeAdDataArr.length; i++) {
            var ad = cc.instantiate(this.likeAd);
            ad.parent = mask;
            ad.x = -375 + 250 * i;
            let adSprite = ad.getChildByName("adSprite");
            let spComponent = adSprite.getComponent(cc.Sprite);
            mg.loginSDK.loadImg(spComponent, this.likeAdDataArr[i].ad_img);

            let adData = { ad_id: this.likeAdDataArr[i].ad_id, appid: this.likeAdDataArr[i].ad_appid, path: this.likeAdDataArr[i].ad_path, ad_qrimg: this.likeAdDataArr[i].ad_qrimg }
            ad.on(cc.Node.EventType.TOUCH_START, () => {
                mg.loginSDK.reportClickInfo(adData.ad_id, this.likeAdLocation);
                this.refreshLikeAd(adData.appid);
                mg.loginSDK.gotoOther(adData);
            });
            this.likeAdNodeArr.push(ad);
        }

        this.scheduleOnce(this.doAciton.bind(this), 2);
        this.scheduleOnce(this.doCarousel.bind(this), 10);
    },


    doAciton() {
        let currentAdList = [];
        for (let i = 0; i < this.likeAdNodeArr.length; i++) {
            if (this.likeAdNodeArr[i].x < 400 && this.likeAdNodeArr[i].x > -400) {
                currentAdList.push(this.likeAdNodeArr[i]);
            }
        }

        let randAdIndex = Math.floor(Math.random() * currentAdList.length);
        let time = Math.random() * currentAdList.length + 3;
        currentAdList[randAdIndex].runAction(cc.repeat(cc.sequence(
            cc.scaleTo(0.2, 0.9),
            cc.scaleTo(0.2, 1.0),
        ), 2))
        this.scheduleOnce(this.doAciton.bind(this), time);
    },

    doCarousel() {
        if (this.likeAdNodeArr.length <= 4) { //广告位推荐位大于3个，才有轮播功能
            return
        }
        //整体左移一个广告位
        for (let i = 0; i < this.likeAdNodeArr.length - 1; i++) {
            this.likeAdNodeArr[i].stopAllActions();
            this.likeAdNodeArr[i].scale = 1.0;
            this.likeAdNodeArr[i].runAction(cc.moveBy(0.5, cc.p(-250 * 1, 0)))
        }
        //将超出左边边界的移动到右边
        this.likeAdNodeArr[this.likeAdNodeArr.length - 1].runAction(cc.sequence(
            cc.moveBy(0.5, cc.p(-250 * 1, 0)),
            cc.callFunc(() => {
                let first = this.likeAdNodeArr.shift();
                this.likeAdNodeArr.push(first);
                this.likeAdNodeArr[this.likeAdNodeArr.length - 1].x = this.likeAdNodeArr[this.likeAdNodeArr.length - 2].x + 250;
                this.scheduleOnce(this.doCarousel.bind(this), 10)
            })
        ))
    },

    /********************************爆款广告1************************************/
    showHotAd0() {
        var adContent = mg.hotAd0Node.getChildByName("adContent");
        for (var i = 0; i < mg.gameAds.length; i++) {
            if (mg.gameAds[i].location_flg == "B") {
                this.hotAd0Location = mg.gameAds[i].location_id;
                mg.loginSDK.getAdDes(mg.gameAds[i].url, (data) => {
                    this.hotAd0DataArr = data.data.result;
                    console.log("log----------------爆款游戏0------", this.hotAd0DataArr);
                    adContent.removeAllChildren();
                    for (var i = 0; i < this.hotAd0DataArr.length; i++) {
                        var ad = cc.instantiate(this.hotAd);
                        ad.parent = adContent;
                        ad.x = i == 0 ? 0 : -3000;
                        let adSprite = ad.getChildByName("adSprite");
                        let spComponent = adSprite.getComponent(cc.Sprite);
                        mg.loginSDK.loadImg(spComponent, this.hotAd0DataArr[i].ad_img);
                        let adData = { ad_id: this.hotAd0DataArr[i].ad_id, appid: this.hotAd0DataArr[i].ad_appid, path: this.hotAd0DataArr[i].ad_path, ad_qrimg: this.hotAd0DataArr[i].ad_qrimg }
                        ad.on(cc.Node.EventType.TOUCH_START, () => {
                            mg.loginSDK.reportClickInfo(adData.ad_id, this.hotAd0Location);
                            mg.loginSDK.gotoOther(adData);
                        });
                        this.hotAd0NodeArr.push(ad);
                    }
                    mg.hotAd0Node.stopAllActions();
                    mg.hotAd0Node.runAction(cc.repeatForever(
                        cc.sequence(
                            cc.delayTime(7),
                            cc.callFunc(() => {
                                this.doCarouselHotAd0();
                            })
                        )
                    ))
                });
            }
        }
    },

    doCarouselHotAd0() {
        if (this.hotAd0NodeArr.length <= 1) { //广告位推荐位大于1个，才有轮播功能
            return
        }
        this.hotAd0NodeArr[this.carouselHotAd0Index].x = 0;
        for (let i = 0; i < this.hotAd0NodeArr.length; i++) {
            if (i == this.carouselHotAd0Index) {
                continue;
            }
            this.hotAd0NodeArr[i].x = -3000; //移除屏幕之外
        }
        this.carouselHotAd0Index++;
        this.carouselHotAd0Index = this.carouselHotAd0Index % this.hotAd0NodeArr.length;
    },

    /********************************爆款广告2************************************/
    showHotAd1() {
        var adContent = mg.hotAd1Node.getChildByName("adContent");
        for (var i = 0; i < mg.gameAds.length; i++) {
            if (mg.gameAds[i].location_flg == "B2") {
                this.hotAd1Location = mg.gameAds[i].location_id;
                mg.loginSDK.getAdDes(mg.gameAds[i].url, (data) => {
                    this.hotAd1DataArr = data.data.result;
                    console.log("log----------------爆款游戏1------", this.hotAd1DataArr);
                    adContent.removeAllChildren();
                    for (var i = 0; i < this.hotAd1DataArr.length; i++) {
                        var ad = cc.instantiate(this.hotAd);
                        ad.parent = adContent;
                        console.log("log-----------------initHotAd1----------");
                        ad.x = i == 0 ? 0 : -3000;
                        let adSprite = ad.getChildByName("adSprite");
                        let spComponent = adSprite.getComponent(cc.Sprite);
                        mg.loginSDK.loadImg(spComponent, this.hotAd1DataArr[i].ad_img);
                        let adData = { ad_id: this.hotAd1DataArr[i].ad_id, appid: this.hotAd1DataArr[i].ad_appid, path: this.hotAd1DataArr[i].ad_path, ad_qrimg: this.hotAd1DataArr[i].ad_qrimg }
                        ad.on(cc.Node.EventType.TOUCH_START, () => {
                            mg.loginSDK.reportClickInfo(adData.ad_id, this.hotAd1Location);
                            mg.loginSDK.gotoOther(adData);
                        });
                        this.hotAd1NodeArr.push(ad);
                    }
                    mg.hotAd1Node.stopAllActions();
                    this.scheduleOnce(() => {
                        mg.hotAd1Node.runAction(cc.repeatForever(
                            cc.sequence(
                                cc.delayTime(7),
                                cc.callFunc(() => {
                                    this.doCarouselHotAd1();
                                })
                            )
                        ))
                    }, 2)
                });
            }
        }
    },

    doCarouselHotAd1() {
        if (this.hotAd1NodeArr.length <= 1) { //广告位推荐位大于1个，才有轮播功能
            return
        }
        this.hotAd1NodeArr[this.carouselHotAd1Index].x = 0;
        for (let i = 0; i < this.hotAd1NodeArr.length; i++) {
            if (i == this.carouselHotAd1Index) {
                continue;
            }
            this.hotAd1NodeArr[i].x = -3000; //移除屏幕之外
        }
        this.carouselHotAd1Index++;
        this.carouselHotAd1Index = this.carouselHotAd1Index % this.hotAd1NodeArr.length;
    },
    /********************************死亡推荐广告************************************/
    showDeadAD() {
        let deadAdContent = mg.deadAdsNode.getChildByName("adContent");
        for (let i = 0; i < mg.gameAds.length; i++) {
            if (mg.gameAds[i].location_flg == "S") {
                this.deadAdLocation = mg.gameAds[i].location_id;
                mg.loginSDK.getAdDes(mg.gameAds[i].url, (data) => {
                    this.deadAdDataArr = data.data.result;
                    console.log("log----------------游戏死亡------", this.deadAdDataArr);
                    deadAdContent.removeAllChildren();
                    for (let i = 0; i < this.deadAdDataArr.length; i++) {
                        if (i >= 6) { return }
                        let gameOverAd = cc.instantiate(this.deadAd)
                        gameOverAd.parent = deadAdContent;
                        console.log("log----------------this.deadAdPosArr=:", this.deadAdPosArr)
                        gameOverAd.x = this.deadAdPosArr[i].x;
                        gameOverAd.y = this.deadAdPosArr[i].y;

                        let adData = { ad_id: this.deadAdDataArr[i].ad_id, appid: this.deadAdDataArr[i].ad_appid, path: this.deadAdDataArr[i].ad_path, ad_qrimg: this.deadAdDataArr[i].ad_qrimg }

                        gameOverAd.getComponent("gameOverAd").setAdSprite(this.deadAdDataArr[i].ad_img);
                        gameOverAd.getComponent("gameOverAd").setAdName(this.deadAdDataArr[i].ad_name);
                        gameOverAd.getComponent("gameOverAd").setAdDes(this.deadAdDataArr[i].ad_count + "人在玩");
                        gameOverAd.on(cc.Node.EventType.TOUCH_START, () => {
                            mg.loginSDK.reportClickInfo(adData.ad_id, this.deadAdLocation);
                            this.refreshDeadAd(adData.appid);
                            mg.loginSDK.gotoOther(adData);
                        });

                    }
                })
            }
        }
    },

    refreshDeadAd(appid) {
        let deadAdContent = mg.deadAdsNode.getChildByName("adContent");
        if (this.deadAdDataArr.length <= 6) {
            return;
        }
        deadAdContent.removeAllChildren();
        for (let i = 0; i < this.deadAdDataArr.length; i++) {
            if (appid == this.deadAdDataArr[i].ad_appid) {
                this.deadAdDataArr.splice(i, 1);
            }
        }
        for (let i = 0; i < this.deadAdDataArr.length; i++) {

            //根据远程图片更换精灵帧
            if (i >= 6) { return };

            let gameOverAd = cc.instantiate(this.deadAd)
            gameOverAd.parent = deadAdContent;
            gameOverAd.x = this.deadAdPosArr[i].x;
            gameOverAd.y = this.deadAdPosArr[i].y;

            let adData = { ad_id: this.deadAdDataArr[i].ad_id, appid: this.deadAdDataArr[i].ad_appid, path: this.deadAdDataArr[i].ad_path, ad_qrimg: this.deadAdDataArr[i].ad_qrimg }

            gameOverAd.getComponent("gameOverAd").setAdSprite(this.deadAdDataArr[i].ad_img);
            gameOverAd.getComponent("gameOverAd").setAdName(this.deadAdDataArr[i].ad_name);
            gameOverAd.getComponent("gameOverAd").setAdDes(this.deadAdDataArr[i].ad_count + "人在玩");
            gameOverAd.on(cc.Node.EventType.TOUCH_START, () => {
                mg.loginSDK.reportClickInfo(adData.ad_id, this.deadAdLocation);
                this.refreshDeadAd(adData.appid);
                mg.loginSDK.gotoOther(adData);
            });
        }
    }
});