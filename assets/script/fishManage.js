cc.Class({
    extends: cc.Component,
    properties: {
        fishNode: cc.Node,
        catchFishNode: cc.Node,
        tempPrefab: {
            default: null,
            type: cc.Prefab
        },
        catchPrefab: {
            default: null,
            type: cc.Prefab
        },
        qipaoPre: {
            default: null,
            type: cc.Prefab
        },
        boxPrefab: {
            default: null,
            type: cc.Prefab
        },
        redPacketPrefab: {
            default: null,
            type: cc.Prefab
        }
    },
    onLoad: function() {
        fishMaster.fishManage = this, this.node.setContentSize(cc.winSize.width, fishMaster.gameData.getFallingDepthUnit() + 1.5 * cc.winSize.height + 7e4),
            this.init(), this._addTouchEvent(), this.fishNode.zIndex = 2, this.initRock();
    },
    onDestroy: function() {
        this._removeTouchEvent();
    },
    _removeTouchEvent: function() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this), this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this),
            this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this), this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    },
    _addTouchEvent: function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this),
            this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    },
    onTouchStart: function() {},
    onTouchMove: function(a) {
        if (fishMaster.hook.state == fishMaster.GameDefine.HOOK_STATE.DOWN || fishMaster.hook.state == fishMaster.GameDefine.HOOK_STATE.UP || fishMaster.hook.state == fishMaster.GameDefine.HOOK_STATE.STOP) {
            if (-cc.winSize.width / 2 <= fishMaster.hook.node.x && fishMaster.hook.node.x <= cc.winSize.width / 2) {
                var e = a.touch.getDelta();
                fishMaster.hook.node.x += 2 * e.x, fishMaster.hook.tempPosX += 1.5 * e.x;
            }
            fishMaster.hook.node.x < -cc.winSize.width / 2 ? fishMaster.hook.node.x = -cc.winSize.width / 2 : fishMaster.hook.node.x > cc.winSize.width / 2 && (fishMaster.hook.node.x = cc.winSize.width / 2);
        }
    },
    onTouchEnd: function() {},
    onTouchCancel: function() {},
    init: function() {
        this.fishNode.removeAllChildren(), this.fishPool = new cc.NodePool();
        for (var a = 0, e; 500 > a; a++) e = cc.instantiate(this.tempPrefab), this.fishPool.put(e);
        for (this.catchGoldPool = new cc.NodePool(), a = 0; 100 > a; a++) e = cc.instantiate(this.catchPrefab),
            this.catchGoldPool.put(e);
        for (this.boxPool = new cc.NodePool(), a = 0; 5 > a; a++) e = cc.instantiate(this.boxPrefab),
            this.boxPool.put(e);
    },
    getFishNode: function() {
        return 0 < this.fishPool.size() ? this.fishPool.get() : cc.instantiate(this.tempPrefab);
    },
    getCatchNode: function() {
        return 0 < this.catchGoldPool.size() ? this.catchGoldPool.get() : cc.instantiate(this.catchPrefab);
    },
    getBoxNode: function() {
        return 0 < this.boxPool.size() ? this.boxPool.get() : cc.instantiate(this.boxPrefab);
    },
    initRock: function() {
        var a = this,
            t = [2e3, 1300, 2300, 1800, 2800],
            d = [0, 1, 1, -1, -1],
            r = [0, 333, 234, 234, 333],
            n;
        cc.loader.loadResArray(["gamerock/shuibowen", "gamerock/yanshi1", "gamerock/yanshi2", "gamerock/yanshi2", "gamerock/yanshi1"], cc.SpriteFrame, function(e, i) {
            if (e) cc.error(e);
            else {
                n = i;
                for (var s = 0; s < t.length; s++)
                    for (var o = 0, f; o < a.node.getContentSize().height / t[s]; o++) f = new cc.Node(),
                        f.addComponent(cc.Sprite).spriteFrame = n[s], f.parent = a.node, f.scaleX = 0 == d[s] ? 1 : d[s],
                        f.x = cc.winSize.width / 2 * d[s] - r[s] / 2 * d[s], f.y = -o * t[s], f.zIndex = 1;
            }
        });
    },
    createFish: function() {
        this.fishNode.removeAllChildren();
        for (var d = fishMaster.fishData.length, e = (fishMaster.gameData.getTempFallingDepthUnit() + cc.winSize.height / 2) / (cc.winSize.height / fishMaster.GameDefine.bgCellHeight), t = 0; t < e; t++)
            for (var i = 0; i < d; i++) {
                var r = fishMaster.fishData[i],
                    n = t * (cc.winSize.height / fishMaster.GameDefine.bgCellHeight) / fishMaster.GameDefine.depthUnit;
                if (n > r.minDepth && n <= r.maxDepth && Math.random() <= r.fresh) {
                    var a = this.getFishNode();
                    a.parent = this.fishNode;
                    var s = a.getComponent("fish");
                    s.type = i, s.setPos(t);
                }
            }
        if (!fishMaster.gameData.getGuideIndex(4) && 1 == mg.isShareOpenData.redPacketOpen && mg.switch == true) {
            var o = fishMaster.redPacketFishData.length;
            for (t = 0; 3 > t; t++)
                for (i = 0; i < o; i++) {
                    var l = cc.instantiate(this.redPacketPrefab);
                    l.parent = this.fishNode;
                    var c = l.getComponent("redPacket");
                    c.type = i, c.setPos(2 * (t + 3));
                }
            fishMaster.gameData.setGuideIndex(4);
        }
    },
    createFish2: function() {
        for (var d = fishMaster.fishData.length, e = (fishMaster.gameData.getTempFallingDepthUnit() + cc.winSize.height / 2) / (cc.winSize.height / fishMaster.GameDefine.bgCellHeight), t = (fishMaster.gameData.getFallingDepthUnit() + cc.winSize.height / 2) / (cc.winSize.height / fishMaster.GameDefine.bgCellHeight), i = e; i < t; i++)
            for (var r = 0; r < d; r++) {
                var n = fishMaster.fishData[r],
                    a = i * (cc.winSize.height / fishMaster.GameDefine.bgCellHeight) / fishMaster.GameDefine.depthUnit;
                if (a > n.minDepth && a <= n.maxDepth && Math.random() <= n.fresh) {
                    var s = this.getFishNode();
                    s.parent = this.fishNode;
                    var o = s.getComponent("fish");
                    o.type = r, o.setPos(i);
                }
            }
        fishMaster.gameData.setTempFallingDepth();
    },
    createBox: function() {
        if (7 == fishMaster.collectNumber % 8 && !fishMaster.isHaveRedPacketFish)
            for (var o = fishMaster.boxData.length, e = 1, t = 0; t < e; t++)
                for (var d = 0; d < o; d++)(r = this.getBoxNode()).parent = this.fishNode,
                    (n = r.getComponent("box")).type = d, n.setPos(t + 10);
        if (9 == fishMaster.collectNumber % 10)
            for (o = fishMaster.boxData.length, e = 1,
                t = 0; t < e; t++)
                for (d = 0; d < o; d++) {
                    var r, n;
                    (r = this.getBoxNode()).parent = this.fishNode, (n = r.getComponent("box")).type = d,
                        n.setPos(t - 3);
                }
    },
    createRedPacketFish: function() {
        if (mg.switch = false) {
            return;
        }
        if (fishMaster.isHaveRedPacketFish && 19.88 > fishMaster.gameData.getRedPacketMoney() && 1 == mg.isShareOpenData.redPacketOpen) {
            for (var a = fishMaster.redPacketFishData.length, e = 0; 3 > e; e++)
                for (var t = 0, o; t < a; t++) {
                    o = cc.instantiate(this.redPacketPrefab), o.parent = this.fishNode;
                    var r = o.getComponent("redPacket");
                    r.type = t, r.setPos(2 * (e + 2));
                }
            fishMaster.redPacket.closeWin();
        }
    },
    createCatchTxt: function(a, e, t) {
        var o = this.getCatchNode();
        o.parent = this.catchFishNode;
        var r = o.getChildByName("gold").getComponent(cc.Label);
        r.string = "+$" + a.toString(), r.node.color = e ? cc.color(255, 255, 0, 255) : cc.color(255, 255, 255, 255),
            o.position = t, o.runAction(cc.sequence(cc.fadeOut(1), cc.callFunc(function() {
                o.removeFromParent();
            })));
    },
    createQipao: function() {
        this.qipaoNode = cc.instantiate(this.qipaoPre), this.qipaoNode.parent = this.fishNode,
            this.qipaoNode.zIndex = -1, this.qipaoNode.position = cc.v2((Math.random() - .5) * (cc.winSize.width - 80), fishMaster.hook.node.y - 320);
    },
    cancelQipaoTimer: function() {
        mg.Timer.cancelTimer(this, this.createQipao);
    },
    showQipao: function() {
        mg.Timer.setTimer(this, this.createQipao, 1);
    },
    fishKilled: function(t) {
        this.fishPool.put(t);
    }
})