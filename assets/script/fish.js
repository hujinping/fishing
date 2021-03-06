var c = Math.abs;
cc.Class({
    extends: cc.Component,
    properties: {
        fishSprite: cc.Sprite,
        goldNode: cc.Label,
        fishGold: 0,
        fishLight: cc.Node,
        fishSprites: [cc.SpriteFrame],
        goldFishSprites: [cc.SpriteFrame],
        _type: 0,
        type: {
            get: function() {
                return this._type;
            },
            set: function(a) {
                this._type = a;
                var e = fishMaster.fishData[a];
                this.fishSprite.spriteFrame = this.fishSprites[a], this.goldNode.string = ":" + e.gold,
                    this.fishGold = e.gold, this.canMove = e.canMove, this.speed = 4 * Math.random() + 1,
                    this.rota = e.rota, this.Obliquely = e.Obliquely, this.minDepth = e.minDepth, this.maxDepth = e.maxDepth,
                    this.fresh = e.fresh, this.spSize = this.fishSprite.node.getContentSize(), this.fishScalex = 1;
            }
        }
    },
    onLoad: function() {
        fishMaster.fish = this, this.state = fishMaster.GameDefine.FISH_STATE.DEFAULT, this.beCaughtTime = 0,
            this.beCaught = !1, this.goldNode.node.active = !1, this.fishIsGold = !1, this.rotaArrow = 1,
            this.rotaSpeed = 2 * Math.random() + 1, mg.EventDispatcher.listen(fishMaster.EVENT_GAME.FISH_STATE, this.changeState, this);
    },
    onDestroy: function() {
        mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.FISH_STATE, this.changeState, this);
    },
    setPos: function(t) {
        this.node.x = (Math.random() - .5) * cc.winSize.width, this.node.y = -cc.winSize.height - t * (cc.winSize.height / fishMaster.GameDefine.bgCellHeight),
            this.node.scaleX = .5 < Math.random() ? -1 : 1, this.ObliquelyArrow = .5 < Math.random() ? -1 : 1,
            this.minDepth <= fishMaster.gameData.getFallingDepth() && fishMaster.gameData.getFallingDepth() <= this.maxDepth && .2 >= Math.random() && (this.fishSprite.spriteFrame = this.goldFishSprites[this._type],
                this.goldNode.string = ":" + 2 * fishMaster.fishData[this._type].gold, this.goldNode.node.color = cc.color(255, 255, 0, 255),
                this.fishGold = 2 * fishMaster.fishData[this._type].gold, this.fishLight.active = !0,
                this.fishLight.setContentSize(2 * this.spSize.height, 2 * this.spSize.height), this.fishLight.runAction(cc.rotateBy(2, 160, 160).repeatForever()),
                this.fishIsGold = !0);
    },
    changeState: function(t) {
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
    fishBeCatch: function() {
        this.fishIsGold ? mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.CATCHGOLD, !1) : mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.CATCHNORMAL, !1),
            mg.util.vibrateShort(), this.beCaught = !0, fishMaster.disNum += 1, fishMaster.fishDisNum += 1,
            this.beCaughtTime = fishMaster.fishDisNum, fishMaster.camera.freshData(), this.fishLight.active = !1,
            this.node.stopAllActions(), this.fishSprite.node.anchorX = 1, this.node.scaleX = 1,
            this.node.position = cc.v2(0, 0), this.node.parent = fishMaster.hook.fishTemp, this.node.rotation = -90,
            fishMaster.disNum >= fishMaster.gameData.getHookSize() && mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.DROP_HOOK, fishMaster.GameDefine.HOOK_STATE.FULL),
            fishMaster.fishManage.createCatchTxt(this.fishGold, this.fishIsGold, fishMaster.hook.catchNode.convertToWorldSpaceAR(cc.v2(-cc.winSize.width / 2, -cc.winSize.height))),
            fishMaster.gameData.getOpenFish(this.type) || fishMaster.openFishArr.in_array(this.type) || (fishMaster.openFishArr.push(this.type),
                fishMaster.gameData.setOpenFish(this.type));
    },
    fishDieAni: function() {
        var d = this;
        this.node.stopAllActions(), this.fishSprite.node.anchorX = .5, this.node.position = cc.v2(20, -380),
            this.node.rotation = 0, this.node.zIndex = this.beCaughtTime, fishMaster.homeMain.collectGoldNum += d.fishGold;
        var e = 3;
        24 >= fishMaster.disNum && (e = fishMaster.disNum / 8);
        var t = cc.delayTime((fishMaster.disNum - this.node.zIndex) / fishMaster.disNum * e),
            i = cc.callFunc(function() {
                d.goldNode.node.active = !0, mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.COLLECT, !1),
                    fishMaster.camera.showGetGold(d.fishGold);
            }),
            r = 2 * Math.random() + 2,
            n = cc.spawn(cc.scaleTo(.3, r), cc.fadeTo(.3, 1)),
            a = cc.spawn(cc.scaleTo(.3, 1), cc.fadeOut(.3)),
            s = cc.callFunc(function() {
                d.node.destroy(), fishMaster.disNum--, fishMaster.fishDisNum--, fishMaster.gameData.updataDailyTaskData(6, 1, 0),
                    d.fishIsGold && fishMaster.gameData.updataDailyTaskData(1, 1, 0), 0 >= fishMaster.fishDisNum && mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.CHANGE_GAME_STATE, fishMaster.GameDefine.GAME_STATE.ENDGAME);
            });
        this.fishSprite.node.runAction(cc.sequence(t, i, n, a, s));
    },
    update: function() {
        if (!(this.beCaught || 1 != this.canMove || (this.node.x < -cc.winSize.width / 2 ? this.node.scaleX = 1 : this.node.x > cc.winSize.width / 2 && (this.node.scaleX = -1),
                this.node.x += this.speed * this.node.scaleX), this.state != fishMaster.GameDefine.FISH_STATE.CAUGHT)) 15 < c(fishMaster.hook.tempPosX) ? this.node.rotation = fishMaster.hook.tempPosX / 2.5 - 90 : (-60 < this.node.rotation ? this.rotaArrow = -1 : -120 > this.node.rotation && (this.rotaArrow = 1),
            this.node.rotation += this.rotaArrow * (this.rotaSpeed + fishMaster.hook.moveSpeed / 3e3));
        else if (fishMaster.hook.state == fishMaster.GameDefine.HOOK_STATE.FULL && this.state == fishMaster.GameDefine.FISH_STATE.CAUGHT && (this.node.rotation = -90),
            fishMaster.hook.state == fishMaster.GameDefine.HOOK_STATE.UP) {
            var e = fishMaster.hook.fishTemp.convertToWorldSpaceAR(cc.v2(0, 0)),
                t = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
            c(e.y - t.y) < this.spSize.width / 2 && c(e.x - t.x) < this.spSize.height / 2 && this.changeState(fishMaster.GameDefine.FISH_STATE.CAUGHT);
        }
    }
})