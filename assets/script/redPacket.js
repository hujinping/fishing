cc.Class({
    extends: cc.Component,
    properties: {
        fishSprite: cc.Sprite,
        goldNode: cc.Label,
        fishGold: 0,
        fishLight: cc.Node,
        fishSprites: [cc.SpriteFrame],
        _type: 0,
        type: {
            get: function () {
                return this._type;
            },
            set: function (a) {
                this._type = a;
                var e = fishMaster.redPacketFishData[a];
                this.fishSprite.spriteFrame = this.fishSprites[a], this.goldNode.string = ":" + e.gold,
                    this.fishGold = e.gold, this.canMove = e.canMove, this.speed = e.speed, this.rota = e.rota,
                    this.minDepth = e.minDepth, this.maxDepth = e.maxDepth, this.fresh = e.fresh, this.spSize = this.fishSprite.node.getContentSize(),
                    this.fishScalex = 1;
            }
        }
    },
    onLoad: function () {
        this.state = fishMaster.GameDefine.FISH_STATE.DEFAULT, this.beCaughtTime = 0, this.beCaught = !1,
            this.goldNode.node.active = !1, this.rotaArrow = 1, this.rotaSpeed = 2 * Math.random() + 1,
            mg.EventDispatcher.listen(fishMaster.EVENT_GAME.FISH_STATE, this.changeState, this);
    },
    onDestroy: function () {
        mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.FISH_STATE, this.changeState, this);
    },
    setPos: function (t) {
        this.node.scaleX = .5 < Math.random() ? -1 : 1, this.node.x = (Math.random() - .5) * (cc.winSize.width - 200),
            this.node.y = -cc.winSize.height - fishMaster.gameData.getFallingDepthUnit() + t * (cc.winSize.height / fishMaster.GameDefine.bgCellHeight);
    },
    changeState: function (t) {
        switch (this.state = t, t) {
            case fishMaster.GameDefine.FISH_STATE.DEFAULT:
                break;

            case fishMaster.GameDefine.FISH_STATE.CAUGHT:
                this.fishBeCatch();
                break;

            case fishMaster.GameDefine.FISH_STATE.DIE:
                this.beCaught && this.fishDieAni();
        }
    },
    fishBeCatch: function () {
        mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.CATCHGOLD, !1), mg.util.vibrateShort(),
            this.beCaught = !0, fishMaster.disNum += 1, fishMaster.redPacketFishDisNum += 1,
            this.beCaughtTime = fishMaster.redPacketFishDisNum, fishMaster.camera.freshData(),
            this.fishLight.active = !1, this.node.stopAllActions(), this.fishSprite.node.anchorX = 1,
            this.node.scaleX = 1, this.node.position = cc.v2(0, 0), this.node.parent = fishMaster.hook.fishTemp,
            this.node.rotation = -90, fishMaster.disNum >= fishMaster.gameData.getHookSize() && mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.DROP_HOOK, fishMaster.GameDefine.HOOK_STATE.FULL),
            fishMaster.fishManage.createCatchTxt(this.fishGold, !0, fishMaster.hook.catchNode.convertToWorldSpaceAR(cc.v2(-cc.winSize.width / 2, -cc.winSize.height)));
    },
    fishDieAni: function () {
        var d = this;
        this.node.stopAllActions(), this.fishSprite.node.anchorX = .5, this.node.position = cc.v2(20, -380),
            this.node.rotation = 0, this.node.zIndex = -this.beCaughtTime, fishMaster.homeMain.collectGoldNum += d.fishGold;
        var e = 3;
        24 >= fishMaster.disNum && (e = fishMaster.disNum / 8);
        var t = cc.delayTime((fishMaster.disNum - this.node.zIndex) / fishMaster.disNum * e), i = cc.callFunc(function () {
            d.goldNode.node.active = !0, mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.COLLECT, !1),
                fishMaster.camera.showGetGold(d.fishGold);
        }), r = 2 * Math.random() + 2, n = cc.spawn(cc.scaleTo(.3, r), cc.fadeTo(.3, 1)), a = cc.spawn(cc.scaleTo(.3, 1), cc.fadeOut(.3)), s = cc.callFunc(function () {
            d.node.destroy(), fishMaster.disNum-- , fishMaster.redPacketFishDisNum-- , fishMaster.gameData.updataDailyTaskData(6, 1, 0),
                fishMaster.gameData.updataDailyTaskData(5, 1, 0), 0 >= fishMaster.redPacketFishDisNum && (mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.CHANGE_GAME_STATE, fishMaster.GameDefine.GAME_STATE.ENDGAME),
                    mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.RED_PACKET));
        });
        this.fishSprite.node.runAction(cc.sequence(t, i, n, a, s));
    },
    update: function () {
        if (!(this.beCaught || 1 != this.canMove || (this.node.x < -cc.winSize.width / 2 ? this.node.scaleX = 1 : this.node.x > cc.winSize.width / 2 && (this.node.scaleX = -1),
            this.node.x += this.speed * this.node.scaleX), this.state != fishMaster.GameDefine.FISH_STATE.CAUGHT)) 15 < c(fishMaster.hook.tempPosX) ? this.node.rotation = fishMaster.hook.tempPosX / 2.5 - 90 : (-60 < this.node.rotation ? this.rotaArrow = -1 : -120 > this.node.rotation && (this.rotaArrow = 1),
                this.node.rotation += this.rotaArrow * (this.rotaSpeed + fishMaster.hook.moveSpeed / 3e3)); else if (fishMaster.hook.state == fishMaster.GameDefine.HOOK_STATE.FULL && this.state == fishMaster.GameDefine.FISH_STATE.CAUGHT && (this.node.rotation = -90),
                    fishMaster.hook.state == fishMaster.GameDefine.HOOK_STATE.UP) {
            var e = fishMaster.hook.fishTemp.convertToWorldSpaceAR(cc.v2(0, 0)), t = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
            c(e.y - t.y) < this.spSize.width / 2 && c(e.x - t.x) < this.spSize.height / 2 && this.changeState(fishMaster.GameDefine.FISH_STATE.CAUGHT);
        }
    }
})